@echo off
echo.
echo ========================================
echo   LIMPIEZA COMPLETA DE CACHE
echo ========================================
echo.
echo Cerrando Chrome...
taskkill /F /IM chrome.exe 2>nul
timeout /t 2 /nobreak >nul

echo Cerrando Edge...
taskkill /F /IM msedge.exe 2>nul
timeout /t 2 /nobreak >nul

echo.
echo Navegadores cerrados.
echo.
echo Presiona cualquier tecla para abrir en modo incognito...
pause >nul

echo.
echo Abriendo en modo incognito...
start chrome --incognito --disable-cache "file:///%~dp0index.html"

echo.
echo Listo! El sitio se abrio en modo incognito sin cache.
echo.
pause
