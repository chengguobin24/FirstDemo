@echo off
setlocal

if "%GITHUB_TOKEN%"=="" (
  echo GITHUB_TOKEN is not set in this terminal.
  echo First run:
  echo set /p GITHUB_TOKEN=Paste new GitHub token:
  exit /b 1
)

set "PUBLISH_DIR=C:\Users\Lenovo\AppData\Local\Temp\junsu-sites-publish-583b979ee1ac4b93a2970a7f6bb9f8f9"

if not exist "%PUBLISH_DIR%\.git" (
  echo Published source folder was not found:
  echo %PUBLISH_DIR%
  exit /b 1
)

cd /d "%PUBLISH_DIR%"
git -c http.sslBackend=openssl -c http.extraHeader="Authorization: Bearer %GITHUB_TOKEN%" push https://github.com/chengguobin24/FirstDemo.git HEAD:main

if errorlevel 1 (
  echo GitHub push failed.
  exit /b 1
)

echo GitHub sync completed.
