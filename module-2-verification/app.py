import streamlit as st
import json
from pathlib import Path
from verification_engine import verify_competency


# =========================================================
# PAGE CONFIG
# =========================================================

st.set_page_config(
    page_title="SkillSetu | Workforce Intelligence",
    page_icon="🎯",
    layout="wide",
    initial_sidebar_state="expanded"
)


# =========================================================
# LOAD EMPLOYEE DATA
# =========================================================

DATA_FILE = Path(__file__).parent / "data" / "employees.json"

with open(DATA_FILE, "r", encoding="utf-8") as file:
    employees = json.load(file)


# =========================================================
# CUSTOM DESIGN
# =========================================================

st.markdown("""
<style>

.stApp {
    background-color: #f5f7fb;
}

/* Remove Streamlit branding */
#MainMenu {
    visibility: hidden;
}

footer {
    visibility: hidden;
}

/* Sidebar */
section[data-testid="stSidebar"] {
    background-color: #ffffff;
    border-right: 1px solid #e5e7eb;
}

/* SkillSetu logo */
.logo {
    font-size: 28px;
    font-weight: 700;
    color: #172554;
}

.logo-subtitle {
    font-size: 12px;
    color: #64748b;
    margin-top: 3px;
}

/* Main heading */
.main-title {
    font-size: 32px;
    font-weight: 700;
    color: #172033;
}

.main-subtitle {
    font-size: 14px;
    color: #64748b;
    margin-bottom: 25px;
}

/* KPI cards */
.kpi {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    min-height: 125px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.03);
}

.kpi-label {
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
    letter-spacing: 0.4px;
}

.kpi-value {
    font-size: 28px;
    font-weight: 700;
    color: #172033;
    margin-top: 8px;
}

.kpi-desc {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 5px;
}

/* Section */
.section {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    margin-top: 22px;
}

.section-title {
    font-size: 18px;
    font-weight: 600;
    color: #172033;
}

.section-subtitle {
    font-size: 13px;
    color: #64748b;
    margin-top: 3px;
}

/* Employee cards */
.employee-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 16px;
    margin-top: 10px;
}

.employee-name {
    font-size: 16px;
    font-weight: 600;
    color: #172033;
}

.employee-info {
    font-size: 12px;
    color: #64748b;
    margin-top: 4px;
}

/* Status */
.verified {
    color: #166534;
    background: #dcfce7;
    padding: 5px 11px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
}

.gap {
    color: #92400e;
    background: #fef3c7;
    padding: 5px 11px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
}

</style>
""", unsafe_allow_html=True)


# =========================================================
# SIDEBAR NAVIGATION
# =========================================================

with st.sidebar:

    st.markdown(
        """
        <div class="logo">SkillSetu</div>
        <div class="logo-subtitle">
            Workforce Skill Intelligence Platform
        </div>
        """,
        unsafe_allow_html=True
    )

    st.divider()

    st.markdown(
        """
        <div style="
        font-size:11px;
        font-weight:600;
        color:#64748b;
        margin-bottom:8px;">
        MAIN MENU
        </div>
        """,
        unsafe_allow_html=True
    )

    selected_page = st.selectbox(
        "Navigation",
        [
            "🏠 Dashboard",
            "👤 Employee Profile",
            "📊 Skill Gap Analysis",
            "📚 Learning Recommendations",
            "📝 Assessments",
            "✅ Competency Verification",
            "💼 Project Matching",
            "🔮 Workforce Simulator"
        ],
        label_visibility="collapsed"
    )

    st.divider()

    st.markdown(
        """
        <div style="
        font-size:11px;
        color:#94a3b8;
        line-height:1.6;">
        <b>SkillSetu Prototype</b><br>
        SIH 2026 • Team Infinex
        </div>
        """,
        unsafe_allow_html=True
    )


# =========================================================
# CALCULATE DATA
# =========================================================

total_employees = len(employees)

total_skills = 0
verified_skills = 0
skill_gaps = 0
competency_scores = []

for employee in employees:

    for skill_name, skill_data in employee["skills"].items():

        total_skills += 1

        competency_score = (
            skill_data["assessment_score"]
            + skill_data["practical_score"]
        ) / 2

        competency_scores.append(competency_score)

        if (
            skill_data["course_completed"]
            and skill_data["assessment_score"] >= 70
            and skill_data["practical_score"] >= 70
        ):
            verified_skills += 1
        else:
            skill_gaps += 1


