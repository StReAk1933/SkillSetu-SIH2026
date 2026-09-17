# SkillSetu UI polish: fix mojibake + stale SIH year, then verify
$ErrorActionPreference = "Stop"
$root = Get-Location

$files = @(
  "src\pages\WorkforceModulesPage.jsx",
  "src\pages\competency\CompetencyDigitalTwin.jsx",
  "sih-project-member-one\src\pages\CompetencyDigitalTwin.jsx"
) | ForEach-Object { Join-Path $root $_ } | Where-Object { Test-Path $_ }

# ASCII-only script: use Unicode code points so PowerShell encoding cannot break the script.
$rupee = [string][char]0x20B9
$bullet = [string][char]0x2022
$enDash = [string][char]0x2013
$emDash = [string][char]0x2014
$leftSingle = [string][char]0x2018
$rightSingle = [string][char]0x2019
$leftDouble = [string][char]0x201C
$rightDouble = [string][char]0x201D
$ellipsis = [string][char]0x2026

$replacements = [ordered]@{
  "â€¢" = $bullet
  "â‚¹" = $rupee
  "â€“" = $enDash
  "â€”" = $emDash
  "â€˜" = $leftSingle
  "â€™" = $rightSingle
  "â€œ" = $leftDouble
  "â€" = $rightDouble
  "â€¦" = $ellipsis
  "Smart India Hackathon 2024" = "Smart India Hackathon 2026"
  "LIVE DATA" = "DEMO DATA"
}

Write-Host ""
Write-Host "=== SKILLSETU UI POLISH ===" -ForegroundColor Cyan

$changed = @()

foreach ($file in $files) {
  $text = [System.IO.File]::ReadAllText($file)
  $original = $text

  foreach ($pair in $replacements.GetEnumerator()) {
    $text = $text.Replace($pair.Key, $pair.Value)
  }

  if ($text -ne $original) {
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($file, $text, $utf8NoBom)
    $changed += $file
    Write-Host "Fixed: $file" -ForegroundColor Green
  }
}

if ($changed.Count -eq 0) {
  Write-Host "No matching text issues found." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== LINT ===" -ForegroundColor Cyan
npm run lint
if ($LASTEXITCODE -ne 0) { throw "LINT FAILED" }

Write-Host ""
Write-Host "=== BUILD ===" -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { throw "BUILD FAILED" }

Write-Host ""
Write-Host "=== GIT DIFF ===" -ForegroundColor Cyan
git diff --stat
git status --short

if ($changed.Count -gt 0) {
  git add src/pages/WorkforceModulesPage.jsx src/pages/competency/CompetencyDigitalTwin.jsx sih-project-member-one/src/pages/CompetencyDigitalTwin.jsx
  git commit -m "Polish SkillSetu UI text encoding"
  git push origin main
} else {
  Write-Host "Nothing new to commit." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== DONE ===" -ForegroundColor Green
git status
