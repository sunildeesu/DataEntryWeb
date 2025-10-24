import pandas as pd
import json

# Read the main ENTRY sheet
df = pd.read_excel('QAQC-FS8-Acceptance.xlsx', sheet_name='ENTRY', header=None)

print("="*80)
print("HEADER INFORMATION (Top Section)")
print("="*80)

# Extract header info (rows 0-6)
header_info = {}
for i in range(7):
    row_data = df.iloc[i].dropna().tolist()
    if row_data:
        print(f"Row {i}: {row_data}")

print("\n" + "="*80)
print("COLUMN HEADERS (Row 7 and 8)")
print("="*80)

# Get column headers from rows 7-8
headers_row7 = df.iloc[7].tolist()
headers_row8 = df.iloc[8].fillna('').tolist()

fields = []
for i, (h7, h8) in enumerate(zip(headers_row7, headers_row8)):
    if pd.notna(h7) and str(h7).strip():
        field_name = str(h7).strip()
        subfield = str(h8).strip() if h8 else ''
        fields.append({
            'column_index': i,
            'main_header': field_name,
            'sub_header': subfield,
            'combined': f"{field_name} - {subfield}" if subfield else field_name
        })
        print(f"Col {i}: {field_name}")
        if subfield:
            print(f"         Sub: {subfield}")

print("\n" + "="*80)
print("SAMPLE DATA (Row 9 - First data row)")
print("="*80)

# Get first data row
data_row = df.iloc[9].tolist()
for i, (field, value) in enumerate(zip(fields, data_row[:len(fields)])):
    if pd.notna(value):
        print(f"{field['main_header']}: {value}")

print("\n" + "="*80)
print("FIELD SUMMARY")
print("="*80)
print(f"Total fields identified: {len(fields)}")

# Save to JSON for reference
field_structure = {
    'total_fields': len(fields),
    'fields': fields
}

with open('field_structure.json', 'w') as f:
    json.dump(field_structure, f, indent=2)

print("\nField structure saved to field_structure.json")
