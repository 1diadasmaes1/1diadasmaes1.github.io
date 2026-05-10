@echo off
title diadasmaes // server
cd /d "%~dp0"
echo.
echo  =====================================================
echo   ARG dia das maes 2026 - servidor local
echo   abrindo em http://localhost:8765
echo   ctrl+c pra parar o servidor
echo  =====================================================
echo.
start "" "http://localhost:8765/index.html"
python -m http.server 8765
