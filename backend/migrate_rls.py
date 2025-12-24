
import os
import psycopg2
from dotenv import load_dotenv

# Force loading .env file
load_dotenv(encoding='utf-8')

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("❌ Erro: DATABASE_URL não encontrada (.env)")
    exit(1)

print(f"🔌 Conectando ao banco...")

try:
    conn = psycopg2.connect(DATABASE_URL)
    conn.autocommit = True
    cursor = conn.cursor()

    # 1. Adicionar coluna user_id nas tabelas (se não existir)
    tables = ['deals', 'contacts', 'lawyers', 'activities']
    
    for table in tables:
        print(f"🔨 Verificando tabela '{table}'...")
        try:
            cursor.execute(f"""
                ALTER TABLE {table} 
                ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid();
            """)
            print(f"   ✅ Coluna user_id verificada/adicionada em '{table}'.")
        except Exception as e:
            print(f"   ⚠️ Erro ao alterar tabela '{table}': {e}")

    # 2. Habilitar RLS (Row Level Security)
    for table in tables:
        print(f"🔒 Habilitando RLS em '{table}'...")
        cursor.execute(f"ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;")
        
        # 3. Criar Policies (CRUD completo para o dono)
        # Drop existing policy to avoid errors if re-running
        cursor.execute(f"DROP POLICY IF EXISTS \"Users can see own {table}\" ON {table};")
        cursor.execute(f"DROP POLICY IF EXISTS \"Users can insert own {table}\" ON {table};")
        cursor.execute(f"DROP POLICY IF EXISTS \"Users can update own {table}\" ON {table};")
        cursor.execute(f"DROP POLICY IF EXISTS \"Users can delete own {table}\" ON {table};")
        
        # Create unified policy is simpler usually, but splitting ensures clarity
        # SELECT (Permitir ver seus próprios dados OU dados públicos/mockups sem dono)
        cursor.execute(f"""
            CREATE POLICY "Users can see own or public {table}" ON {table}
            FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
        """)
        
        # INSERT (Sempre grava como seu)
        cursor.execute(f"""
            CREATE POLICY "Users can insert own {table}" ON {table}
            FOR INSERT WITH CHECK (auth.uid() = user_id);
        """)
        
        # UPDATE (Só pode editar o que é seu)
        cursor.execute(f"""
            CREATE POLICY "Users can update own {table}" ON {table}
            FOR UPDATE USING (auth.uid() = user_id);
        """)
        
        # DELETE (Só pode deletar o que é seu)
        cursor.execute(f"""
            CREATE POLICY "Users can delete own {table}" ON {table}
            FOR DELETE USING (auth.uid() = user_id);
        """)
        
        print(f"   ✅ Policies criadas para '{table}'.")

    # 4. Atualizar registros antigos (opcional: atribuir ao usuário atual se user_id for null?)
    # Por segurança, vamos deixar como null ou você pode rodar um update manual depois se precisar ver dados antigos.
    # Se quiser atribuir tudo ao seu usuário, descomente abaixo e coloque seu UUID:
    # cursor.execute("UPDATE deals SET user_id = 'SEU_UUID' WHERE user_id IS NULL;")

    print("\n✅✅ Sucesso! Banco de dados atualizado para isolamento por usuário (RLS).")

except Exception as e:
    print(f"\n❌ Erro fatal: {e}")
finally:
    if 'conn' in locals():
        conn.close()
