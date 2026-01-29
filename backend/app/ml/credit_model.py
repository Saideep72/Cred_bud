import numpy as np
from sklearn.preprocessing import MinMaxScaler

class CreditScoringModel:
    def __init__(self):
        # Weights for the 6 parameters
        self.weights = np.array([
            0.15, # annual_income (normalized)
            0.20, # total_assets (normalized)
            -0.15, # total_debt (normalized) - negative impact
            -0.10, # num_debts (normalized) - negative impact
            -0.20, # monthly_emis (normalized) - negative impact
            -0.20  # amount_requested (normalized) - negative impact
        ])
        
        # Approximate bounds for normalization
        self.bounds = np.array([
            [10000, 2000000],   # annual_income (monthly * 12)
            [0, 5000000],       # total_assets
            [0, 1000000],       # total_debt
            [0, 10],            # num_debts
            [0, 100000],        # monthly_emis
            [10000, 1000000]    # amount_requested
        ])

    def predict(self, input_data: list) -> float:
        """
        Input order:
        1. monthly_income * 12
        2. total_assets
        3. total_debt_amount
        4. num_debts
        5. monthly_emis
        6. amount_requested
        """
        features = np.array(input_data)
        
        # Simple min-max normalization based on bounds
        # Clip to ensure we stay within expected range
        normalized = []
        for i, val in enumerate(features):
            min_v, max_v = self.bounds[i]
            norm_val = (val - min_v) / (max_v - min_v)
            norm_val = max(0.0, min(1.0, norm_val))
            normalized.append(norm_val)
            
        normalized = np.array(normalized)
        
        # Dot product with weights
        # Adjust base score so 0.5 is average
        score = np.dot(normalized, self.weights)
        
        # Sigmoid-like transformation to map to 0-1 probability
        final_score = 1 / (1 + np.exp(-5 * (score + 0.1))) # Shift and scale to center
        
        return float(final_score)

credit_model = CreditScoringModel()
