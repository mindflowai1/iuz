@echo off
echo ========================================
echo   RESET COMPLETO DO BANCO DE DADOS
echo ========================================
echo.
echo AVISO: Este script irá DELETAR todos os dados!
echo.
pause

cd /d "%~dp0"

echo.
echo [1/3] Parando backend (se estiver rodando)...
echo Pressione CTRL+C na janela do backend para encerrar.
echo.
pause

echo.
echo [2/3] Deletando e recriando banco...
venv\Scripts\python.exe reset_database.py
if errorlevel 1 (
    echo.
    echo ✗ Falha ao recriar banco!
    pause
    exit /b 1
)

echo.
echo [3/3] Populando com dados de exemplo...
venv\Scripts\python.exe seed_database.py
if errorlevel 1 (
    echo.
    echo ✗ Falha ao popular banco!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Banco de dados resetado com sucesso!
echo ========================================
echo.
echo Agora você pode iniciar o backend novamente:
echo   start-backend.bat
echo.
pause