average_competency = (
    sum(competency_scores) / len(competency_scores)
    if competency_scores
    else 0
)


# =========================================================
# DASHBOARD
# =========================================================

if selected_page == "🏠 Dashboard":

    st.markdown(
        '<div class="main-title">Workforce Dashboard</div>',
        unsafe_allow_html=True
    )

    st.markdown(
        """
        <div class="main-subtitle">
        Overview of employee skills, competency verification and workforce readiness.
        </div>
        """,
        unsafe_allow_html=True
    )


    # -----------------------------------------------------
    # KPI CARDS
    # -----------------------------------------------------

    col1, col2, col3, col4 = st.columns(4)

    with col1:

        st.markdown(
            f"""
            <div class="kpi">
                <div class="kpi-label">TOTAL EMPLOYEES</div>
                <div class="kpi-value">{total_employees}</div>
                <div class="kpi-desc">
                Employees in workforce dataset
                </div>
            </div>
            """,
            unsafe_allow_html=True
        )

    with col2:

        st.markdown(
            f"""
            <div class="kpi">
                <div class="kpi-label">VERIFIED SKILLS</div>
                <div class="kpi-value">{verified_skills}</div>
                <div class="kpi-desc">
                Competencies meeting verification criteria
                </div>
            </div>
            """,
            unsafe_allow_html=True
        )

    with col3:

        st.markdown(
            f"""
            <div class="kpi">
                <div class="kpi-label">SKILL GAPS</div>
                <div class="kpi-value">{skill_gaps}</div>
                <div class="kpi-desc">
                Skills requiring development
                </div>
            </div>
            """,
            unsafe_allow_html=True
        )

    with col4:

        st.markdown(
            f"""
            <div class="kpi">
                <div class="kpi-label">AVG. COMPETENCY</div>
                <div class="kpi-value">{average_competency:.1f}%</div>
                <div class="kpi-desc">
                Across assessed competencies
                </div>
            </div>
            """,
            unsafe_allow_html=True
        )


    # -----------------------------------------------------
    # EMPLOYEE OVERVIEW
    # -----------------------------------------------------

    st.markdown(
        """
        <div class="section">
            <div class="section-title">
                Employee Overview
            </div>
            <div class="section-subtitle">
                Current competency verification status across employees.
            </div>
        </div>
        """,
        unsafe_allow_html=True
    )


    for employee in employees:

        employee_verified = 0
        employee_total = len(employee["skills"])

        for skill_data in employee["skills"].values():

            if (
                skill_data["course_completed"]
                and skill_data["assessment_score"] >= 70
                and skill_data["practical_score"] >= 70
            ):
                employee_verified += 1


        if employee_verified == employee_total:

            status = "VERIFIED"
            status_icon = "✓"

        else:

            status = "SKILL GAP"
            status_icon = "⚠"


        # Use Streamlit columns instead of raw HTML span
        col1, col2, col3 = st.columns([4, 2, 1])

        with col1:

            st.markdown(
                f"""
                <div class="employee-card">
                    <div class="employee-name">
                        {employee["name"]}
                    </div>
                    <div class="employee-info">
                        {employee["employee_id"]} • {employee["role"]}
                    </div>
                    <div class="employee-info">
                        {employee_verified} of {employee_total}
                        competencies verified
                    </div>
                </div>
                """,
                unsafe_allow_html=True
            )

        with col3:

            if status == "VERIFIED":
                st.success("✓ VERIFIED")
            else:
                st.markdown("""
                <div style="
                    background-color: #FFFDF5;
                    border: 1px solid #E6C85C;
                    padding: 14px 18px;
                    border-radius: 8px;
                    color: #333333;
                    font-weight: 600;
                ">
                    ⚠️ SKILL GAP<br>
                    <span style="font-weight: 400;">
                    This skill needs improvement. Please refer to recommended learning resources.
                    </span>
                </div>
                """, unsafe_allow_html=True)

# =========================================================
# OTHER MODULES
# =========================================================

