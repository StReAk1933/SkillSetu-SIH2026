def verify_competency(skill_data):
    """
    Verifies an employee's competency using:
    1. Course completion
    2. Assessment score
    3. Practical evidence score
    """

    course_completed = skill_data["course_completed"]
    assessment_score = skill_data["assessment_score"]
    practical_score = skill_data["practical_score"]

    # Calculate overall competency score
    competency_score = (assessment_score + practical_score) / 2

    # Verification rules
    if (
        course_completed
        and assessment_score >= 70
        and practical_score >= 70
    ):
        status = "VERIFIED"
    else:
        status = "NOT VERIFIED"

    return {
        "competency_score": round(competency_score, 1),
        "status": status,
        "course_completed": course_completed,
        "assessment_score": assessment_score,
        "practical_score": practical_score
    }