$timestamp = Get-Date -Format "yyyy-MM-dd-HHmm"
$zipName = "ToDo-Project-$timestamp.zip"

# Create zip excluding certain directories
$items = Get-ChildItem -Path . -Exclude @('node_modules', 'build', '*.zip', 'create-zip.ps1', 'create-zip-simple.ps1')

Compress-Archive -Path $items.FullName -DestinationPath $zipName -Force

Write-Host "Successfully created: $zipName" -ForegroundColor Green


