from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import time
# Import dotenv to load environment variables from .env file
from dotenv import load_dotenv

# Load env variables explicitly
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./crm_juridico.db")

print(f"--- DATABASE CONFIG ---")
print(f"URL Type: {'PostgreSQL' if 'postgres' in DATABASE_URL else 'SQLite'}")

# Handle "postgres://" vs "postgresql://"
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

connect_args = {}
# PostgreSQL SSL handling for Supabase (production)
if "postgresql" in DATABASE_URL:
    # Supabase requires SSL, pass sslmode='require' via arguments if not in URL
    # But typically psycopg2 handles it with current URLs.
    # Just in case, ensuring it's not empty. No special checking needed usually.
    pass

if "sqlite" in DATABASE_URL:
    connect_args = {"check_same_thread": False}

try:
    engine = create_engine(
        DATABASE_URL, 
        connect_args=connect_args,
        pool_pre_ping=True, 
        pool_size=10,       
        max_overflow=20     
    )
    # Test connection
    with engine.connect() as connection:
        print("✅ Conexão com o banco de dados estabelecida com sucesso!")
except Exception as e:
    print(f"❌ ERRO FATAL ao conectar no banco de dados: {e}")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
