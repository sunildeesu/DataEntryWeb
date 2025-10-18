import pandas as pd
import openpyxl

# Load the workbook
wb = openpyxl.load_workbook('QAQC-FS8-Acceptance.xlsx')

print("="*100)
print("EXTRACTING DROPDOWN VALUES FROM EXCEL")
print("="*100)

# Get Sheet3 for dropdown lists
sheet3 = wb['Sheet3']

print("\n1. EXAMINER NAMES (Sheet3!$F$20:$F$28)")
print("-"*50)
examiner_names = []
for row in range(20, 29):
    cell_value = sheet3[f'F{row}'].value
    if cell_value:
        examiner_names.append(cell_value)
        print(f"  - {cell_value}")

print("\n2. DESIGNATION (E3 in ENTRY)")
print("-"*50)
designations = "OFFICER SURVEYOR,SURVEYOR,D/MAN DIV I".split(',')
for d in designations:
    print(f"  - {d}")

print("\n3. DISTRICT (Sheet3!$L$20:$L$25)")
print("-"*50)
districts = []
for row in range(20, 26):
    cell_value = sheet3[f'L{row}'].value
    if cell_value:
        districts.append(cell_value)
        print(f"  - {cell_value}")

print("\n4. TALUK (Sheet3!$O$20:$O$35)")
print("-"*50)
taluks = []
for row in range(20, 36):
    cell_value = sheet3[f'O{row}'].value
    if cell_value:
        taluks.append(cell_value)
        print(f"  - {cell_value}")

print("\n5. AGENCY (Sheet3!I20:I29)")
print("-"*50)
agencies = []
for row in range(20, 30):
    cell_value = sheet3[f'I{row}'].value
    if cell_value:
        agencies.append(cell_value)
        print(f"  - {cell_value}")

print("\n" + "="*100)
print("CHECKING VILLAGE DATA TABLE - Are there any dropdowns?")
print("="*100)

# Check ENTRY sheet for data validation in rows 11+ (village data)
entry_sheet = wb['ENTRY']
print("\nData validation in ENTRY sheet:")
for dv in entry_sheet.data_validations.dataValidation:
    print(f"  Range: {dv.sqref}")
    print(f"  Type: {dv.type}")
    if dv.formula1:
        print(f"  Values: {dv.formula1}")

print("\n" + "="*100)
print("SUMMARY - FIELDS THAT SHOULD HAVE DROPDOWNS")
print("="*100)

print("\n✅ METADATA SECTION (should have dropdowns):")
print("  1. Examiner Name - Dropdown from list")
print("  2. Designation - Dropdown (OFFICER SURVEYOR, SURVEYOR, D/MAN DIV I)")
print("  3. District - Dropdown from list")
print("  4. Taluk - Dropdown from list")
print("  5. Agency - Dropdown from list")

print("\n❌ VILLAGE DATA TABLE (NO dropdowns in Excel):")
print("  - All village fields are FREE TEXT or NUMBER inputs")
print("  - No data validation in columns for village rows")

print("\n✅ ANEX-IV Check Points (should have dropdowns):")
print("  - On Marker: Y/N dropdown")
print("  - Spatially Well Distributed: Y/N dropdown")

wb.close()
