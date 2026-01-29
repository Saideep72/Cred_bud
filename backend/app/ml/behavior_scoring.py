import pandas as pd
from typing import Dict, Any

def analyze_behavior(df: pd.DataFrame) -> Dict[str, Any]:
    """
    Expects DataFrame with columns: ['Date', 'Description', 'Amount', 'Type']
    Type: 'CR' (Credit/Income) or 'DR' (Debit/Expense)
    """
    
    # Basic cleaning
    df['Amount'] = pd.to_numeric(df['Amount'], errors='coerce').fillna(0)
    df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
    
    # Categorize (Simple keyword based)
    def categorize(desc):
        desc = str(desc).lower()
        if 'salary' in desc or 'deposit' in desc: return 'Income'
        if 'food' in desc or 'grocer' in desc: return 'Food'
        if 'uber' in desc or 'fuel' in desc: return 'Transport'
        if 'emi' in desc or 'loan' in desc: return 'Loan'
        if 'invest' in desc or 'stock' in desc: return 'Investments'
        return 'Others'

    if 'Category' not in df.columns:
        df['Category'] = df['Description'].apply(categorize)

    # 1. Total Score (0-10) based on Savings Rate and Stability
    total_income = df[df['Type'] == 'CR']['Amount'].sum()
    total_expense = df[df['Type'] == 'DR']['Amount'].sum()
    
    savings_rate = (total_income - total_expense) / total_income if total_income > 0 else 0
    score = min(10, max(0, 5 + (savings_rate * 10))) # Base 5, add/subtract based on savings

    # 2. Category Scores
    category_gb = df[df['Type'] == 'DR'].groupby('Category')['Amount'].sum()
    total_spend = category_gb.sum()
    category_scores = {}
    for cat, amount in category_gb.items():
        # Lower portion of spend is better for non-essentials
        ratio = amount / total_spend if total_spend > 0 else 0
        if cat in ['Investments']:
            c_score = min(10, ratio * 20) # Higher is better
        elif cat in ['Loan']:
            c_score = max(0, 10 - (ratio * 20)) # Lower is better
        else:
            c_score = 5 # Neutral
        category_scores[cat] = float(c_score)

    # 3. Liquidity Resilience (Days cash can cover avg daily expense)
    days_range = (df['Date'].max() - df['Date'].min()).days
    if days_range > 0:
        daily_expense = total_expense / days_range
        balance = total_income - total_expense
        resilience_days = int(balance / daily_expense) if daily_expense > 0 else 30 # Default cap
    else:
        resilience_days = 0

    # 4. Rating
    if score >= 7: rating = "Good"
    elif score >= 4: rating = "Average"
    else: rating = "Bad"

    return {
        "total_score": round(score, 1),
        "behavior_rating": rating,
        "category_scores": category_scores,
        "liquidity_resilience_days": resilience_days,
        "stable_inflow": total_income > 0
    }
