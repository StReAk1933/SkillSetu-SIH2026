import json
from verification_engine import verify_competency

# Load employee data
with open("data/employees.json", "r") as file:
    employees = json.load(file)

# Test verification for every employee
for employee in employees:
    print("\nEmployee:", employee["name"])

    for skill_name, skill_data in employee["skills"].items():
        result = verify_competency(skill_data)

        print("Skill:", skill_name)
        print("Assessment:", result["assessment_score"], "%")
        print("Practical:", result["practical_score"], "%")
        print("Competency Score:", result["competency_score"], "%")
        print("Status:", result["status"])