# monorepo.ps1
#
# Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
#
# pwsh -ExecutionPolicy Unrestricted -File ./monorepo.ps1
#

$inputFilePath = ".\monorepo.tar.gz.b64"
$outputFilePath = ".\monorepo.tar.gz"


if (Test-Path $inputFilePath) {
    # Step 1: Decode the Base64-encoded content
    $base64Content = Get-Content -Path $inputFilePath -Raw
    [System.IO.File]::WriteAllBytes($outputFilePath, [Convert]::FromBase64String($base64Content))
    Write-Output "Decoded file saved as $outputFilePath"

    # Step 2: Extract the $outputFilePath
    & tar -xzf $outputFilePath
} else {
    Write-Output "Input file '$inputFilePath' not found."
}