/**
 * Verification Utility & Business Logic Layer
 * SkillSetu SIH 2026 - Member 3
 *
 * Keeps verification domain logic decoupled from UI components.
 * Consumable by both Verification components and the Project Matching module.
 */

import { verificationData } from '../data/verificationData'

/**
 * Normalizes verification status
 * @param {string} status - 'verified' | 'pending' | 'unverified'
 * @param {boolean} verified - boolean flag
 * @returns {'verified' | 'pending' | 'unverified'}
 */
export const normalizeVerificationStatus = (status, verified) => {
  if (status === 'verified' || verified === true) return 'verified'
  if (status === 'pending') return 'pending'
  return 'unverified'
}

/**
 * Computes verification health and metrics for a single employee
 * @param {Object} employee - Employee verification record
 * @returns {Object} Computed stats
 */
export const computeEmployeeVerificationMetrics = (employee) => {
  if (!employee || !employee.competencies) {
    return {
      total: 0,
      verifiedCount: 0,
      pendingCount: 0,
      unverifiedCount: 0,
      verifiedRate: 0,
      averageLevel: 0,
      trustIndex: 0,
    }
  }

  const competencies = employee.competencies
  const total = competencies.length
  const verifiedCount = competencies.filter((c) => c.status === 'verified' || c.verified).length
  const pendingCount = competencies.filter((c) => c.status === 'pending').length
  const unverifiedCount = competencies.filter((c) => c.status === 'unverified' || (!c.verified && c.status !== 'pending')).length

  const verifiedRate = total > 0 ? Math.round((verifiedCount / total) * 100) : 0
  const avgLevel = total > 0 ? (competencies.reduce((acc, curr) => acc + (curr.level || 0), 0) / total).toFixed(1) : '0.0'

  // Trust Index: weighted verification score based on verified competencies & evidence quality
  const trustScores = competencies
    .filter((c) => c.evidence && c.evidence.verificationScore)
    .map((c) => c.evidence.verificationScore)

  const avgScore = trustScores.length > 0 ? Math.round(trustScores.reduce((a, b) => a + b, 0) / trustScores.length) : 85
  const trustIndex = Math.round((verifiedRate * 0.7) + (avgScore * 0.3))

  return {
    total,
    verifiedCount,
    pendingCount,
    unverifiedCount,
    verifiedRate,
    averageLevel: avgLevel,
    trustIndex,
  }
}

/**
 * Computes global workforce verification statistics
 * @param {Array} employees - Array of employee records
 * @returns {Object} Global aggregate statistics
 */
export const computeGlobalVerificationStats = (employees = verificationData) => {
  let totalEmployees = employees.length
  let totalCompetencies = 0
  let totalVerified = 0
  let totalPending = 0
  let totalUnverified = 0

  const evidenceTypeCounts = {
    Certification: 0,
    'Project evidence': 0,
    'Technical assessment': 0,
    'Manager validation': 0,
    'Peer review': 0,
    'Portfolio review': 0,
    'Self reported': 0,
  }

  employees.forEach((emp) => {
    emp.competencies.forEach((comp) => {
      totalCompetencies += 1
      if (comp.status === 'verified' || comp.verified) {
        totalVerified += 1
      } else if (comp.status === 'pending') {
        totalPending += 1
      } else {
        totalUnverified += 1
      }

      if (comp.evidence && comp.evidence.type) {
        const type = comp.evidence.type
        evidenceTypeCounts[type] = (evidenceTypeCounts[type] || 0) + 1
      }
    })
  })

  const overallVerificationRate = totalCompetencies > 0 ? Math.round((totalVerified / totalCompetencies) * 100) : 0

  return {
    totalEmployees,
    totalCompetencies,
    totalVerified,
    totalPending,
    totalUnverified,
    overallVerificationRate,
    evidenceTypeCounts,
  }
}

/**
 * Filter and sort competencies
 * @param {Array} competencies - List of competencies
 * @param {Object} filterOptions - Filters ({ status, search, category, sort })
 * @returns {Array} Filtered competencies
 */
