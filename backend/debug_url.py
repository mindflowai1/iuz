
import os
from dotenv import load_dotenv

# Tenta carregar normalmente
load_dotenv()
url = os.getenv("DATABASE_URL")
print(f"URL Normal: '{url}'")

# Tenta carregar com encoding específico
load_dotenv(encoding='utf-8-sig')
url_utf8 = os.getenv("DATABASE_URL")
print(f"URL UTF-8 Sig: '{url_utf8}'")

# Verifica caracteres hex
if url:
    print("Hex dump:", ":".join("{:02x}".format(ord(c)) for c in url))
