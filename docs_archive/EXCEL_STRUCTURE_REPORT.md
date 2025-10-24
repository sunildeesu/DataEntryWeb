# QAQC-FS8-Acceptance.xlsx - Complete Structure Analysis Report

## Executive Summary

This report documents the complete structure, formatting, and characteristics of the QAQC-FS8-Acceptance.xlsx workbook. This information is critical for preserving all formatting when exporting data programmatically.

---

## 1. WORKBOOK OVERVIEW

### Sheet List (15 sheets in order):
1. **ENTRY** - Main data entry sheet
2. **Sheet3** - Supporting data/calculations
3. **ANEX-I** - Annex I report
4. **ANEX-II** - Annex II report
5. **ANX-III** - Annex III report
6. **ANEX-IV** - Annex IV report (TARGET SHEET FOR EXPORT)
7. **ANEX-IV -print** - Print version of Annex IV
8. **PRINT** - Print layout
9. **ACCEPTED** - Accepted villages
10. **REJECTED** - Rejected villages
11. **Sheet1** - Supporting calculations
12. **AC-ENTRY SCREEN** - Acceptance entry
13. **AC-CERTIFICATE** - Acceptance certificate
14. **FOR ACRCIVAL** - Archival sheet
15. **Sheet2** - Supporting data

---

## 2. ANEX-IV SHEET - DETAILED ANALYSIS

### 2.1 Basic Information
- **Sheet Name:** ANEX-IV
- **Dimensions:** 42 rows × 26 columns (A to Z)
- **Actual Used Range:** 42 rows × 16 columns (A to P)
- **Sheet Protection:** DISABLED

### 2.2 HEADER ROW (Row 1) - CRITICAL FORMATTING

**Cell A1 (Merged across A1:P1):**
- **Value:** "Horizontal ORI Accuracy and Vertical DEM Accuracy (Check Point) Conformance (3.5.2(b))"
- **Merged Range:** A1:P1 (spans entire width)
- **Background Color:** #C6D9F0 (Light Blue) - RGB: FFC6D9F0
- **Pattern Type:** Solid fill
- **Font:**
  - Family: Arial
  - Size: 14pt
  - Weight: Bold
  - Color: Default (black)
- **Alignment:**
  - Horizontal: Center
  - Vertical: Center (implied)
  - Wrap Text: Yes (enabled)
- **Border:**
  - Top: Medium
  - Bottom: Medium
  - Left: Medium
  - Right: Medium

**Note:** Columns B1 through P1 are part of the merged cell A1:P1

### 2.3 Metadata Rows (Rows 2-4)

