import pandas as pd
import openpyxl

# Read ANEX-IV sheet
df = pd.read_excel('QAQC-FS8-Acceptance.xlsx', sheet_name='ANEX-IV', header=None)

print("="*100)
print("ANEX-IV SHEET ANALYSIS")
print("="*100)

print(f"\nShape: {df.shape}")

print("\n" + "="*100)
print("FIRST 20 ROWS")
print("="*100)
for i in range(min(20, len(df))):
    print(f"\nRow {i}:")
    row = df.iloc[i]
    for j, val in enumerate(row):
        if pd.notna(val) and str(val).strip():
            print(f"  Col {j}: {val}")

print("\n" + "="*100)
print("CHECKING FOR PATTERNS - Headers and Data Structure")
print("="*100)

# Try to identify the structure
for i in range(min(10, len(df))):
    row = df.iloc[i]
    non_empty = [str(v) for v in row if pd.notna(v)]
    if len(non_empty) > 0:
        print(f"Row {i}: {' | '.join(non_empty[:10])}")  # First 10 non-empty values

print("\n" + "="*100)
print("LOOKING FOR VILLAGE REFERENCES")
print("="*100)

# Look for village names or LGD codes
for i in range(len(df)):
    row = df.iloc[i]
    row_str = ' '.join([str(v) for v in row if pd.notna(v)])
    if 'Beluru' in row_str or '611918' in row_str or 'Village' in row_str or 'LGD' in row_str:
        print(f"\nRow {i}: Found reference")
        for j, val in enumerate(row):
            if pd.notna(val):
                print(f"  Col {j}: {val}")

print("\n" + "="*100)
print("CHECKING COLUMN STRUCTURE")
print("="*100)

# Check what columns have data
for col in range(min(20, len(df.columns))):
    col_data = df.iloc[:, col].dropna()
    if len(col_data) > 0:
        print(f"\nColumn {col} ({len(col_data)} non-empty cells):")
        print(f"  Sample values: {list(col_data.head(5))}")