elif selected_page == "👤 Employee Profile":

    st.markdown(
        '<div class="main-title">Employee Profile</div>',
        unsafe_allow_html=True
    )

    st.markdown(
        """
        <div class="main-subtitle">
        View employee skills, training history and verified competency.
        </div>
        """,
        unsafe_allow_html=True
    )

    # Employee selector
    employee_names = [employee["name"] for employee in employees]

    selected_employee_name = st.selectbox(
        "Select Employee",
        employee_names
    )

    selected_employee = next(
        employee for employee in employees
        if employee["name"] == selected_employee_name
    )

    # Employee information
    st.markdown(
        """
        <div class="section">
            <div class="section-title">
                Employee Information
            </div>
        </div>
        """,
        unsafe_allow_html=True
    )

    col1, col2, col3 = st.columns(3)

    with col1:
        st.metric(
            "Employee ID",
            selected_employee["employee_id"]
        )

    with col2:
        st.metric(
            "Role",
            selected_employee["role"]
        )

    with col3:
        st.metric(
            "Total Skills",
            len(selected_employee["skills"])
        )

    # Skills
    st.markdown(
        """
        <div class="section">
            <div class="section-title">
                Competency Profile
            </div>
            <div class="section-subtitle">
                Current performance across registered skills.
            </div>
        </div>
        """,
        unsafe_allow_html=True
    )

    for skill_name, skill_data in selected_employee["skills"].items():

        competency_score = (
            skill_data["assessment_score"]
            + skill_data["practical_score"]
        ) / 2

        verified = (
            skill_data["course_completed"]
            and skill_data["assessment_score"] >= 70
            and skill_data["practical_score"] >= 70
        )

        st.markdown(f"### {skill_name}")

        col1, col2, col3, col4 = st.columns(4)

        with col1:
            st.metric(
                "Assessment",
                f'{skill_data["assessment_score"]}%'
            )

        with col2:
            st.metric(
                "Practical",
                f'{skill_data["practical_score"]}%'
            )

        with col3:
            st.metric(
                "Competency",
                f"{competency_score:.1f}%"
            )

        with col4:
            if verified:
                st.success("✓ VERIFIED")
            else:
                st.markdown("""
                <div style="background-color:#FFFDF5; padding:12px 16px; border-radius:8px; color:#222; font-weight:600;">
                ⚠️ SKILL GAP — This skill needs improvement.
                </div>
                """, unsafe_allow_html=True)

        st.progress(
            min(competency_score / 100, 1.0)
        )

        st.caption(
            f'Course: {skill_data["course_name"]} | '
            f'Course Completed: {"Yes" if skill_data["course_completed"] else "No"}'
        )

        st.divider()


elif selected_page == "📊 Skill Gap Analysis":

    st.title("Skill Gap Analysis")

    st.write(
        "Identify the difference between an employee's current competency "
        "and the required competency level."
    )

    st.divider()

    # Employee Selection
    employee_names = [employee["name"] for employee in employees]

    selected_employee_name = st.selectbox(
        "Select Employee",
        employee_names,
        key="gap_employee"
    )

    selected_employee = next(
        employee for employee in employees
        if employee["name"] == selected_employee_name
    )

    REQUIRED_SCORE = 70

    # Calculate skill results
    results = []

    for skill_name, skill_data in selected_employee["skills"].items():

        current_score = (
            skill_data["assessment_score"]
            + skill_data["practical_score"]
        ) / 2

        gap = max(0, REQUIRED_SCORE - current_score)

        verified = (
            skill_data["course_completed"]
            and skill_data["assessment_score"] >= 70
            and skill_data["practical_score"] >= 70
        )

        results.append({
            "skill": skill_name,
            "current": current_score,
            "required": REQUIRED_SCORE,
            "gap": gap,
            "verified": verified
        })

    # Summary
    total_skills = len(results)
    verified_skills_count = sum(
        result["verified"] for result in results
    )
    development_gaps = total_skills - verified_skills_count

    average_competency = (
        sum(result["current"] for result in results)
        / total_skills
        if total_skills > 0
        else 0
    )

    st.subheader("Competency Summary")

    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.metric(
            "Skills Assessed",
            total_skills
        )

    with col2:
        st.metric(
            "Verified Skills",
            verified_skills_count
        )

    with col3:
        st.metric(
            "Development Gaps",
            development_gaps
        )

    with col4:
        st.metric(
            "Average Competency",
            f"{average_competency:.1f}%"
        )

    st.divider()

    # Detailed analysis
    st.subheader("Competency Gap Details")

    for result in results:

        skill = result["skill"]
        current = result["current"]
        required = result["required"]
        gap = result["gap"]
        verified = result["verified"]

        st.markdown(f"### {skill}")

        col1, col2, col3 = st.columns(3)

        with col1:
            st.metric(
                "Current Competency",
                f"{current:.1f}%"
            )

        with col2:
            st.metric(
                "Required Level",
                f"{required}%"
            )

        with col3:
            st.metric(
                "Skill Gap",
                f"{gap:.1f}%"
            )

        st.write("Competency Progress")

        st.progress(
            min(int(current), 100)
        )

        if verified:

            st.success(
                f"✓ {skill}: Competency requirement satisfied."
            )

        else:

            st.warning(
                f"⚠ {skill}: Development required. "
                f"{gap:.1f} percentage points below the required level."
            )

        st.divider()

    # Overall result
    if development_gaps > 0:

        st.warning(
            f"{selected_employee['name']} requires development "
            f"in {development_gaps} skill(s)."
        )

    else:

        st.success(
            f"{selected_employee['name']} meets the required "
            "competency level for all assessed skills."
        )


