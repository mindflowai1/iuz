"""
Database configuration using Supabase Python Client
"""
import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

print(f"--- SUPABASE CONFIG ---")
print(f"URL: {SUPABASE_URL}")
print(f"Key: {'*' * 20 if SUPABASE_KEY else 'NOT SET'}")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("[ERROR] SUPABASE_URL and SUPABASE_KEY must be set in .env file")

# Create Supabase client
try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("[OK] Supabase client initialized successfully!")
except Exception as e:
    print(f"[ERROR] Error initializing Supabase client: {e}")
    raise

# Dependency for FastAPI routes
def get_supabase() -> Client:
    """
    Dependency function to get Supabase client in FastAPI routes.
    Usage: supabase: Client = Depends(get_supabase)
    """
    return supabase
