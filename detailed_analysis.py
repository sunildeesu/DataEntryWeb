import pandas as pd
import json

# Read the main ENTRY sheet without header
df = pd.read_excel('QAQC-FS8-Acceptance.xlsx', sheet_name='ENTRY', header=None)

print("="*100)
print("METADATA SECTION (Rows 0-6)")
print("="*100)

metadata_fields = []

# Row 0: Name of Examiner, Commenced On, No of Days
if pd.notna(df.iloc[0, 3]):
    metadata_fields.append({"field": "Name of Examiner", "value": str(df.iloc[0, 4]) if pd.notna(df.iloc[0, 4]) else ""})
if pd.notna(df.iloc[0, 8]):
    metadata_fields.append({"field": "Commenced On", "value": str(df.iloc[0, 9]) if pd.notna(df.iloc[0, 9]) else ""})
if pd.notna(df.iloc[0, 11]):
    metadata_fields.append({"field": "No of Days", "value": ""})

# Row 1: Designation, Finished On
if pd.notna(df.iloc[1, 3]):
    metadata_fields.append({"field": "Designation", "value": str(df.iloc[1, 4]) if pd.notna(df.iloc[1, 4]) else ""})
if pd.notna(df.iloc[1, 8]):
    metadata_fields.append({"field": "Finished On", "value": str(df.iloc[1, 9]) if pd.notna(df.iloc[1, 9]) else ""})

# Row 3: Data Received Date, District, Hard Disk No
if pd.notna(df.iloc[3, 3]):
    metadata_fields.append({"field": "Data Received Date", "value": str(df.iloc[3, 4]) if pd.notna(df.iloc[3, 4]) else ""})
if pd.notna(df.iloc[3, 6]):
    metadata_fields.append({"field": "District", "value": str(df.iloc[3, 7]) if pd.notna(df.iloc[3, 7]) else ""})
if pd.notna(df.iloc[3, 9]):
    metadata_fields.append({"field": "Hard Disk No", "value": ""})

# Row 4: Fresh Submission/Resubmission, Taluk
if pd.notna(df.iloc[4, 3]):
    metadata_fields.append({"field": "Fresh Submission / Resubmission", "value": str(df.iloc[4, 4]) if pd.notna(df.iloc[4, 4]) else ""})
if pd.notna(df.iloc[4, 6]):
    metadata_fields.append({"field": "Taluk", "value": str(df.iloc[4, 7]) if pd.notna(df.iloc[4, 7]) else ""})

# Row 5: Name of Empanelled Agency
if pd.notna(df.iloc[5, 3]):
    metadata_fields.append({"field": "Name of Empanelled Agency", "value": str(df.iloc[5, 5]) if pd.notna(df.iloc[5, 5]) else ""})

print("\nMETADATA FIELDS:")
for field in metadata_fields:
    print(f"  - {field['field']}")

print("\n" + "="*100)
print("DATA ENTRY FIELDS (Row 7)")
print("="*100)

# Get the column headers from row 7
headers = []
row7 = df.iloc[7]

for i in range(len(row7)):
    val = row7.iloc[i]
    if pd.notna(val) and str(val).strip():
        headers.append({
            'index': i,
            'name': str(val).strip()
        })
        print(f"Col {i:2d}: {str(val).strip()}")

print("\n" + "="*100)
print("SUB-HEADERS (Row 8 - for multi-column fields)")
print("="*100)

row8 = df.iloc[8]
for i in range(len(row8)):
    val = row8.iloc[i]
    if pd.notna(val) and str(val).strip():
        print(f"Col {i:2d}: {str(val).strip()}")

print("\n" + "="*100)
print("COMPLETE FIELD STRUCTURE")
print("="*100)

# Build complete structure
all_fields = {
    'metadata': metadata_fields,
    'data_entry_columns': []
}

# Parse complex multi-column fields
i = 0
while i < len(headers):
    header = headers[i]
    field_def = {
        'name': header['name'],
        'column_index': header['index'],
        'type': 'text',
        'subfields': []
    }

    # Check for sub-columns (X, Y, Z) or other sub-headers
    next_idx = i + 1
    if next_idx < len(headers):
        next_col_idx = headers[next_idx]['index']
        # Check columns between current and next header
        for col in range(header['index'], next_col_idx):
            sub_val = row8.iloc[col]
            if pd.notna(sub_val) and str(sub_val).strip():
                field_def['subfields'].append({
                    'column_index': col,
                    'name': str(sub_val).strip()
                })

    all_fields['data_entry_columns'].append(field_def)
    i += 1

# Print structured fields
print("\nSTRUCTURED FIELDS:")
print(json.dumps(all_fields, indent=2))

# Save to JSON
with open('complete_field_structure.json', 'w') as f:
    json.dump(all_fields, f, indent=2)

print("\n" + "="*100)
print("Complete field structure saved to: complete_field_structure.json")
print("="*100)
