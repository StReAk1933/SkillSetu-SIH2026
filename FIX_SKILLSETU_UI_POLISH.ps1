# SkillSetu UI polish: fix mojibake + stale SIH year, then verify
$ErrorActionPreference = "Stop"
$root = Get-Location

$files = @(
  "src\pages\WorkforceModulesPage.jsx",
  "src\pages\competency\CompetencyDigitalTwin.jsx",
  "sih-project-member-one\src\pages\CompetencyDigitalTwin.jsx"
) | ForEach-Object { Join-Path $root $_ } | Where-Object { Test-Path $_ }

$replacements = [ordered]@{
  "â€¢" = "·"
  "â‚¹" = "₹"
  "â€“" = "–"
  "â€”" = "—"
  "â€˜" = "‘"
  "â€™" = "’"
  "â€œ" = "“"
  "â€" = "”"
  "â€¦" = "…"
  "Smart India Hackathon 2024" = "Smart India Hackathon 2026"
  "LIVE DATA" = "DEMO DATA"
}

Write-Host "`n=== SKILLSETU UI POLISH ===" -ForegroundColor Cyan

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

Write-Host "`n=== LINT ===" -ForegroundColor Cyan
npm run lint
if ($LASTEXITCODE -ne 0) { throw "LINT FAILED" }

Write-Host "`n=== BUILD ===" -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { throw "BUILD FAILED" }

Write-Host "`n=== GIT DIFF ===" -ForegroundColor Cyan
git diff --stat
git status --short

if ($changed.Count -gt 0) {
  git add src/pages/WorkforceModulesPage.jsx src/pages/competency/CompetencyDigitalTwin.jsx sih-project-member-one/src/pages/CompetencyDigitalTwin.jsx
  git commit -m "Polish SkillSetu UI text encoding"
  git push origin main
}

Write-Host "`n=== DONE ===" -ForegroundColor Green
git status
