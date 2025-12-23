
import sqlite3
import os

DB_FILE = "./crm_juridico.db"

def migrate_description():
    if not os.path.exists(DB_FILE):
        print(f"Database file {DB_FILE} not found.")
        return

    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    try:
        # Check if column exists
        cursor.execute("PRAGMA table_info(deals)")
        columns = [info[1] for info in cursor.fetchall()]
        
        if "description" not in columns:
            print("Adding 'description' column to deals table...")
            cursor.execute("ALTER TABLE deals ADD COLUMN description VARCHAR")
            conn.commit()
            print("Migration successful.")
        else:
            print("'description' column already exists.")

    except Exception as e:
        print(f"Migration failed: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    migrate_description()
