"""
Script para recriar o banco de dados completamente
"""
import os
import sys

# Deletar banco antigo se existir
db_path = "crm_juridico.db"
if os.path.exists(db_path):
    try:
        os.remove(db_path)
        print(f"✓ Banco antigo deletado: {db_path}")
    except Exception as e:
        print(f"✗ Erro ao deletar banco: {e}")
        print("Feche o backend e tente novamente.")
        sys.exit(1)
else:
    print("✓ Nenhum banco antigo encontrado")

# Importar e recriar tabelas
print("\nRecriando tabelas...")
from backend.database import engine, Base
from backend import models

# Recriar todas as tabelas
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

print("✓ Tabelas criadas com sucesso!")
print("\nTabelas disponíveis:")
for table_name in Base.metadata.tables.keys():
    print(f"  - {table_name}")

print("\nAgora execute: venv\\Scripts\\python.exe seed_database.py")
