from supabase import create_client, Client
from gotrue.errors import AuthApiError
import os
from dotenv import load_dotenv

load_dotenv()

# Explicitly read from .env file to be sure
# Assuming script runs in project root

URL = os.getenv("SUPABASE_URL")
KEY = os.getenv("SUPABASE_KEY")

print(f"URL: {URL}")
print(f"KEY: {KEY[:10]}...") 

if not URL or not KEY:
    print("❌ Missing SUPABASE_URL or SUPABASE_KEY in .env")
    exit(1)

try:
    print("Initializing Supabase Client...")
    supabase: Client = create_client(URL, KEY)
    
    print("Attempting to get session (Health Check)...")
    # Just checking if we can talk to the server. 
    # Try a simple auth check (sign in with fake user should fail with invalid login, not auth error)
    try:
        supabase.auth.sign_in_with_password({"email": "test@example.com", "password": "wrongpassword"})
    except AuthApiError as e:
        print(f"✅ Connection Successful (Got expected Auth Error: {e.message})")
    except Exception as e:
        print(f"❌ Connection Failed: {e}")
        # Check if key format is JWT
        if "sb_publishable" in KEY:
            print("\n⚠️ WARNING: Your SUPABASE_KEY looks like a 'sb_publishable' token.")
            print("   Supabase usually uses a JWT starting with 'ey...' for the anon header.")
            print("   Please check your Project Settings -> API in Supabase Dashboard.")

except Exception as e:
    print(f"❌ Initialization Failed: {e}")
