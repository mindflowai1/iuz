#!/usr/bin/env python3
"""
Teste para verificar se contact_name e owner_name estão sendo retornados
"""
import requests
import json

url = "http://localhost:8000/api/v1/deals"

print("Testing GET /api/v1/deals")

try:
    response = requests.get(url, timeout=5)
    print(f"\nStatus Code: {response.status_code}")
    
    if response.status_code == 200:
        deals = response.json()
        print(f"\n✅ Found {len(deals)} deals")
        
        if deals:
            first_deal = deals[0]
            print(f"\nFirst deal structure:")
            print(f"  - ID: {first_deal.get('id')}")
            print(f"  - Title: {first_deal.get('title')}")
            print(f"  - contact_name: {first_deal.get('contact_name', 'MISSING')}")
            print(f"  - owner_name: {first_deal.get('owner_name', 'MISSING')}")
            print(f"  - contact_id: {first_deal.get('contact_id', 'MISSING')}")
            print(f"  - owner_id: {first_deal.get('owner_id', 'MISSING')}")
            
            if first_deal.get('contact_name') and first_deal.get('owner_name'):
                print("\n✅ SUCCESS! Names are being returned!")
            else:
                print("\n❌ Names are missing!")
    else:
        print(f"❌ Error: {response.status_code}")
except Exception as e:
    print(f"\n❌ Error: {e}")