elif selected_page == "📚 Learning Recommendations":

    st.title("Learning Recommendations")

    st.write(
        "Personalized learning recommendations based on identified "
        "employee skill gaps."
    )

    st.divider()

    # -----------------------------------------------------
    # EMPLOYEE SELECTION
    # -----------------------------------------------------

    employee_names = [employee["name"] for employee in employees]

    selected_employee_name = st.selectbox(
        "Select Employee",
        employee_names,
        key="learning_employee"
    )

    selected_employee = next(
        employee for employee in employees
        if employee["name"] == selected_employee_name
    )

    REQUIRED_SCORE = 70

    # -----------------------------------------------------
    # COURSE CATALOGUE
    # -----------------------------------------------------

    course_catalogue = {
        "Python": {
            "course": "Python Practical Skills",
            "level": "Intermediate",
            "duration": "4 weeks",
            "reason": "Strengthen practical Python application and problem-solving."
        },

        "SQL": {
            "course": "SQL Fundamentals & Data Queries",
            "level": "Beginner",
            "duration": "3 weeks",
            "reason": "Build database querying and SQL problem-solving skills."
        },

        "Machine Learning": {
            "course": "Applied Machine Learning",
            "level": "Intermediate",
            "duration": "5 weeks",
            "reason": "Improve model-building and machine learning fundamentals."
        },

        "Cloud": {
            "course": "Cloud Computing Fundamentals",
            "level": "Beginner",
            "duration": "4 weeks",
            "reason": "Develop foundational cloud concepts and services."
        },

        "Data Analytics": {
            "course": "Data Analytics with Python",
            "level": "Intermediate",
            "duration": "4 weeks",
            "reason": "Improve analytical techniques and data interpretation."
        },

        "Power BI": {
            "course": "Power BI Dashboard Development",
            "level": "Intermediate",
            "duration": "3 weeks",
            "reason": "Build practical dashboard and reporting capabilities."
        },

        "Generative AI": {
            "course": "Generative AI Fundamentals",
            "level": "Beginner",
            "duration": "3 weeks",
            "reason": "Develop practical understanding of modern generative AI."
        },

        "Statistics": {
            "course": "Applied Statistics",
            "level": "Intermediate",
            "duration": "4 weeks",
            "reason": "Strengthen statistical reasoning and data interpretation."
        }
    }

    # -----------------------------------------------------
    # IDENTIFY GAPS
    # -----------------------------------------------------

    recommendations = []

    for skill_name, skill_data in selected_employee["skills"].items():

        competency_score = (
            skill_data["assessment_score"]
            + skill_data["practical_score"]
        ) / 2

        gap = max(
            0,
            REQUIRED_SCORE - competency_score
        )

        if gap > 0:

            course = course_catalogue.get(
                skill_name,
                {
                    "course": f"{skill_name} Development Program",
                    "level": "Recommended",
                    "duration": "4 weeks",
                    "reason": f"Improve competency in {skill_name}."
                }
            )

            if gap >= 40:
                priority = "High"

            elif gap >= 15:
                priority = "Medium"

            else:
                priority = "Low"

            recommendations.append({
                "skill": skill_name,
                "current": competency_score,
                "gap": gap,
                "course": course["course"],
                "level": course["level"],
                "duration": course["duration"],
                "reason": course["reason"],
                "priority": priority
            })

    # -----------------------------------------------------
    # SUMMARY
    # -----------------------------------------------------

    st.subheader("Learning Plan")

    col1, col2, col3 = st.columns(3)

    with col1:
        st.metric(
            "Skills Requiring Development",
            len(recommendations)
        )

    with col2:
        high_priority = sum(
            1 for item in recommendations
            if item["priority"] == "High"
        )

        st.metric(
            "High Priority",
            high_priority
        )

    with col3:
        st.metric(
            "Employee",
            selected_employee["name"]
        )

    st.divider()

    # -----------------------------------------------------
    # RECOMMENDATIONS
    # -----------------------------------------------------

    if recommendations:

        st.subheader("Recommended Learning")

        for item in recommendations:

            st.markdown(f"### {item['skill']}")

            col1, col2, col3 = st.columns(3)

            with col1:
                st.metric(
                    "Current Competency",
                    f"{item['current']:.1f}%"
                )

            with col2:
                st.metric(
                    "Skill Gap",
                    f"{item['gap']:.1f}%"
                )

            with col3:
                st.metric(
                    "Priority",
                    item["priority"]
                )

            st.markdown(
                f"**Recommended Course:** {item['course']}"
            )

            st.write(
                f"**Level:** {item['level']}  \n"
                f"**Duration:** {item['duration']}"
            )

            st.info(
                f"Why this course? {item['reason']}"
            )

            if st.button(
                f"Start Learning — {item['skill']}",
                key=f"learn_{item['skill']}"
            ):

                st.success(
                    f"Learning plan created for {item['skill']}."
                )

            st.divider()

    else:

        st.success(
            f"{selected_employee['name']} currently has no "
            "identified learning gaps."
        )

