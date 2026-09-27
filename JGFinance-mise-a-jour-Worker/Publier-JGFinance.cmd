@echo off
cd /d "%~dp0"
where.exe npx >nul 2>nul
if errorlevel 1 (
  echo Node.js n'est pas installe ou n'est pas dans le PATH.
  echo Installez la version LTS depuis https://nodejs.org/en/download puis relancez ce fichier.
  pause
  exit /b 1
)
echo Publication de la mise a jour JGFinance sur Cloudflare Workers...
echo Wrangler va demander de se connecter si ce PC n'est pas encore autorise.
npx wrangler deploy
if errorlevel 1 (
  echo.
  echo La publication a echoue. Gardez cette fenetre ouverte et lisez le message ci-dessus.
  pause
)
