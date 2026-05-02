import pandas as pd
import json

# loading the spreadsheet
df = pd.read_excel('ETHICAL COMPANIES SPREADSHEET.xlsx')

# Clean up the data into a dictionary
ethical_dict = {}
for _, row in df.iterrows():
    # Create a 'slug' (e.g., "Microsoft" -> "microsoft")
    brand_key = str(row['Company']).lower().strip()
    
    ethical_dict[brand_key] = {
        "rating": row['Rating (out of 100)'],
        "sector": row['Sector'],
        "tier": row['HRDD Tier'],
        "labor_risk": row['Child/Forced Labor Risk'],
        "summary": row['Summary'],
        "explanation": row['Explanation']
    }

# Save as brands.json
with open('brands.json', 'w') as f:
    json.dump(ethical_dict, f, indent=2)