elif selected_page == "📝 Assessments":

    st.title("Assessment Center")

    st.write(
        "Evaluate employee knowledge and practical competency "
        "through skill-based assessments."
    )

    st.divider()

    # -----------------------------------------------------
    # EMPLOYEE SELECTION
    # -----------------------------------------------------

    employee_names = [employee["name"] for employee in employees]

    selected_employee_name = st.selectbox(
        "Select Employee",
        employee_names,
        key="assessment_employee"
    )

    selected_employee = next(
        employee for employee in employees
        if employee["name"] == selected_employee_name
    )

    # -----------------------------------------------------
    # SKILL SELECTION
    # -----------------------------------------------------

    skill_names = list(selected_employee["skills"].keys())

    selected_skill = st.selectbox(
        "Select Skill",
        skill_names,
        key="assessment_skill"
    )

    st.divider()

    st.subheader(f"{selected_skill} Assessment")
    st.markdown(
        """
        <style>
        .assessment-question {
            color: #172033 !important;
            font-size: 18px !important;
            font-weight: 600 !important;
            margin-top: 20px !important;
            margin-bottom: 10px !important;
        }

        div[data-testid="stRadio"] label {
            color: #172033 !important;
            font-size: 15px !important;
        }

        div[data-testid="stRadio"] p {
            color: #172033 !important;
        }
        </style>
        """,
        unsafe_allow_html=True
    )

    st.info(
        f"Assessment for {selected_employee['name']} — "
        f"{selected_skill}"
    )

    # -----------------------------------------------------
    # QUESTIONS
    # -----------------------------------------------------

    questions = {

        "Python": [
            {
                "question": "Which data structure stores key-value pairs in Python?",
                "options": [
                    "List",
                    "Dictionary",
                    "Tuple"
                ],
                "answer": "Dictionary"
            },
            {
                "question": "Which keyword is used to define a function?",
                "options": [
                    "function",
                    "def",
                    "define"
                ],
                "answer": "def"
            },
            {
                "question": "Which symbol is used for a Python comment?",
                "options": [
                    "#",
                    "//",
                    "/*"
                ],
                "answer": "#"
            }
        ],

        "SQL": [
            {
                "question": "Which SQL command is used to retrieve data?",
                "options": [
                    "SELECT",
                    "INSERT",
                    "UPDATE"
                ],
                "answer": "SELECT"
            },
            {
                "question": "Which clause is used to filter records?",
                "options": [
                    "ORDER BY",
                    "WHERE",
                    "GROUP BY"
                ],
                "answer": "WHERE"
            },
            {
                "question": "Which command adds a new record?",
                "options": [
                    "INSERT",
                    "DELETE",
                    "ALTER"
                ],
                "answer": "INSERT"
            }
        ],

        "Machine Learning": [
            {
                "question": "Which type of learning uses labelled data?",
                "options": [
                    "Supervised Learning",
                    "Unsupervised Learning",
                    "Reinforcement Learning"
                ],
                "answer": "Supervised Learning"
            }
        ],

        "Cloud": [
            {
                "question": "Which model provides virtualized computing resources?",
                "options": [
                    "IaaS",
                    "SaaS",
                    "DaaS"
                ],
                "answer": "IaaS"
            }
        ],

        "Data Analytics": [
            {
                "question": "Which process involves examining data to find useful patterns?",
                "options": [
                    "Data Analysis",
                    "Data Deletion",
                    "Data Compression"
                ],
                "answer": "Data Analysis"
            }
        ],

        "Power BI": [
            {
                "question": "Power BI is primarily used for:",
                "options": [
                    "Data visualization and analytics",
                    "Operating system management",
                    "Hardware design"
                ],
                "answer": "Data visualization and analytics"
            }
        ],

        "Generative AI": [
            {
                "question": "Generative AI is primarily designed to:",
                "options": [
                    "Generate new content",
                    "Only store data",
                    "Only delete data"
                ],
                "answer": "Generate new content"
            }
        ],

        "Statistics": [
            {
                "question": "Which measure represents the average of a dataset?",
                "options": [
                    "Mean",
                    "Range",
                    "Mode"
                ],
                "answer": "Mean"
            }
        ]
    }

    skill_questions = questions.get(
        selected_skill,
        []
    )

    # -----------------------------------------------------
    # ASSESSMENT FORM
    # -----------------------------------------------------

    answers = {}

    for index, question in enumerate(skill_questions):
        st.markdown(
            f'<div class="assessment-question">'
            f'Question {index + 1}: {question["question"]}'
            f'</div>',
            unsafe_allow_html=True
        )
        answers[index] = st.radio(
            "Select your answer:",
            question["options"],
            key=f"question_{selected_skill}_{index}"
        )

        st.divider()

    # -----------------------------------------------------
    # SUBMIT
    # -----------------------------------------------------

    if st.button(
        "Submit Assessment",
        type="primary"
    ):

        correct_answers = 0

        for index, question in enumerate(skill_questions):

            if answers[index] == question["answer"]:
                correct_answers += 1

        total_questions = len(skill_questions)

        if total_questions > 0:

            score = (
                correct_answers / total_questions
            ) * 100

        else:

            score = 0

        st.success(
            f"Assessment completed — Score: {score:.0f}%"
        )

        col1, col2, col3 = st.columns(3)

        with col1:
            st.metric(
                "Correct Answers",
                f"{correct_answers}/{total_questions}"
            )

        with col2:
            st.metric(
                "Assessment Score",
                f"{score:.0f}%"
            )

        with col3:

            if score >= 70:
                st.success("PASS")
            else:
                st.warning("REVIEW REQUIRED")

        st.divider()

        st.info(
            "Assessment result can now be used by the "
            "Competency Verification module."
        )


