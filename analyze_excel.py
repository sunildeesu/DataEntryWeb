import pandas as pd
import json

# Read the Excel file
excel_file = 'QAQC-FS8-Acceptance.xlsx'

# Get all sheet names
xl_file = pd.ExcelFile(excel_file)
print(f"Sheet names: {xl_file.sheet_names}\n")

# Read and analyze each sheet
for sheet_name in xl_file.sheet_names:
    print(f"\n{'='*60}")
    print(f"Sheet: {sheet_name}")
    print(f"{'='*60}")

    df = pd.read_excel(excel_file, sheet_name=sheet_name)

    print(f"\nShape: {df.shape} (rows, columns)")
    print(f"\nColumns: {list(df.columns)}")
    print(f"\nFirst few rows:")
    print(df.head(10).to_string())

    print(f"\nData types:")
    print(df.dtypes.to_string())

    print(f"\nNon-null counts:")
    print(df.count().to_string())

    # Check for unique values in each column (if less than 20 unique values)
    print(f"\nUnique values per column:")
    for col in df.columns:
        unique_vals = df[col].dropna().unique()
        if len(unique_vals) < 20 and len(unique_vals) > 0:
            print(f"  {col}: {list(unique_vals)}")
        else:
            print(f"  {col}: {len(unique_vals)} unique values")

print("\n" + "="*60)
print("Analysis complete!")
