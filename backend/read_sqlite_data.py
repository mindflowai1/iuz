import sqlite3
import psycopg2
import os
from datetime import datetime

# Connection strings
SQLITE_DB_PATH = "./crm_juridico.db"

# You need to fill these in or set them as env vars
# SUPABASE_DB_URL = "postgres://postgres:[PASSWORD]@db.nzfbkemncvycztinewqu.supabase.co:5432/postgres"
# For this script to run, I will need the password. 
# Since I don't have the password, I will assume the user has set DATABASE_URL env var 
# or I will try to use the one from the project if available? 
# Actually, I cannot get the password from mcp_get_project. 
# I will ask the user for the password OR I will assume the environment has it.
# However, usually the user needs to provide it.
# But wait, `database.py` connects using a URL. If the user hasn't set it yet, I can't connect.
# The user wants me to do it. 
# Maybe I can just use `mcp_execute_sql` to insert data? Yes! I don't need direct connection if I have MCP.
# I can read from SQLite and generate INSERT statements and execute them via MCP.
# This requires no password from the user.

def migrate():
    print("Reading from SQLite...")
    conn = sqlite3.connect(SQLITE_DB_PATH)
    cursor = conn.cursor()

    # Tables to migrate in order
    tables = ['lawyers', 'contacts', 'deals', 'activities', 'documents', 'user_profiles']
    
    data_map = {}

    for table in tables:
        try:
            cursor.execute(f"SELECT * FROM {table}")
            columns = [description[0] for description in cursor.description]
            rows = cursor.fetchall()
            data_map[table] = {'columns': columns, 'rows': rows}
            print(f"Read {len(rows)} rows from {table}")
        except sqlite3.OperationalError as e:
            print(f"Skipping {table}: {e}")

    conn.close()

    return data_map

if __name__ == "__main__":
    data = migrate()
    # print(data) 