elif selected_page == "✅ Competency Verification":

    st.title("Competency Verification")

    st.write(
        "Verify competency using course completion, assessment performance "
        "and practical evidence."
    )

    st.divider()

    # Employee
    employee_names = [employee["name"] for employee in employees]

    selected_employee_name = st.selectbox(
        "Select Employee",
        employee_names,
        key="verification_employee"
    )

    selected_employee = next(
        employee for employee in employees
        if employee["name"] == selected_employee_name
    )

    # Skill
    skill_names = list(selected_employee["skills"].keys())

    selected_skill = st.selectbox(
        "Select Skill",
        skill_names,
        key="verification_skill"
    )

    skill_data = selected_employee["skills"][selected_skill]

    # Verification
    result = verify_competency(skill_data)

    st.divider()

    st.subheader(
        f"{selected_employee['name']} — {selected_skill}"
    )

    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.metric(
            "Course",
            "Completed" if skill_data["course_completed"] else "Not Completed"
        )

    with col2:
        st.metric(
            "Assessment",
            f'{skill_data["assessment_score"]}%'
        )

    with col3:
        st.metric(
            "Practical Evidence",
            f'{skill_data["practical_score"]}%'
        )

    with col4:
        st.metric(
            "Competency Score",
            f'{result["competency_score"]}%'
        )

    st.divider()

    st.subheader("Verification Result")

    if result["status"] == "VERIFIED":

        st.success(
            f"✓ VERIFIED — {selected_skill} competency has been verified."
        )

        st.write(
            "Course completion, assessment performance and practical "
            "evidence satisfy the verification criteria."
        )

    else:

        st.warning(
            f"⚠ NOT VERIFIED — {selected_skill} requires further development."
        )

        st.write(
            "One or more verification criteria have not been satisfied."
        )

    st.divider()

    st.subheader("Verification Criteria")

    st.write("✓ Course completed")
    st.write("✓ Assessment score ≥ 70%")
    st.write("✓ Practical evidence score ≥ 70%")

    st.divider()

    if st.button("Run Verification", type="primary"):

        if result["status"] == "VERIFIED":
            st.success("Verification successful!")
        else:
            st.error("Verification failed. Skill needs improvement.")

