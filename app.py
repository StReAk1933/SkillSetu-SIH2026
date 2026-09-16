import streamlit as st
import pandas as pd
import plotly.express as px
from roi_engine import load_training_data, get_training_dataframe, calculate_metrics

st.set_page_config(
    page_title="SkillSetu - Training Impact & ROI",
    page_icon="📈",
    layout="wide"
)

st.title("📈 SkillSetu — Training Impact / ROI")
st.caption("Measure competency improvement before and after employee training.")

try:
    data = load_training_data()
except FileNotFoundError:
    st.error("training_data.json not found. Keep it in the same folder as app.py.")
    st.stop()

programs = data["training_programs"]
program_names = {p["training_name"]: p["training_id"] for p in programs}

selected_name = st.sidebar.selectbox("Select Training Program", list(program_names.keys()))
selected_id = program_names[selected_name]

program, df = get_training_dataframe(data, selected_id)
metrics = calculate_metrics(program, df)

st.subheader(program["training_name"])
st.write(f"**Skill:** {program['skill']}  |  **Cost per employee:** ₹{program['cost_per_employee']}")

c1, c2, c3, c4 = st.columns(4)
c1.metric("Employees Trained", metrics["employees_trained"])
c2.metric("Average Competency", f"{metrics['avg_before']}% → {metrics['avg_after']}%")
c3.metric("Average Gain", f"+{metrics['competency_gain']} points")
c4.metric("Verified Competencies", f"{metrics['verified_competencies']}/{metrics['employees_trained']}")

st.divider()

left, right = st.columns(2)

with left:
    chart_df = df[["name", "before", "after"]].melt(
        id_vars="name", var_name="Stage", value_name="Competency"
    )
    chart_df["Stage"] = chart_df["Stage"].map({"before": "Before Training", "after": "After Training"})
    fig = px.bar(
        chart_df,
        x="name",
        y="Competency",
        color="Stage",
        barmode="group",
        range_y=[0, 100],
        title="Competency Before vs After Training",
        labels={"name": "Employee", "Competency": "Competency (%)"}
    )
    st.plotly_chart(fig, use_container_width=True)

with right:
    gain_df = df[["name", "gain"]].sort_values("gain", ascending=False)
    fig2 = px.bar(
        gain_df,
        x="name",
        y="gain",
        range_y=[0, max(40, int(gain_df["gain"].max()) + 10)],
        title="Individual Competency Gain",
        labels={"name": "Employee", "gain": "Gain (percentage points)"}
    )
    st.plotly_chart(fig2, use_container_width=True)

st.subheader("📊 Training Impact Summary")
m1, m2, m3, m4 = st.columns(4)
m1.metric("Readiness Improvement", f"+{metrics['readiness_improvement']} points")
m2.metric("Training Cost", f"₹{metrics['training_cost']:,.0f}")
m3.metric("Estimated Business Value", f"₹{metrics['estimated_value']:,.0f}")
m4.metric("Prototype ROI", f"{metrics['roi_percent']}%")

st.info(
    "ROI is a prototype demonstration metric based on estimated business value. "
    "For a production system, the value model should use real business outcomes such as "
    "productivity, project delivery, revenue, or cost savings."
)

st.subheader("👥 Employee Training Results")
display_df = df.copy()
display_df["verified"] = display_df["verified"].map({True: "✅ Verified", False: "⚠ Pending"})
display_df = display_df.rename(columns={
    "employee_id": "Employee ID",
    "name": "Employee",
    "before": "Before (%)",
    "after": "After (%)",
    "gain": "Gain (points)",
    "relative_improvement": "Relative Improvement (%)",
    "verified": "Competency Status"
})
st.dataframe(
    display_df[
        ["Employee ID", "Employee", "Before (%)", "After (%)",
         "Gain (points)", "Relative Improvement (%)", "Competency Status"]
    ],
    use_container_width=True,
    hide_index=True
)

st.subheader("💡 Key Findings")
st.write(f"• Average competency increased by **{metrics['competency_gain']} percentage points**.")
st.write(f"• **{metrics['verified_competencies']} of {metrics['employees_trained']}** trained employees have verified competency.")
st.write(f"• Workforce readiness improved from **{metrics['avg_before']}% to {metrics['avg_after']}%**.")
st.write(f"• The prototype estimates a training ROI of **{metrics['roi_percent']}%** using the demo value model.")