**Row 2 - Data Received Date & Hard Disk Info:**
- A2:B2 merged = "DATA RECEIVED DATE" (Yellow background #FFFFCC, bold, right-aligned)
- C2:D2 merged = Formula: `=ENTRY!E5` (Light orange #FFFFCC99, center-aligned)
- E2:G2 merged = "HARD DISK NO." (Yellow background #FFFFCC, right-aligned)
- H2:J2 merged = Formula: `=ENTRY!J6` (Light orange #FFFFCC99, center-aligned)

**Row 3 - Agency Information:**
- A3:C3 merged = "NAME OF EMPANALLED AGENCY" (Yellow background #FFFFCC, bold, right-aligned)
- D3:F3 merged = Formula: `=ENTRY!F7` (Yellow background #FFFFCC, bold, center-aligned)
- G3, H3, I3, J3 = Empty cells (Bold, center-aligned)

**Row 4 - Column Number Headers:**
- A4 = "SL NO" (Yellow background #FFFFCC, center-aligned)
- B4:C4 merged = "VILLAGE NAME_LGD CODE" (Yellow background #FFFFCC, center-aligned)
- D4 = Formula: `=ENTRY!E6` (Yellow background #FFFFCC, bold, center-aligned)
- E4 through P4 = Numbers 1.0, 2.0, 3.0, ... 12.0 (Yellow background #FFFFCC, center-aligned)

### 2.4 Data Section Structure (Rows 5-9: First Village Block)

Each village block consists of 5 rows with the following pattern:

**Row 5 (Example: Village 1):**
- A5:A9 merged = "1.0" (Serial number, center-aligned)
- B5:C7 merged = Formula: `=CONCATENATE(ENTRY!D11,-ENTRY!E11)` (Village name_LGD code)
- D5 = "Check points Name" (Yellow background #FFFFFFCC)
- E5 through P5 = Check point IDs (e.g., "611918_BELURU_CP_1", "611918_BELURU_CP_2", etc.)

**Row 6:**
- D6 = "H.Dist Error" (Yellow with special formatting)
- E6 through P6 = Horizontal distance error values (numeric)

**Row 7:**
- D7 = "Actual height" (Yellow background #FFFFFFCC)
- E7 through P7 = Actual height values (numeric, right-aligned)

**Row 8:**
- B8:C9 merged (vertically) = "1.On Marker(3.2.c) (Y/N)" (Yellow background #FFFFFFCC)
- C8:C9 = Validation dropdown (Y/N)
- D8 = "Observed height" (Yellow background #FFFFFFCC)
- E8 through P8 = Observed height values (numeric, right-aligned)

**Row 9:**
- B9:C9 portion = "2.Spatially Well Distributed(3.5.(II).3) (Y/N)"
- C9 = Validation dropdown (Y/N)
- D9 = "Height Error" (Special formatting)
- E9 through P9 = Formulas: `=(E7-E8)*100`, `=(F7-F8)*100`, etc.

**Pattern repeats for each village** (rows 10-14, 15-19, 20-24, 25-29, 30-34, 35-39)

### 2.5 Column Widths

| Column | Width | Purpose |
|--------|-------|---------|
| A | 9.29 | Serial number |
| B | 20.29 | Village name |
| C | 3.29 | Separator/validation |
| D | 15.43 | Field labels |
| E | 8.00 | Data column 1 |
| F-P | Default (8.43) | Data columns 2-12 |

### 2.6 Row Heights

| Row | Height | Description |
|-----|--------|-------------|
| 1 | Default | Header row |
| 2 | 15.00 | Metadata |
| 3 | 21.00 | Metadata |
| 4 | 15.00 | Column numbers |
| 5 | Default | Data |
| 6-9 | 24.00 | Data rows |
| 10 | 24.00 | Next village starts |

**Pattern:** Each 5-row village block has rows 6-9 (2nd-5th rows of block) set to height 24.00

### 2.7 Merged Cells (26 total ranges)

Complete list of merged cell ranges:
1. **A1:P1** - Main header
2. **A2:B2** - "DATA RECEIVED DATE" label
3. **C2:D2** - Data received date value
4. **E2:G2** - "HARD DISK NO." label
5. **H2:J2** - Hard disk number value
6. **A3:C3** - Agency label
7. **D3:F3** - Agency name
8. **B4:C4** - Village name header
9. **A5:A9** - Village 1 serial number
10. **B5:C7** - Village 1 name
11. **B8:C9** - Village 1 validation questions
12. **A10:A14** - Village 2 serial number
13. **B10:C12** - Village 2 name
14. **B13:C14** - Village 2 validation questions (partial)
15. **A15:A19** - Village 3 serial number
16. **B15:C17** - Village 3 name
17. **B18:C19** - Village 3 validation questions (partial)
18. **A20:A24** - Village 4 serial number
19. **B20:C22** - Village 4 name
20. **B23:C24** - Village 4 validation questions (partial)
21. **A25:A29** - Village 5 serial number
22. **B25:C27** - Village 5 name
23. **B28:C29** - Village 5 validation questions (partial)
24. **A30:A34** - Village 6 serial number
25. **B30:C32** - Village 6 name
26. **B33:C34** - Village 6 validation questions (partial)
27. **A35:A39** - Village 7 serial number
28. **B35:C37** - Village 7 name
29. **B38:C39** - Village 7 validation questions (partial)
30. **C41:E41**, **J41:L41**, **M41:P41** - Footer sections
31. **C42:D42** - Footer

### 2.8 Data Validations

**Validation Rule 1:**
- **Type:** List (dropdown)
- **Formula:** "Y,N"
- **Applied to cells:**
  - C8:C9 (Village 1)
  - C13:C14 (Village 2)
  - C18:C19 (Village 3)
  - C23:C24 (Village 4)
  - C28:C29 (Village 5)
  - C33:C34 (Village 6)
  - C38:C39 (Village 7)
- **Allow Blank:** True
- **Show Dropdown:** False
- **Purpose:** Y/N answers for compliance questions

### 2.9 Conditional Formatting Rules (7 ranges)

**Rule Set 1: Error Value Highlighting (±10cm threshold)**
- **Range:** E11:J11, E16:J16
- **Type:** cellIs
- **Conditions:**
  - Green (#92D050) if value between -10 and 10
  - Red (#FF0000) if value > 10 or < -10

**Rule Set 2: Data Entry Highlighting**
- **Range:** E5:P5, E10:P10, E15:J15, E20:P20, E25:P25, L30:P30, L35:P35
- **Type:** notContainsBlanks
- **Formula:** `LEN(TRIM(E5))>0`
- **Fill Color:** Light green (#EAF1DD)
- **Purpose:** Highlight cells with data

**Rule Set 3: Blank Cell Warning**
- **Range:** E6:P6, E21:P21, E26:P26, E31:P31, E36:P36
- **Type:** containsBlanks
- **Formula:** `LEN(TRIM(E6))=0`
- **Fill Color:** Light orange (#FBD4B4)
- **Purpose:** Warn about missing data
- **Plus:** Additional cellIs rules for ±10cm threshold (green/red)

**Rule Set 4: Observation Data Highlighting**
- **Range:** E7:P8, E12:P13, E17:P18, E22:P23, J27:P28, L32:P33, L37:P38
- **Type:** notContainsBlanks
- **Formula:** `LEN(TRIM(E7))>0`
- **Fill Color:** Light blue (#92CDDC)
- **Purpose:** Highlight actual and observed values

**Rule Set 5: Error Calculation Highlighting (±20cm threshold)**
- **Range:** E9:P9, E14:P14, E19:P19, E24:P24, E29:P29, E34:P34, E39:P39
- **Type:** cellIs
- **Conditions:**
  - Green (#92D050) if value between -20 and 20
  - Red (#FF0000) if value > 20 or < -20
- **Purpose:** Highlight calculated height errors

**Rule Set 6: Blank Check Point Warning**
- **Range:** E11:P11, E16:P16
- **Type:** containsBlanks
- **Formula:** `LEN(TRIM(E11))=0`
- **Fill Color:** Light orange (#FBD4B4)

**Rule Set 7: Extended Blank Check Warning**
- **Range:** K11:P11, K16:P16
- **Type:** containsBlanks
- **Formula:** `LEN(TRIM(K11))=0`
- **Fill Color:** Light orange (#FBD4B4)
- **Plus:** Multiple cellIs rules for ±10cm threshold

### 2.10 Formulas

**Metadata Formulas (Rows 2-4):**
- C2: `=ENTRY!E5` (Commenced date)
- H2: `=ENTRY!J6` (Hard disk number)
- D3: `=ENTRY!F7` (Agency name)
- D4: `=ENTRY!E6` (Taluk/District)

**Village Name Formulas (Pattern):**
- B5: `=CONCATENATE(ENTRY!D11,-ENTRY!E11)` (Village 1)
- B10: `=CONCATENATE(ENTRY!D12,-ENTRY!E12)` (Village 2)
- B15: `=CONCATENATE(ENTRY!D13,-ENTRY!E13)` (Village 3)
- B20: `=CONCATENATE(ENTRY!D14,-ENTRY!E14)` (Village 4)
- ... and so on for each village

**Error Calculation Formulas (Row 9, 14, 19, 24, 29, 34, 39):**
- E9: `=(E7-E8)*100` (Height error for checkpoint 1)
- F9: `=(F7-F8)*100` (Height error for checkpoint 2)
- ... through P9: `=(P7-P8)*100` (Height error for checkpoint 12)
- Pattern repeats for each village

**Formula Purpose:**
- Height Error = (Actual height - Observed height) × 100
- Result is in centimeters

### 2.11 Cell Background Colors Summary

| Color Code | Hex Color | Purpose | Locations |
|------------|-----------|---------|-----------|
| FFC6D9F0 | #C6D9F0 | Light Blue - Main Header | A1 (merged A1:P1) |
| FFFFFFCC | #FFFFCC | Yellow - Labels | A2, A3, E2, D3, A4, B4, D5, D7, B8, D8, B9, D10, etc. |
| FFFFCC99 | #FFCC99 | Light Orange - Dynamic Values | C2, H2 |
| FFEAF1DD | #EAF1DD | Light Green - Data Present (CF) | Cells with data |
| FFFBD4B4 | #FBD4B4 | Light Orange - Missing Data (CF) | Empty required cells |
| FF92CDDC | #92CDDC | Light Blue - Observation Data (CF) | Height data cells |
| FF92D050 | #92D050 | Green - Good Values (CF) | Errors within threshold |
| FFFF0000 | #FF0000 | Red - Bad Values (CF) | Errors exceeding threshold |

**CF = Applied via Conditional Formatting**

### 2.12 Font Formatting Patterns

**Header (Row 1):**
- Font: Arial, 14pt, Bold
- Color: Default (black)

**Labels (Rows 2-4, Column D):**
- Font: Calibri, 11pt, Bold (most labels)
- Color: Default (black)

**Data Cells:**
- Font: Calibri, 11pt, Regular
- Color: Default (black)

### 2.13 Alignment Patterns

| Cell Type | Horizontal Alignment | Vertical Alignment | Wrap Text |
|-----------|---------------------|-------------------|-----------|
| Main Header (A1) | Center | Center | Yes |
| Labels (A2, A3, E2) | Right | Bottom | No |
| Dynamic values (C2, H2) | Center | Bottom | No |
| Column headers (Row 4) | Center | Bottom | No |
| Serial numbers (A5, A10, etc.) | Center | Bottom | No |
| Village names | Center | Center | Yes |
| Field labels (Column D) | General/Left | Bottom | No |
| Data values | General/Right | Bottom | No |

### 2.14 Border Styles

**Main Header (Row 1):**
- All sides: Medium border

**Other cells:**
- Generally no borders, or thin borders applied through table formatting
- Check specific cells for custom borders

### 2.15 Number Formats

Most cells use "General" format. Specific formats:
- Height values: Displayed with decimal precision as entered
- Error calculations: Numeric, displaying calculated decimal values
- Dates: Linked from ENTRY sheet (format preserved from source)

---

## 3. ENTRY SHEET - DATA SOURCE ANALYSIS

### 3.1 Basic Information
- **Dimensions:** 37 rows × 45 columns (A to AS)
- **Actual Used:** 36 rows × 41 columns (A to AO)

### 3.2 Key Data Locations Referenced by ANEX-IV

| ENTRY Cell | Content | Used in ANEX-IV |
|------------|---------|-----------------|
| E5 | Commenced On (date) | C2 (Data received date) |
| E6 | District/Taluk | D4 |
| F7 | Agency Name | D3 |
| J6 | Hard Disk No | H2 |
| D11-D17 | Village Names (7 villages) | B5, B10, B15, B20, B25, B30, B35 |
| E11-E17 | LGD Codes (7 villages) | B5, B10, B15, B20, B25, B30, B35 |

### 3.3 ENTRY Sheet Structure

**Metadata Section (Rows 1-7):**
- E1: "Examiner Name" field
- E2: Examiner name value (dropdown validation)
- E3: Designation (dropdown validation)
- E5: Commenced On (date)
- E6: Finished On (date)
- H5: District (dropdown validation)
- H6: Taluk (dropdown validation)
- J2: Data Received (date)
- J3: No of Days (calculated)
- F7: Agency (dropdown validation)
- J6: Submission Type
- L3: Hard Disk No

**Table Header (Rows 9-10):**
- Complex merged headers for village data entry
- Background colors: Various (check specific cells)

**Data Rows (Rows 11-17):**
- 7 villages can be entered
- Multiple columns for various measurements

### 3.4 ENTRY Sheet Validations

**5 Data Validation Rules:**
1. E2: Examiner name list (from Sheet3!$F$20:$F$28)
2. E3: Designation list ("OFFICER SURVEYOR,SURVEYOR,D/MAN DIV I")
3. H6: Taluk list (from Sheet3!$O$20:$O$35)
4. F7: Agency list (from Sheet3!I20:I29)
5. H5: District list (from Sheet3!$L$20:$L$25)

### 3.5 ENTRY Sheet Conditional Formatting

**30 Conditional Formatting Rules** applied to ensure:
- Required fields are highlighted when empty (orange)
- Completed fields are highlighted (green)
- Data validation compliance

### 3.6 Column Widths (ENTRY Sheet)

Key columns:
- A: 7.14
- D: 37.14 (Village name)
- E: 16.29 (LGD code)
- F: 18.86
- N: 34.57
- O: 40.14
- AO: 42.00

---

## 4. CRITICAL EXPORT REQUIREMENTS

### 4.1 MUST PRESERVE When Exporting to ANEX-IV:

#### Header Section:
1. ✓ Merge A1:P1
2. ✓ Set background color to #C6D9F0 (light blue)
3. ✓ Set font to Arial, 14pt, Bold
4. ✓ Set alignment to center
5. ✓ Apply medium borders
6. ✓ Enable wrap text
7. ✓ Set header text value

#### Metadata Section (Rows 2-4):
1. ✓ Preserve all merged cells (A2:B2, C2:D2, E2:G2, H2:J2, A3:C3, D3:F3, B4:C4)
2. ✓ Apply yellow background (#FFFFCC) to label cells
3. ✓ Apply light orange (#FFCC99) to value cells
4. ✓ Set appropriate alignments (right for labels, center for values)
5. ✓ Copy formulas (not values) for dynamic cells

#### Village Data Blocks (5 rows each):
1. ✓ Merge cells according to pattern:
   - A column: 5 rows merged (A5:A9, A10:A14, etc.)
   - B-C columns: 3 rows for name (B5:C7, B10:C12, etc.)
   - B-C columns: 2 rows for validation text (B8:C9, B13:C14, etc.)
2. ✓ Apply yellow background to label cells (Column D)
3. ✓ Set row heights: 24.00 for rows 6-9 of each block
4. ✓ Copy formulas for:
   - Village name concatenation (B5, B10, B15, etc.)
   - Error calculations (E9:P9, E14:P14, etc.)
5. ✓ Center-align serial numbers and village names
6. ✓ Right-align numeric data

#### Data Validations:
1. ✓ Apply Y/N dropdown to cells C8:C9, C13:C14, C18:C19, C23:C24, C28:C29, C33:C34, C38:C39
2. ✓ Set allowBlank = True
3. ✓ Set showDropDown = False

#### Conditional Formatting:
1. ✓ Apply 7 conditional formatting rule sets as documented in section 2.9
2. ✓ Use exact color codes and formulas
3. ✓ Apply to correct ranges

#### Column Widths:
1. ✓ A: 9.29
2. ✓ B: 20.29
3. ✓ C: 3.29
4. ✓ D: 15.43
5. ✓ E: 8.00

#### Formulas:
1. ✓ Preserve ALL formulas, do not convert to values
2. ✓ Ensure correct cell references to ENTRY sheet
3. ✓ Error calculation formulas: `=(E7-E8)*100` pattern

### 4.2 Data Population Rules:

1. **From ENTRY sheet:**
   - Copy village data from rows 11-17
   - Each ENTRY row maps to a 5-row block in ANEX-IV
   - ENTRY row 11 → ANEX-IV rows 5-9
   - ENTRY row 12 → ANEX-IV rows 10-14
   - ENTRY row 13 → ANEX-IV rows 15-19
   - ENTRY row 14 → ANEX-IV rows 20-24
   - ENTRY row 15 → ANEX-IV rows 25-29
   - ENTRY row 16 → ANEX-IV rows 30-34
   - ENTRY row 17 → ANEX-IV rows 35-39

2. **Check point data:**
   - Column E = Check point 1
   - Column F = Check point 2
   - ... through Column P = Check point 12
   - Row 5/10/15/etc: Check point names/IDs
   - Row 6: H.Dist Error values
   - Row 7: Actual height values
   - Row 8: Observed height values
   - Row 9: Height Error (calculated via formula)

3. **Validation responses:**
   - Cell C8, C13, C18, C23, C28, C33, C38: "On Marker" Y/N answer
   - Cell C9, C14, C19, C24, C29, C34, C39: "Spatially Distributed" Y/N answer

### 4.3 Testing Checklist:

After export, verify:
- [ ] Header merged and formatted correctly
- [ ] All metadata formulas working
- [ ] All 26+ merged cell ranges present
- [ ] Yellow/orange backgrounds on labels
- [ ] Column widths match specification
- [ ] Row heights set to 24.00 where required
- [ ] Y/N dropdowns functional
- [ ] All 7 conditional formatting rules active
- [ ] Error calculation formulas present and calculating
- [ ] Village name concatenation formulas working
- [ ] No hardcoded values where formulas should be
- [ ] Border on header row
- [ ] Alignment correct on all cell types
- [ ] Data from ENTRY sheet correctly mapped to 5-row blocks

---

## 5. IMPLEMENTATION NOTES

### 5.1 Using openpyxl for Export:

```python
from openpyxl import load_workbook
from openpyxl.styles import PatternFill, Font, Alignment, Border, Side
from openpyxl.formatting.rule import CellIsRule, Rule
from openpyxl.styles.differential import DifferentialStyle

# Load template or create new workbook
wb = load_workbook('QAQC-FS8-Acceptance.xlsx')
annex4 = wb['ANEX-IV']

# Apply header formatting
header_fill = PatternFill(start_color='C6D9F0', end_color='C6D9F0', fill_type='solid')
header_font = Font(name='Arial', size=14, bold=True)
header_alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
header_border = Border(
    top=Side(style='medium'),
    bottom=Side(style='medium'),
    left=Side(style='medium'),
    right=Side(style='medium')
)

annex4['A1'].fill = header_fill
annex4['A1'].font = header_font
annex4['A1'].alignment = header_alignment
annex4['A1'].border = header_border

# Merge cells
annex4.merge_cells('A1:P1')

# Apply conditional formatting
from openpyxl.formatting.rule import CellIsRule
green_fill = PatternFill(start_color='92D050', end_color='92D050', fill_type='solid')
red_fill = PatternFill(start_color='FF0000', end_color='FF0000', fill_type='solid')

annex4.conditional_formatting.add('E9:P9',
    CellIsRule(operator='between', formula=['-20', '20'],
               stopIfTrue=True, fill=green_fill))
annex4.conditional_formatting.add('E9:P9',
    CellIsRule(operator='notBetween', formula=['-20', '20'],
               stopIfTrue=True, fill=red_fill))

# Set column widths
annex4.column_dimensions['A'].width = 9.29
annex4.column_dimensions['B'].width = 20.29
annex4.column_dimensions['C'].width = 3.29
annex4.column_dimensions['D'].width = 15.43
annex4.column_dimensions['E'].width = 8.00

# Set row heights
for row in [6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19]:
    annex4.row_dimensions[row].height = 24.00

# Save
wb.save('output.xlsx')
```

### 5.2 Key Python Libraries:
- **openpyxl** - Primary library for Excel manipulation
- **pandas** - Optional, for data manipulation before export
- **copy** - For copying formatting between cells

### 5.3 Common Pitfalls to Avoid:
1. ❌ Don't convert formulas to values
2. ❌ Don't ignore merged cells
3. ❌ Don't skip conditional formatting
4. ❌ Don't use default column widths
5. ❌ Don't forget row heights
6. ❌ Don't hardcode date values (use formulas)
7. ❌ Don't skip data validations
8. ❌ Don't forget border styles
9. ❌ Don't ignore wrap text settings
10. ❌ Don't skip alignment settings

---

## 6. SUMMARY

The ANEX-IV sheet has a highly structured format with:
- **1 header row** (merged, specially formatted)
- **3 metadata rows** (with formulas and merged cells)
- **7 village data blocks** (5 rows each = 35 rows)
- **3 footer rows** (with merged cells)
- **Total: 42 rows**

Each village block follows an identical pattern:
- Row 1: Serial number (merged 5 rows) + Village name (merged 3 rows) + Check point names
- Row 2: H.Dist Error values
- Row 3: Actual height values
- Row 4: Observed height values + Validation question 1
- Row 5: Height Error formulas + Validation question 2

The sheet relies heavily on:
- **Formulas** for dynamic data (26+ formulas)
- **Conditional formatting** for visual feedback (7 rule sets)
- **Data validation** for user input (1 rule, multiple cells)
- **Merged cells** for layout (26+ ranges)
- **Custom formatting** for colors, fonts, alignment

All formatting must be preserved to maintain functionality and appearance.

---

## Document Version
- **Created:** 2025-10-20
- **Analysis Method:** Python openpyxl library
- **Source File:** QAQC-FS8-Acceptance.xlsx
- **Target Sheet:** ANEX-IV
