$ErrorActionPreference = "Stop"

$publishDir = "C:\Users\Lenovo\AppData\Local\Temp\junsu-sites-publish-583b979ee1ac4b93a2970a7f6bb9f8f9"

if (-not (Test-Path -LiteralPath (Join-Path $publishDir ".git"))) {
  Write-Error "Published source folder was not found: $publishDir"
  exit 1
}

$token = Read-Host "Paste new GitHub token"
if ([string]::IsNullOrWhiteSpace($token)) {
  Write-Error "GitHub token was empty."
  exit 1
}

Set-Location -LiteralPath $publishDir
git -c http.sslBackend=openssl -c http.extraHeader="Authorization: Bearer $token" push https://github.com/chengguobin24/FirstDemo.git HEAD:main

if ($LASTEXITCODE -ne 0) {
  Write-Error "GitHub push failed."
  exit $LASTEXITCODE
}

Write-Host "GitHub sync completed."