elif "Project Matching" in selected_page:
    st.title("Project Matching")

    st.write(
        "Find projects that match an employee's verified skills."
    )

    # Load project data
    PROJECT_FILE = Path(__file__).parent / "data" / "projects.json"

    with open(PROJECT_FILE, "r", encoding="utf-8") as file:
        projects = json.load(file)
        # Select employee for project matching
    project_employee_name = st.selectbox(
        "Select Employee",
        [employee["name"] for employee in employees],
        key="project_employee"
    )

    selected_employee = next(
        employee for employee in employees
        if employee["name"] == project_employee_name
    )
    # Employee skills
    employee_skills = selected_employee["skills"]

    st.subheader(
        f"Matching Projects for {selected_employee['name']}"
    )

    for project in projects:

        matched_skills = 0
        total_skills = len(project["required_skills"])

        for skill, required_score in project["required_skills"].items():

            if skill in employee_skills:

                skill_data = employee_skills[skill]

                competency_score = (
                    skill_data["assessment_score"]
                    + skill_data["practical_score"]
                ) / 2

                if competency_score >= required_score:
                    matched_skills += 1

        match_percentage = (
            matched_skills / total_skills
        ) * 100

        st.markdown(
            f"<h3 style='color:#222222;'>{project['project_name']}</h3>",
            unsafe_allow_html=True
        )

        st.progress(
            min(match_percentage / 100,1.0)
        )

        st.markdown(
            f"<p style='color:#222222; font-size:18px;'><b>Project Match: {match_percentage:.0f}%</b></p>",
            unsafe_allow_html=True
        )

        if match_percentage >= 70:
            st.success("Suitable Project")
        elif match_percentage >= 40:
            st.warning("Partial Skill Match")
        else:
            st.error("Skill Gap")

        st.divider()

elif selected_page == "🔮 Workforce Simulator":

    st.title("Workforce Simulator")



    st.subheader("Workforce What-If Simulation")

    st.write(
        "Simulate how improving employee skills can change their project readiness."
    )

    employee_name = st.selectbox(
        "Select Employee",
        [employee["name"] for employee in employees],
        key="simulator_employee"
    )

    selected_sim_employee = next(
        employee for employee in employees
        if employee["name"] == employee_name
    )

    st.divider()

    st.subheader("Current Competency")

    skills = selected_sim_employee["skills"]

    for skill_name, skill_data in skills.items():

        current_score = (
            skill_data["assessment_score"]
            + skill_data["practical_score"]
        ) / 2

        st.write(
            f"**{skill_name}: {current_score:.0f}%**"
        )

    st.divider()

    st.subheader("What-If Skill Improvement")

    improvement = st.slider(
        "Simulate skill improvement",
        min_value=0,
        max_value=30,
        value=10,
        step=5,
        key="skill_improvement"
    )

    st.write(
        f"Simulated improvement: **+{improvement}%**"
    )

    st.divider()

    st.subheader("Simulated Competency")

    for skill_name, skill_data in skills.items():

        current_score = (
            skill_data["assessment_score"]
            + skill_data["practical_score"]
        ) / 2

        simulated_score = min(current_score + improvement, 100)

        col1, col2, col3 = st.columns(3)

        with col1:
            st.metric(
                "Current",
                f"{current_score:.0f}%"
            )

        with col2:
            st.metric(
                "Simulated",
                f"{simulated_score:.0f}%",
                delta=f"+{simulated_score - current_score:.0f}%"
            )

        with col3:
            if simulated_score >= 70:
                st.success("Competency Ready")
            else:
                st.warning("Needs Improvement")

        st.markdown(f"**{skill_name}**")
        st.divider()