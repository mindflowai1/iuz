
import sys
import os
from sqlalchemy import create_engine, text

# Supabase Project Credentials
PROJECT_REF = "nzfbkemncvycztinewqu"
PASSWORD = "dlzbOBwASKiDwZbF"
DB_NAME = "postgres"

# Candidates to test
# 1. Direct (already failed, but including for completeness)
# 2. Pooler sa-east-1 (Brazil - likely)
# 3. Pooler us-east-1 (US - default)
candidates = [
    {
        "name": "Direct Connection",
        "url": f"postgresql://postgres:{PASSWORD}@db.{PROJECT_REF}.supabase.co:5432/{DB_NAME}"
    },
    {
        "name": "Pooler (sa-east-1) - Transaction (6543)",
        "url": f"postgresql://postgres.{PROJECT_REF}:{PASSWORD}@aws-0-sa-east-1.pooler.supabase.com:6543/{DB_NAME}"
    },
    {
        "name": "Pooler (sa-east-1) - Session (5432)",
        "url": f"postgresql://postgres.{PROJECT_REF}:{PASSWORD}@aws-0-sa-east-1.pooler.supabase.com:5432/{DB_NAME}"
    },
    {
        "name": "Pooler (us-east-1) - Transaction (6543)",
        "url": f"postgresql://postgres.{PROJECT_REF}:{PASSWORD}@aws-0-us-east-1.pooler.supabase.com:6543/{DB_NAME}"
    }
]

def test_connection():
    print("--- TESTING CONNECTIVITY ALTERNATIVES ---")
    
    for candidate in candidates:
        print(f"\nTrying: {candidate['name']}...")
        print(f"URL: {candidate['url'].replace(PASSWORD, '***')}")
        
        try:
            engine = create_engine(candidate['url'], connect_args={"connect_timeout": 5})
            with engine.connect() as connection:
                result = connection.execute(text("SELECT 1"))
                print(f"   ✅ SUCCESS! Result: {result.fetchone()}")
                # If success, verify we can read deals
                try:
                    res = connection.execute(text("SELECT count(*) FROM deals"))
                    print(f"   ✅ Deal Count: {res.scalar()}")
                    print(f"\n>>> FOUND WORKING URL: {candidate['url']}")
                    return
                except:
                    print("   ⚠️ Connected but query failed.")
        except Exception as e:
            print(f"   ❌ Failed: {e}")

if __name__ == "__main__":
    test_connection()
