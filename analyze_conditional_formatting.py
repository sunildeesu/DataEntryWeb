import openpyxl
from openpyxl.formatting.rule import Rule

# Load the workbook
wb = openpyxl.load_workbook('QAQC-FS8-Acceptance.xlsx')

print("="*100)
print("ANALYZING CONDITIONAL FORMATTING RULES")
print("="*100)

# Get ENTRY sheet
entry_sheet = wb['ENTRY']

print("\nConditional Formatting Rules in ENTRY Sheet:")
print("-"*100)

if entry_sheet.conditional_formatting:
    print(f"\nFound {len(entry_sheet.conditional_formatting._cf_rules)} conditional formatting rules")

    for range_str, rules in entry_sheet.conditional_formatting._cf_rules.items():
        print(f"\n\nRange: {range_str}")
        print("-"*50)

        for idx, rule in enumerate(rules, 1):
            print(f"\n  Rule #{idx}:")
            print(f"    Type: {rule.type}")
            print(f"    Priority: {rule.priority}")

            if hasattr(rule, 'operator') and rule.operator:
                print(f"    Operator: {rule.operator}")

            if hasattr(rule, 'formula') and rule.formula:
                print(f"    Formula: {rule.formula}")

            if hasattr(rule, 'text') and rule.text:
                print(f"    Text: {rule.text}")

            if hasattr(rule, 'dxf') and rule.dxf:
                print(f"    Formatting:")
                if rule.dxf.fill:
                    print(f"      Fill: {rule.dxf.fill}")
                if rule.dxf.font:
                    print(f"      Font: {rule.dxf.font}")
                if rule.dxf.border:
                    print(f"      Border: {rule.dxf.border}")
else:
    print("No conditional formatting found")

# Based on the headers, let's identify the threshold columns
print("\n\n" + "="*100)
print("THRESHOLD FIELDS (from column headers)")
print("="*100)

thresholds = {
    'Q': {
        'name': 'ORI GSD',
        'threshold': '≤ 5 cm',
        'column': 17
    },
    'R': {
        'name': 'DEM GSD',
        'threshold': '≤ 10 cm',
        'column': 18
    },
    'S': {
        'name': 'Image Processing RMSE X',
        'threshold': '≤ 4.085 cm',
        'column': 19
    },
    'T': {
        'name': 'Image Processing RMSE Y',
        'threshold': '≤ 4.085 cm',
        'column': 20
    },
    'U': {
        'name': 'Image Processing RMSE Z',
        'threshold': '≤ 10.204 cm',
        'column': 21
    },
    'V': {
        'name': 'GCP Error RMSE X',
        'threshold': '≤ 10 cm',
        'column': 22
    },
    'W': {
        'name': 'GCP Error RMSE Y',
        'threshold': '≤ 10 cm',
        'column': 23
    },
    'X': {
        'name': 'GCP Error RMSE Z',
        'threshold': '≤ 20 cm',
        'column': 24
    },
    'Z': {
        'name': 'Network Adjustment X',
        'threshold': '≤ 2.5 cm',
        'column': 26
    },
    'AA': {
        'name': 'Network Adjustment Y',
        'threshold': '≤ 2.5 cm',
        'column': 27
    },
    'AB': {
        'name': 'Network Adjustment Z',
        'threshold': '≤ 5 cm',
        'column': 28
    }
}

print("\nFields with thresholds that should turn red when exceeded:")
print("-"*100)

for col_letter, info in thresholds.items():
    print(f"\n{col_letter} (Column #{info['column']}): {info['name']}")
    print(f"   Threshold: {info['threshold']}")

    # Check a sample cell for actual formatting
    sample_cell = entry_sheet[f'{col_letter}11']
    print(f"   Sample value in row 11: {sample_cell.value}")
    if sample_cell.fill:
        print(f"   Fill color: {sample_cell.fill.fgColor}")

# Check for any data in row 11 to see formatting
print("\n\n" + "="*100)
print("SAMPLE DATA FROM ROW 11 (to check formatting)")
print("="*100)

for col_letter in ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Z', 'AA', 'AB']:
    cell = entry_sheet[f'{col_letter}11']
    print(f"\n{col_letter}11: {cell.value}")
    if cell.fill and cell.fill.fgColor:
        print(f"  Fill: {cell.fill.fgColor}")

wb.close()

print("\n\n" + "="*100)
print("SUMMARY OF THRESHOLD VALIDATIONS NEEDED")
print("="*100)

print("""
Based on column headers, implement these validations:

1. ORI GSD (Column Q/#17): Value > 5 → RED
2. DEM GSD (Column R/#18): Value > 10 → RED
3. Image Processing X (Column S/#19): Value > 4.085 → RED
4. Image Processing Y (Column T/#20): Value > 4.085 → RED
5. Image Processing Z (Column U/#21): Value > 10.204 → RED
6. GCP Error X (Column V/#22): Value > 10 → RED
7. GCP Error Y (Column W/#23): Value > 10 → RED
8. GCP Error Z (Column X/#24): Value > 20 → RED
9. Network Adjustment X (Column Z/#26): Value > 2.5 → RED
10. Network Adjustment Y (Column AA/#27): Value > 2.5 → RED
11. Network Adjustment Z (Column AB/#28): Value > 5 → RED
""")
