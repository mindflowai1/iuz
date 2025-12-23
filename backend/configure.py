import os
import getpass

def setup_env():
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    
    if os.path.exists(env_path):
        print("✅ Arquivo .env já existe.")
        return

    print("\n⚠️  Configuração Inicial do Supabase")
    print("Precisamos conectar ao banco de dados na nuvem.")
    print("A senha foi definida por você na criação do projeto 'iuz'.")
    
    password = getpass.getpass("🔑 Digite a senha do banco de dados Supabase: ")
    
    if not password:
        print("❌ Senha não pode ser vazia.")
        return

    content = f"DATABASE_URL=postgresql://postgres.nzfbkemncvycztinewqu:{password}@aws-0-sa-east-1.pooler.supabase.com:6543/postgres"
    
    with open(env_path, 'w') as f:
        f.write(content)
    
    print(f"✅ Arquivo salvo em: {env_path}")
    print("🚀 Configuração concluída!")

if __name__ == "__main__":
    setup_env()
