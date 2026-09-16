import json
import pandas as pd

def load_training_data(path="training_data.json"):
    with open(path, "r", encoding="utf-8") as file:
        return json.load(file)

def get_training_dataframe(data, training_id):
    program = next(p for p in data["training_programs"] if p["training_id"] == training_id)
    df = pd.DataFrame(program["employees"])
    df["gain"] = df["after"] - df["before"]
    df["relative_improvement"] = ((df["after"] - df["before"]) / df["before"] * 100).round(2)
    return program, df

def calculate_metrics(program, df):
    employees_trained = len(df)
    avg_before = round(df["before"].mean(), 2)
    avg_after = round(df["after"].mean(), 2)
    competency_gain = round(avg_after - avg_before, 2)
    verified_competencies = int(df["verified"].sum())
    readiness_improvement = competency_gain

    training_cost = employees_trained * program["cost_per_employee"]

    # Prototype ROI model:
    # Estimated business value = competency gain × number trained × ₹100
    estimated_value = round(competency_gain * employees_trained * 100, 2)
    roi_percent = round(((estimated_value - training_cost) / training_cost) * 100, 2) if training_cost else 0

    return {
        "employees_trained": employees_trained,
        "avg_before": avg_before,
        "avg_after": avg_after,
        "competency_gain": competency_gain,
        "verified_competencies": verified_competencies,
        "readiness_improvement": readiness_improvement,
        "training_cost": training_cost,
        "estimated_value": estimated_value,
        "roi_percent": roi_percent
    }
