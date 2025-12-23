#!/usr/bin/env python3
"""
Teste dos endpoints de contacts e lawyers
"""
import requests

print("=== Testing Contacts Endpoint ===")
try:
    r = requests.get('http://localhost:8000/api/v1/contacts', timeout=5)
    print(f"Status: {r.status_code}")
    if r.status_code == 200:
        contacts = r.json()
        print(f"✅ Found {len(contacts)} contacts")
        if contacts:
            print(f"First contact: {contacts[0]}")
    else:
        print(f"❌ Error: {r.text}")
except Exception as e:
    print(f"❌ Error: {e}")

print("\n=== Testing Lawyers Endpoint ===")
try:
    r = requests.get('http://localhost:8000/api/v1/lawyers', timeout=5)
    print(f"Status: {r.status_code}")
    if r.status_code == 200:
        lawyers = r.json()
        print(f"✅ Found {len(lawyers)} lawyers")
        if lawyers:
            print(f"First lawyer: {lawyers[0]}")
    else:
        print(f"❌ Error: {r.text}")
except Exception as e:
    print(f"❌ Error: {e}")
