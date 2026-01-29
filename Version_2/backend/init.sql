-- Initialize database with extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create initial admin user (optional)
-- This will be handled by the application registration process
-- but you can uncomment if you want to seed initial data

-- INSERT INTO users (id, email, first_name, last_name, hashed_password, is_active, is_verified, created_at, updated_at)
-- VALUES (
--     uuid_generate_v4(),
--     'admin@credbud.com',
--     'Admin',
--     'User',
--     '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LrUpm', -- password: admin123
--     true,
--     true,
--     NOW(),
--     NOW()
-- );
