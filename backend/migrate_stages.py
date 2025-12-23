
import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "crm_juridico.db")

def migrate():
    print(f"Connecting to database at {DB_PATH}")
    if not os.path.exists(DB_PATH):
        print("Database not found!")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    updates = [
        ("triagem", "Triagem"),
        ("analise", "Análise"),
        ("proposta", "Proposta"),
        ("fechado", "Fechado"),
        ("execucao", "Execução"),
        # Also handle potential mixed case or other accidents
        ("analise", "Analise"),
        ("execucao", "Execucao")
    ]

    try:
        total_changes = 0
        for new_val, old_val in updates:
            cursor.execute("UPDATE deals SET stage = ? WHERE stage = ?", (new_val, old_val))
            if cursor.rowcount > 0:
                print(f"Updated {cursor.rowcount} deals from '{old_val}' to '{new_val}'")
                total_changes += cursor.rowcount
            
        conn.commit()
        print(f"Migration complete. Total rows updated: {total_changes}")
    except Exception as e:
        print(f"Error during migration: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    migrate()
