#!/usr/bin/env python3
"""
Teste simples de conexão com Supabase
"""
import psycopg2
from psycopg2 import OperationalError

# Credenciais Supabase
HOST = "db.nzfbkemncvycztinewqu.supabase.co"
PORT = "5432"
DATABASE = "postgres"
USER = "postgres"
PASSWORD = "dlzbOBwASKiDwZbF"

print("=" * 60)
print("TESTE DE CONEXÃO COM SUPABASE")
print("=" * 60)

print(f"\nHost: {HOST}")
print(f"Port: {PORT}")
print(f"Database: {DATABASE}")
print(f"User: {USER}")
print(f"Password: {'*' * len(PASSWORD)}")

print("\n" + "-" * 60)
print("Tentando conectar...")
print("-" * 60)

try:
    # Tentativa 1: Conexão direta
    connection = psycopg2.connect(
        host=HOST,
        port=PORT,
        database=DATABASE,
        user=USER,
        password=PASSWORD,
        connect_timeout=10
    )
    
    print("✅ CONEXÃO ESTABELECIDA COM SUCESSO!")
    
    # Testar query simples
    cursor = connection.cursor()
    cursor.execute("SELECT version();")
    db_version = cursor.fetchone()
    print(f"\n📊 Versão do PostgreSQL: {db_version[0]}")
    
    # Testar tabelas
    cursor.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name;
    """)
    tables = cursor.fetchall()
    
    print(f"\n📋 Tabelas encontradas ({len(tables)}):")
    for table in tables:
        print(f"   - {table[0]}")
    
    # Testar dados
    cursor.execute("SELECT COUNT(*) FROM deals;")
    deals_count = cursor.fetchone()[0]
    print(f"\n💼 Total de Deals: {deals_count}")
    
    cursor.execute("SELECT COUNT(*) FROM contacts;")
    contacts_count = cursor.fetchone()[0]
    print(f"👥 Total de Contacts: {contacts_count}")
    
    cursor.execute("SELECT COUNT(*) FROM lawyers;")
    lawyers_count = cursor.fetchone()[0]
    print(f"⚖️  Total de Lawyers: {lawyers_count}")
    
    cursor.close()
    connection.close()
    
    print("\n" + "=" * 60)
    print("✅ TESTE CONCLUÍDO COM SUCESSO!")
    print("=" * 60)
    
except OperationalError as e:
    print(f"\n❌ ERRO DE CONEXÃO:")
    print(f"   {str(e)}")
    print("\n💡 Possíveis causas:")
    print("   1. Firewall bloqueando a porta 5432")
    print("   2. Senha incorreta")
    print("   3. Projeto Supabase pausado")
    print("   4. Problema de DNS/rede")
    
except Exception as e:
    print(f"\n❌ ERRO INESPERADO:")
    print(f"   {str(e)}")
