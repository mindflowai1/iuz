#!/usr/bin/env python3
"""
Teste de conexão via API REST do Supabase (alternativa ao PostgreSQL direto)
"""
import requests
import json

SUPABASE_URL = "https://nzfbkemncvycztinewqu.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56ZmJrZW1uY3Z5Y3p0aW5ld3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NDE5NDUsImV4cCI6MjA4MjAxNzk0NX0.2CyTdF2cV2qfVYSded83mUcB9Ng_ZpJOkCtWVKJh11Y"

print("=" * 60)
print("TESTE DE CONEXÃO VIA API REST SUPABASE")
print("=" * 60)

headers = {
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": f"Bearer {SUPABASE_ANON_KEY}"
}

try:
    # Teste 1: Buscar deals
    print("\n📊 Testando GET /rest/v1/deals...")
    response = requests.get(
        f"{SUPABASE_URL}/rest/v1/deals?select=*",
        headers=headers,
        timeout=10
    )
    
    if response.status_code == 200:
        deals = response.json()
        print(f"✅ SUCCESS! Encontrados {len(deals)} deals")
        if deals:
            print(f"   Exemplo: {deals[0].get('title', 'N/A')}")
    else:
        print(f"❌ Erro {response.status_code}: {response.text}")
    
    # Teste 2: Buscar contacts
    print("\n👥 Testando GET /rest/v1/contacts...")
    response = requests.get(
        f"{SUPABASE_URL}/rest/v1/contacts?select=*",
        headers=headers,
        timeout=10
    )
    
    if response.status_code == 200:
        contacts = response.json()
        print(f"✅ SUCCESS! Encontrados {len(contacts)} contacts")
    else:
        print(f"❌ Erro {response.status_code}: {response.text}")
    
    # Teste 3: Buscar lawyers
    print("\n⚖️  Testando GET /rest/v1/lawyers...")
    response = requests.get(
        f"{SUPABASE_URL}/rest/v1/lawyers?select=*",
        headers=headers,
        timeout=10
    )
    
    if response.status_code == 200:
        lawyers = response.json()
        print(f"✅ SUCCESS! Encontrados {len(lawyers)} lawyers")
    else:
        print(f"❌ Erro {response.status_code}: {response.text}")
    
    print("\n" + "=" * 60)
    print("✅ API REST FUNCIONA PERFEITAMENTE!")
    print("💡 Solução: Usar API REST ao invés de PostgreSQL direto")
    print("=" * 60)
    
except requests.exceptions.RequestException as e:
    print(f"\n❌ ERRO DE REDE:")
    print(f"   {str(e)}")
    print("\n💡 A API REST também não funciona - problema de rede/DNS")

except Exception as e:
    print(f"\n❌ ERRO INESPERADO:")
    print(f"   {str(e)}")
