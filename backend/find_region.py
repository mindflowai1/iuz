
import logging
from sqlalchemy import create_engine, text

# Supabase Credentials
PROJECT_REF = "nzfbkemncvycztinewqu"
PASSWORD = "dlzbOBwASKiDwZbF"
DB_NAME = "postgres"

regions = [
    "us-east-1", "us-east-2", "us-west-1", "us-west-2",
    "eu-west-1", "eu-west-2", "eu-west-3", "eu-central-1", "eu-north-1",
    "ap-southeast-1", "ap-southeast-2", "ap-northeast-1", "ap-northeast-2", "ap-south-1",
    "sa-east-1", "ca-central-1"
]

def check_region(region):
    # Try Transaction Pooler (port 6543) first
    url = f"postgresql://postgres.{PROJECT_REF}:{PASSWORD}@aws-0-{region}.pooler.supabase.com:6543/{DB_NAME}"
    print(f"Checking {region}...")
    try:
        engine = create_engine(url, connect_args={"connect_timeout": 3})
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            print(f"✅ SUCCESS! Region is {region}")
            return url
    except Exception as e:
        msg = str(e)
        if "Tenant or user not found" in msg:
            print(f"   ❌ Not {region}")
        elif "password authentication failed" in msg:
            print(f"   ⚠️ FOUND REGION {region} but password failed!")
            return url
        elif "could not translate host name" in msg:
             print(f"   ❌ DNS fail for {region}")
        else:
             print(f"   ❓ Error in {region}: {msg}")
    return None

def main():
    print("--- BRUTE FORCING REGION ---")
    for region in regions:
        found_url = check_region(region)
        if found_url:
            print(f"\n🎉 FOUND VALID URL: {found_url}")
            break

if __name__ == "__main__":
    main()
