import sys
import os
from sqlalchemy import text
from database import engine, SessionLocal

# Force load dotenv just in case
from dotenv import load_dotenv
load_dotenv()

def test_connection():
    print("--- TESTING DATABASE CONNECTION ---")
    print(f"DATABASE_URL available: {'Yes' if os.getenv('DATABASE_URL') else 'No'}")
    
    try:
        # 1. Test raw connection
        print("1. Testing raw connection...")
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            print(f"   Success! Result: {result.fetchone()}")

        # 2. Test Session
        print("2. Testing Session...")
        db = SessionLocal()
        try:
            # 3. Test Select from contacts
            print("3. Testing SELECT from contacts...")
            result = db.execute(text("SELECT count(*) FROM contacts"))
            count = result.scalar()
            print(f"   Success! Found {count} contacts.")
            
            # 4. Test Select from deals
            print("4. Testing SELECT from deals...")
            result = db.execute(text("SELECT count(*) FROM deals"))
            count = result.scalar()
            print(f"   Success! Found {count} deals.")
            
        finally:
            db.close()
            
        print("\n✅ ALL TESTS PASSED. The backend can connect to Supabase.")
        
    except Exception as e:
        print(f"\n❌ TEST FAILED: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_connection()
