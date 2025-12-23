# 🔧 Guia de Resolução de Problemas - CRM Jurídico

## Problema Atual: "no such column: deals.process_number"

Este erro acontece porque o arquivo `crm_juridico.db` tem um schema desatualizado.

## ✅ SOLUÇÃO DEFINITIVA

### Passo 1: Parar o Backend
Na janela do backend, pressione **CTRL+C** para parar o servidor.

### Passo 2: Resetar o Banco de Dados
Execute:
```batch
RESET-DATABASE.bat
```

Este script irá:
1. Deletar o banco antigo
2. Recriar todas as tabelas com o schema correto
3. Popular com 4 deals de exemplo

### Passo 3: Reiniciar o Backend
```batch
start-backend.bat
```

### Passo 4: Atualizar o Frontend
Pressione **F5** no navegador.

## 🎯 Verificação Rápida

Após seguir os passos acima, os cards devem aparecer imediatamente.

Se ainda tiver problemas, execute:
```batch
test-backend.bat
```

## 📋 Problemas Comuns

### Backend não inicia
- Verifique se nenhuma outra instância está rodando
- Certifique-se de que a porta 8000 está livre

### CORS Error
- Certifique-se de que o backend foi reiniciado após o reset
- Verifique se está acessando `http://localhost:3000` ou `http://localhost:5173`

### Cards não aparecem
- Verifique o console do navegador (F12)
- Execute `test-backend.bat` para diagnóstico

## 🆘 Última Opção: Reset Total

Se nada funcionar, delete manualmente:
1. Feche TUDO (backend + frontend)
2. Delete `crm_juridico.db`
3. Delete a pasta `venv`
4. Execute `SETUP.bat`
5. Execute `RESET-DATABASE.bat`
6. Execute `START.bat`
