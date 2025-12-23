import sqlite3
import datetime

# Connection strings
SQLITE_DB_PATH = "./crm_juridico.db"
OUTPUT_FILE = "migration_data.sql"

def format_value(val):
    if val is None:
        return "NULL"
    if isinstance(val, str):
        # Escape single quotes
        escaped = val.replace("'", "''")
        return f"'{escaped}'"
    if isinstance(val, (int, float)):
        return str(val)
    if isinstance(val, (datetime.date, datetime.datetime)):
        return f"'{val.isoformat()}'"
    return f"'{str(val)}'"

def generate_sql():
    print(f"Reading from {SQLITE_DB_PATH}...")
    conn = sqlite3.connect(SQLITE_DB_PATH)
    cursor = conn.cursor()

    tables = ['lawyers', 'contacts', 'user_profiles', 'deals', 'activities', 'documents']
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("-- Migration dump from SQLite to Supabase\n")
        f.write("BEGIN;\n\n")

        for table in tables:
            try:
                cursor.execute(f"SELECT * FROM {table}")
                columns = [description[0] for description in cursor.description]
                rows = cursor.fetchall()
                
                if not rows:
                    print(f"No rows in {table}")
                    continue

                print(f"Migrating {len(rows)} rows from {table}")
                f.write(f"-- Data for {table}\n")
                
                for row in rows:
                    cols_str = ", ".join([f'"{c}"' for c in columns])
                    vals_str = ", ".join([format_value(v) for v in row])
                    # Use ON CONFLICT DO NOTHING to avoid duplicate ID errors
                    sql = f"INSERT INTO {table} ({cols_str}) VALUES ({vals_str}) ON CONFLICT (id) DO NOTHING;\n"
                    f.write(sql)
                
                f.write("\n")
                
                # Reset sequence (optional but good idea if IDs are manually inserted)
                # f.write(f"SELECT setval(pg_get_serial_sequence('{table}', 'id'), (SELECT MAX(id) FROM {table}));\n\n")

            except sqlite3.OperationalError as e:
                print(f"Skipping {table}: {e}")

        f.write("COMMIT;\n")
    
    conn.close()
    print(f"Migration SQL written to {OUTPUT_FILE}")

if __name__ == "__main__":
    generate_sql()
