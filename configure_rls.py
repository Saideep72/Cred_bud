import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv("backend/.env")

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("❌ DATABASE_URL not found in backend/.env")
    exit(1)

# Ensure sync driver
if "postgresql+psycopg://" in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.replace("postgresql+psycopg://", "postgresql+psycopg2://")

def configure_rls():
    print("🔐 Connecting to Database (Sync mode)...")
    try:
        engine = create_engine(DATABASE_URL, echo=True)
        
        commands = [
            # Enable RLS on all tables
            "ALTER TABLE users ENABLE ROW LEVEL SECURITY;",
            "ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;",
            "ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;",
            "ALTER TABLE financial_behavior ENABLE ROW LEVEL SECURITY;",

            # Users Policy
            "DROP POLICY IF EXISTS \"Users can read own data\" ON users;",
            "CREATE POLICY \"Users can read own data\" ON users FOR SELECT TO authenticated USING (auth.uid() = id);",
            # Note: We don't add INSERT policies because creation happens via Backend (Postgres User)

            # Loan Applications
            "DROP POLICY IF EXISTS \"Users can read own loans\" ON loan_applications;",
            "CREATE POLICY \"Users can read own loans\" ON loan_applications FOR SELECT TO authenticated USING (auth.uid() = user_id);",

            # Transactions
            "DROP POLICY IF EXISTS \"Users can read own transactions\" ON transactions;",
            "CREATE POLICY \"Users can read own transactions\" ON transactions FOR SELECT TO authenticated USING (auth.uid() = user_id);",

            # Financial Behavior
            "DROP POLICY IF EXISTS \"Users can read own behaviors\" ON financial_behavior;",
            "CREATE POLICY \"Users can read own behaviors\" ON financial_behavior FOR SELECT TO authenticated USING (auth.uid() = user_id);"
        ]

        with engine.begin() as conn:
            for cmd in commands:
                print(f"Executing: {cmd}")
                try:
                    conn.execute(text(cmd))
                except Exception as e:
                    print(f"⚠️ Error (might be harmless): {e}")
        
        print("✅ RLS Configuration Complete!")
        engine.dispose()
        
    except Exception as e:
        print(f"❌ Database Connection Failed: {e}")

if __name__ == "__main__":
    configure_rls()
