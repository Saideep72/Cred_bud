import pandas as pd
from fastapi import UploadFile, HTTPException

async def parse_transaction_file(file: UploadFile) -> pd.DataFrame:
    try:
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file.file)
        elif file.filename.endswith(('.xls', '.xlsx')):
            df = pd.read_excel(file.file)
        else:
            raise HTTPException(status_code=400, detail="Invalid file format")
        
        # Standardize columns
        # Map common bank export columns to standard ones
        # Expected: Date, Description, Amount, Type
        
        return df
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error parsing file: {str(e)}")
