$timestamp = Get-Date -Format "yyyy-MM-dd-HHmm"
$zipName = "ToDo-Project-$timestamp.zip"
$tempDir = Join-Path $env:TEMP "ToDo-temp-$(Get-Random)"

# Create temp directory
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

# Copy files excluding node_modules, build, and zip files
Get-ChildItem -Path . -Exclude node_modules,build,*.zip | Copy-Item -Destination $tempDir -Recurse -Force

# Create zip file
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipName -Force

# Clean up temp directory
Remove-Item -Path $tempDir -Recurse -Force

Write-Host "Created: $zipName"


