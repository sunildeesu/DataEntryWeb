import pandas as pd
import json

# Read the Excel file
df = pd.read_excel('QAQC-FS8-Acceptance.xlsx', sheet_name='ENTRY', header=None)

print("="*100)
print("COMPLETE FIELD ANALYSIS FOR QA/QC DATA ENTRY FORM")
print("="*100)

# METADATA SECTION (Top section of the form)
metadata = {
    "examiner_info": [
        {"label": "Name of Examiner", "type": "text", "row": 0, "col": 4},
        {"label": "Designation", "type": "text", "row": 1, "col": 4},
    ],
    "dates": [
        {"label": "Commenced On", "type": "date", "row": 0, "col": 9},
        {"label": "Finished On", "type": "date", "row": 1, "col": 9},
        {"label": "No of Days", "type": "number", "row": 1, "col": 11},
        {"label": "Data Received Date", "type": "date", "row": 3, "col": 4},
    ],
    "location": [
        {"label": "District", "type": "text", "row": 3, "col": 7},
        {"label": "Taluk", "type": "text", "row": 4, "col": 7},
    ],
    "submission_info": [
        {"label": "Fresh Submission / Resubmission", "type": "text", "row": 4, "col": 4},
        {"label": "Hard Disk No", "type": "text", "row": 3, "col": 9},
        {"label": "Name of Empanelled Agency", "type": "text", "row": 5, "col": 5},
    ]
}

# DATA ENTRY TABLE COLUMNS (Row 8 contains the main column headers)
row8 = df.iloc[8]
row7 = df.iloc[7]  # Some parent headers

data_columns = []
for i in range(len(row8)):
    val = row8.iloc[i]
    parent_val = row7.iloc[i] if i < len(row7) else None

    if pd.notna(val) and str(val).strip():
        col_name = str(val).strip()
        parent_name = str(parent_val).strip() if pd.notna(parent_val) else ""

        # Determine field type based on name
        field_type = "text"
        if "date" in col_name.lower():
            field_type = "date"
        elif "no" in col_name.lower() or "height" in col_name.lower() or "pixel" in col_name.lower():
            field_type = "number"
        elif "rmse" in col_name.lower() or "error" in col_name.lower():
            field_type = "number"
        elif "accepted/rejected" in col_name.lower():
            field_type = "select"
        elif col_name in ["X", "Y", "Z"]:
            field_type = "number"

        data_columns.append({
            "index": i,
            "label": col_name,
            "parent_label": parent_name,
            "type": field_type,
            "full_label": f"{parent_name} - {col_name}" if parent_name and parent_name != col_name else col_name
        })

print(f"\nFound {len(data_columns)} data entry columns\n")

# Print organized columns
print("DATA ENTRY COLUMNS:")
print("-" * 100)
for col in data_columns:
    print(f"{col['index']:3d}. [{col['type']:10s}] {col['full_label']}")

# Create comprehensive structure
complete_structure = {
    "form_title": "QA/QC Data Entry - Drone Survey Data",
    "metadata_sections": metadata,
    "data_table_columns": data_columns,
    "total_columns": len(data_columns)
}

# Save to JSON
with open('qaqc_form_structure.json', 'w', encoding='utf-8') as f:
    json.dump(complete_structure, f, indent=2, ensure_ascii=False)

print(f"\n{'='*100}")
print("Complete form structure saved to: qaqc_form_structure.json")
print(f"{'='*100}")

# Print summary
print("\nFORM STRUCTURE SUMMARY:")
print(f"  - Examiner Info Fields: {len(metadata['examiner_info'])}")
print(f"  - Date Fields: {len(metadata['dates'])}")
print(f"  - Location Fields: {len(metadata['location'])}")
print(f"  - Submission Info Fields: {len(metadata['submission_info'])}")
print(f"  - Data Entry Columns: {len(data_columns)}")
print(f"  - Total Fields: {len(metadata['examiner_info']) + len(metadata['dates']) + len(metadata['location']) + len(metadata['submission_info']) + len(data_columns)}")
