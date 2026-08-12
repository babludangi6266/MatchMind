@echo off
setlocal

set MAVEN_VERSION=3.9.6
set MAVEN_DIR=%USERPROFILE%\.m2\wrapper\apache-maven-%MAVEN_VERSION%

if exist "%MAVEN_DIR%\bin\mvn.cmd" (
    "%MAVEN_DIR%\bin\mvn.cmd" %*
    exit /b %ERRORLEVEL%
)

echo Maven directory not found at %MAVEN_DIR%.
exit /b 1
