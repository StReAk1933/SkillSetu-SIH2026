const availabilityScores = {
  available: 100,
  'partially available': 50,
  unavailable: 0,
}

const round = (value) => Math.round(value * 10) / 10

export function calculateEmployeeMatch(employee, project) {
  const requiredSkills = project.requiredSkills
  const skillResults = requiredSkills.map((requirement) => {
    const competency = employee.competencies.find(
      (item) => item.skillId === requirement.skillId,
    )
    const employeeLevel = competency?.level ?? 0
    const skillScore = Math.min(employeeLevel / requirement.requiredLevel, 1) * 100
    const meetsRequirement = employeeLevel >= requirement.requiredLevel

    return {
      ...requirement,
      employeeLevel,
      verified: competency?.verified ?? false,
      verificationType: competency?.verificationType ?? null,
      lastVerified: competency?.lastVerified ?? null,
      skillScore: round(skillScore),
      meetsRequirement,
      status: employeeLevel === 0 ? 'missing' : meetsRequirement ? 'matched' : 'weak',
    }
  })

  const skillCoverage = round(
    skillResults.reduce((total, skill) => total + skill.skillScore * skill.weight, 0),
  )
  const verifiedRequiredSkills = skillResults.filter((skill) => skill.verified).length
  const verificationScore = round((verifiedRequiredSkills / requiredSkills.length) * 100)
  const availabilityScore = availabilityScores[employee.availability] ?? 0
  const skillContribution = round(skillCoverage * 0.75)
  const verificationContribution = round(verificationScore * 0.15)
  const availabilityContribution = round(availabilityScore * 0.1)
  const finalScore = round(skillContribution + verificationContribution + availabilityContribution)

  const matchedSkills = skillResults.filter((skill) => skill.status === 'matched')
  const weakSkills = skillResults.filter((skill) => skill.status === 'weak')
  const missingSkills = skillResults.filter((skill) => skill.status === 'missing')
  const verifiedSkills = skillResults.filter((skill) => skill.verified)
  const criticalGaps = skillResults.filter((skill) => skill.critical && !skill.meetsRequirement)

  const explanation = [
    `${matchedSkills.length} of ${requiredSkills.length} required skills meet the target proficiency`,
    `${verifiedRequiredSkills} of ${requiredSkills.length} required competencies are verified`,
    employee.availability === 'available'
      ? 'Employee is currently available for immediate allocation'
      : employee.availability === 'partially available'
        ? 'Employee has partial capacity and may need schedule coordination'
        : 'Employee is currently unavailable for allocation',
  ]

  if (weakSkills.length > 0) {
    explanation.push(`Build capability in ${weakSkills.map((skill) => skill.skillId).join(', ')}`)
  }
  if (criticalGaps.length > 0) {
    explanation.push(`Critical gap: ${criticalGaps.map((skill) => skill.skillId).join(', ')}`)
  }

  return {
    employee,
    finalScore,
    skillCoverage,
    verificationScore,
    availabilityScore,
    matchedSkills,
    weakSkills,
    missingSkills,
    verifiedSkills,
    criticalGaps,
    skillResults,
    explanation,
    scoreBreakdown: {
      skillCoverage: skillContribution,
      verification: verificationContribution,
      availability: availabilityContribution,
    },
  }
}

export function rankEmployees(employees, project) {
  return employees
    .map((employee) => calculateEmployeeMatch(employee, project))
    .sort((a, b) => b.finalScore - a.finalScore)
}
