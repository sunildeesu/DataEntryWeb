import pandas as pd

# Read the Excel file
df = pd.read_excel('QAQC-FS8-Acceptance.xlsx', sheet_name='ENTRY', header=None)

print("="*100)
print("ANALYZING DATA VALIDATION AND DROPDOWN OPTIONS")
print("="*100)

# Check actual data rows (row 9 onwards) to see what kind of values are used
print("\nSample data from rows 9-15 (actual entries):")
print("-"*100)

for row_idx in range(9, min(15, len(df))):
    row = df.iloc[row_idx]
    print(f"\nRow {row_idx}:")
    for col_idx in range(min(41, len(row))):
        val = row.iloc[col_idx]
        if pd.notna(val) and str(val).strip():
            print(f"  Col {col_idx}: {val}")

# Now let's check the unique values in each column from the data rows
print("\n" + "="*100)
print("UNIQUE VALUES IN EACH COLUMN (from data rows 9+)")
print("="*100)

headers = df.iloc[8].tolist()  # Row 8 has the headers

for col_idx in range(min(41, len(df.columns))):
    # Get all values from row 9 onwards for this column
    col_data = df.iloc[9:, col_idx].dropna()

    if len(col_data) > 0:
        unique_vals = col_data.unique()
        header = headers[col_idx] if col_idx < len(headers) and pd.notna(headers[col_idx]) else f"Column {col_idx}"

        # Only show if there are less than 20 unique values (likely dropdowns)
        if len(unique_vals) < 20:
            print(f"\nColumn {col_idx}: {header}")
            print(f"  Unique values ({len(unique_vals)}): {list(unique_vals)}")

# Check for data validation in the Excel file
print("\n" + "="*100)
print("CHECKING OTHER SHEETS FOR REFERENCE DATA")
print("="*100)

xl_file = pd.ExcelFile('QAQC-FS8-Acceptance.xlsx')
for sheet_name in xl_file.sheet_names:
    if sheet_name not in ['ENTRY', 'Sheet1', 'Sheet2', 'Sheet3']:
        print(f"\n--- Sheet: {sheet_name} ---")
        try:
            sheet_df = pd.read_excel('QAQC-FS8-Acceptance.xlsx', sheet_name=sheet_name, header=None)
            print(f"Shape: {sheet_df.shape}")
            # Show first few rows
            print(sheet_df.head(10).to_string())
        except Exception as e:
            print(f"Error reading sheet: {e}")
