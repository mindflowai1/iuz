# Início Rápido - CRM Jurídico

Este guia simplificado mostra como iniciar o projeto de forma fácil.

## 🛠️ Configuração Inicial (Apenas na Primeira Vez)

Antes de usar o sistema pela primeira vez, execute:
```
SETUP.bat
```
Este script instalará automaticamente todas as dependências necessárias (Python e Node.js).

## 🚀 Início Rápido (Windows)

### Opção 1: Início Automático (Recomendado)
Simplesmente clique duas vezes no arquivo:
```
START.bat
```
Isso iniciará automaticamente o backend e frontend em janelas separadas.

### Opção 2: Início Manual

**Backend:**
```
start-backend.bat
```

**Frontend:**
```
start-frontend.bat
```

## 📍 URLs de Acesso

- **Frontend:** http://localhost:5173 ou http://localhost:3000
- **Backend API:** http://127.0.0.1:8000
- **Documentação da API:** http://127.0.0.1:8000/docs

## 🔧 Primeira Execução

Na primeira vez que você executar o projeto:

1. O script do backend criará automaticamente um ambiente virtual Python
2. O script do frontend instalará as dependências do Node.js
3. Aguarde a instalação completa antes de usar o sistema

## ⚠️ Solução de Problemas

### Backend não inicia
- Verifique se o Python 3.8+ está instalado
- Execute: `pip install -r requirements.txt`

### Frontend não inicia
- Verifique se o Node.js está instalado
- Delete a pasta `node_modules` e execute `npm install`

### Porta em uso
- Certifique-se de que as portas 8000 e 5173 estão livres
- Feche outras instâncias do projeto em execução

## 📝 Comandos Alternativos (Manual)

Se os scripts .bat não funcionarem, use:

**Backend:**
```bash
cd backend
python -m uvicorn main:app --reload
```

**Frontend:**
```bash
npm run dev
```
