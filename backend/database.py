from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Try to load .env if it exists, but don't fail if it doesn't
try:
    from dotenv import load_dotenv
    load_dotenv()
except:
    pass  # Use environment variables or defaults


# Get DB URL from environment or use SQLite as fallback locally (won't be used if user configures .env)
# Expected format: postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./crm_juridico.db")

if "sqlite" in SQLALCHEMY_DATABASE_URL:
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

