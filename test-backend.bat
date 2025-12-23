@echo off
echo ========================================
echo   Teste de Conectividade - CRM Backend
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Testando se o backend está acessível...
curl -s http://127.0.0.1:8000/ >nul 2>&1
if errorlevel 1 (
    echo ✗ Backend NÃO está rodando!
    echo   Execute: start-backend.bat
    pause
    exit /b 1
) else (
    echo ✓ Backend está rodando!
)

echo.
echo [2/3] Testando endpoint /api/v1/deals/...
curl -s -o temp_response.json http://127.0.0.1:8000/api/v1/deals/
if errorlevel 1 (
    echo ✗ Erro ao conectar com /api/v1/deals/
    echo   Verifique os logs do backend
) else (
    echo ✓ Endpoint respondeu com sucesso!
    type temp_response.json
    del temp_response.json >nul 2>&1
)

echo.
echo [3/3] Populando banco de dados com exemplos...
venv\Scripts\python.exe seed_database.py

echo.
echo ========================================
echo   Teste concluído!
echo ========================================
echo.
echo Se o endpoint falhou, reinicie o backend:
echo   1. Feche a janela do backend (CTRL+C)
echo   2. Execute: start-backend.bat
echo.
pause