export const filterCompetencies = (competencies = [], { status = 'all', search = '', category = 'all', sort = 'default' } = {}) => {
  let result = [...competencies]

  // Status filter
  if (status !== 'all') {
    result = result.filter((comp) => {
      const normalized = normalizeVerificationStatus(comp.status, comp.verified)
      return normalized === status
    })
  }

  // Category filter
  if (category !== 'all') {
    result = result.filter((comp) => comp.category === category)
  }

  // Search keyword (skill name, source, issuer, credentialId)
  if (search.trim()) {
    const q = search.toLowerCase()
    result = result.filter((comp) => {
      const matchName = (comp.skill || '').toLowerCase().includes(q)
      const matchCat = (comp.category || '').toLowerCase().includes(q)
      const matchType = comp.evidence ? (comp.evidence.type || '').toLowerCase().includes(q) : false
      const matchSource = comp.evidence ? (comp.evidence.source || '').toLowerCase().includes(q) : false
      const matchCred = comp.evidence ? (comp.evidence.credentialId || '').toLowerCase().includes(q) : false
      return matchName || matchCat || matchType || matchSource || matchCred
    })
  }

  // Sorting
  if (sort === 'level-desc') {
    result.sort((a, b) => b.level - a.level)
  } else if (sort === 'level-asc') {
    result.sort((a, b) => a.level - b.level)
  } else if (sort === 'name-asc') {
    result.sort((a, b) => a.skill.localeCompare(b.skill))
  } else if (sort === 'date-desc') {
    result.sort((a, b) => {
      const dateA = a.evidence ? new Date(a.evidence.date || 0) : 0
      const dateB = b.evidence ? new Date(b.evidence.date || 0) : 0
      return dateB - dateA
    })
  }

  return result
}

/**
 * =========================================================================
 * Project Matching Integration Helpers
 * =========================================================================
 *
 * This provides a clean interface for Project Matching or other modules to
 * consume verification state without inspecting internal UI components.
 */

/**
 * Returns a map of verified skills with levels for an employee
 * e.g. { python: { level: 5, verified: true, verificationType: 'Certification', date: '2026-08-20' }, ... }
 * @param {string} employeeId - ID of employee
 * @returns {Object} Map of verified skills
 */
export const getVerifiedCompetencyMap = (employeeId) => {
  const employee = verificationData.find((emp) => emp.employeeId === employeeId)
  if (!employee) return {}

  const map = {}
  employee.competencies.forEach((comp) => {
    map[comp.skillId] = {
      skill: comp.skill,
      level: comp.level,
      verified: comp.status === 'verified' || comp.verified,
      status: comp.status,
      verificationType: comp.evidence?.type || 'Unverified',
      verificationDate: comp.evidence?.date || null,
      verificationScore: comp.evidence?.verificationScore || null,
      source: comp.evidence?.source || null,
    }
  })
  return map
}

/**
 * Validates whether an employee satisfies a project requirement with verified competency
 * @param {Object} employee - Employee object
 * @param {string} skillId - Required skill ID
 * @param {number} requiredLevel - Minimum required level
 * @returns {Object} Validation result { isSatisfied, isVerified, level, difference }
 */
export const checkCompetencyVerification = (employee, skillId, requiredLevel = 1) => {
  if (!employee || !employee.competencies) {
    return { isSatisfied: false, isVerified: false, level: 0, difference: -requiredLevel }
  }

  const comp = employee.competencies.find((c) => c.skillId === skillId)
  if (!comp) {
    return { isSatisfied: false, isVerified: false, level: 0, difference: -requiredLevel }
  }

  const isVerified = comp.status === 'verified' || comp.verified
  const level = comp.level || 0
  const isSatisfied = level >= requiredLevel && isVerified

  return {
    isSatisfied,
    isVerified,
    level,
    difference: level - requiredLevel,
    evidence: comp.evidence || null,
  }
}
