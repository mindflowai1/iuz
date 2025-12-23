
import os

content_str = """# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://nzfbkemncvycztinewqu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56ZmJrZW1uY3Z5Y3p0aW5ld3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NDE5NDUsImV4cCI6MjA4MjAxNzk0NX0.2CyTdF2cV2qfVYSded83mUcB9Ng_ZpJOkCtWVKJh11Y
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56ZmJrZW1uY3Z5Y3p0aW5ld3F1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjQ0MTk0NSwiZXhwIjoyMDgyMDE3OTQ1fQ.79ffr6CfcqQaJdoGlF9ambR8dMVfAW1vw3hS9q1Jd2s

# Database Configuration (PostgreSQL)
# Fixed encoding to UTF-8
DATABASE_URL=postgresql://postgres:dlzbOBwASKiDwZbF@db.nzfbkemncvycztinewqu.supabase.co:5432/postgres
"""

file_path = ".env"

try:
    if os.path.exists(file_path):
        with open(file_path, "rb") as f:
            data = f.read(4)
        print(f"Current BOM/Start: {data.hex()}")
        os.remove(file_path)
        print("Deleted old .env")

    with open(file_path, "wb") as f:
        f.write(content_str.encode("utf-8"))
    
    print(f"Successfully wrote {file_path} as UTF-8 binary.")
    
except Exception as e:
    print(f"Error: {e}")
