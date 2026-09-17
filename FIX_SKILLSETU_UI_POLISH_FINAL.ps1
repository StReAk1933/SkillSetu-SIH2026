# SkillSetu UI polish - encoding-safe version
$ErrorActionPreference = "Stop"
$root = Get-Location

$files = @(
  "src\pages\WorkforceModulesPage.jsx",
  "src\pages\competency\CompetencyDigitalTwin.jsx",
  "sih-project-member-one\src\pages\CompetencyDigitalTwin.jsx"
) | ForEach-Object { Join-Path $root $_ } | Where-Object { Test-Path $_ }

function S([int[]]$codes) {
  return (-join ($codes | ForEach-Object { [char]$_ }))
}

# Build both correct Unicode and common UTF-8-as-Windows-1252 mojibake
# entirely from character codes. No non-ASCII characters appear in this script.
$correct = @{
  bullet = S @(0x2022)
  rupee = S @(0x20B9)
  endash = S @(0x2013)
  emdash = S @(0x2014)
  lsquo = S @(0x2018)
  rsquo = S @(0x2019)
  ldquo = S @(0x201C)
  rdquo = S @(0x201D)
  ellipsis = S @(0x2026)
}

$bad = @{
  bullet = S @(0x00E2,0x20AC,0x00A2)
  rupee = S @(0x00E2,0x201A,0x00B9)
  endash = S @(0x00E2,0x20AC,0x201C)
  emdash = S @(0x00E2,0x20AC,0x201D)
  lsquo = S @(0x00E2,0x20AC,0x2DC)
  rsquo = S @(0x00E2,0x20AC,0x2122)
  ldquo = S @(0x00E2,0x20AC,0x0153)
  rdquo = S @(0x00E2,0x20AC,0x00D0)
  ellipsis = S @(0x00E2,0x20AC,0x00A6)
}

$replacements = @(
  @($bad.bullet, $correct.bullet),
  @($bad.rupee, $correct.rupee),
  @($bad.endash, $correct.endash),
  @($bad.emdash, $correct.emdash),
  @($bad.lsquo, $correct.lsquo),
  @($bad.rsquo, $correct.rsquo),
  @($bad.ldquo, $correct.ldquo),
  @($bad.rldquo, $correct.rldquo),
  @($bad.ellipsis, $correct.ellipsis),
  @("Smart India Hackathon 2024", "Smart India Hackathon 2026"),
  @("LIVE DATA", "DEMO DATA")
)

Write-Host ""
Write-Host "=== SKILLSETU UI POLISH ===" -ForegroundColor Cyan

$changed = @()

foreach ($file in $files) {
  $text = [System.IO.File]::ReadAllText($file)
  $original = $text

  foreach ($pair in $replacements) {
    $text = $text.Replace([string]$pair[0], [string]$pair[1])
  }

  if ($text -ne $original) {
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($file, $text, $utf8NoBom)
    $changed += $file
    Write-Host "Fixed: $file" -ForegroundColor Green
  }
}

if ($changed.Count -eq 0) {
  Write-Host "No matching UI text issues found." -ForegroundColor Yellow
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
Write-Host "=== GIT STATUS ===" -ForegroundColor Cyan
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
