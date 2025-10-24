# Excel Export Feature Guide

## Overview

The QA/QC Data Entry Webpage now exports data to a **real Excel (.xlsx) file** that matches the exact format of the original **QAQC-FS8-Acceptance.xlsx** file.

## What's New

### Before (Old Export)
- Exported as JSON file (.json)
- Needed external tools to convert to Excel
- Not compatible with existing workflows

### Now (New Export)
- Exports as Excel file (.xlsx)
- **Exact same format** as QAQC-FS8-Acceptance.xlsx
- Ready to use immediately
- Compatible with existing systems

## How to Use

### Step 1: Fill in the Form
1. Complete all required fields (marked with *)
2. Add village entries using "+ Add Village Entry"
3. Fill in all village data

### Step 2: Export to Excel
1. Click the **"Export to Excel"** button
2. The system will validate all required fields
3. If validation passes, an Excel file will be downloaded

### Step 3: Check the Downloaded File
The file will be named:
```
QAQC-FS8-{SubmissionType}_{District}_{Date}.xlsx
```

Example:
```
QAQC-FS8-FS-8_TUMAKURU_2025-01-18.xlsx
```

## Excel File Structure

The exported Excel file contains an **ENTRY** sheet with:

### Header Section (Rows 0-6)
- **Row 0**: Name of Examiner, Commenced On, No of Days
- **Row 1**: Designation, Finished On
- **Row 2**: Empty
- **Row 3**: Data Received Date, District, Hard Disk No
- **Row 4**: Fresh Submission/Resubmission, Taluk
- **Row 5**: Name of Empanelled Agency
- **Row 6**: Empty

### Column Headers (Rows 7-9)
- **Row 7**: Parent headers (e.g., "FILE SIZE")
- **Row 8**: Main column headers (all field names)
- **Row 9**: Sub-headers (X, Y, Z, I, II, III, IV, GB, etc.)

### Data Rows (Row 10 onwards)
Each village entry as a complete row with all 41 columns:
- SL No, V (V1, V2, etc.)
- Village details (Tile, Name, LGD Code, Area, Taluk, Hobli)
- Flight data (Date, Flights, Height, Images)
- Quality checks (Overlap, File naming, GPS)
- GSD values (ORI, DEM)
- RMSE data (Image processing X/Y/Z, GCP X/Y/Z)
- Network adjustment (IBASE, Errors X/Y/Z)
- CORS stations (I, II, III, IV)
- Pixel sizes (ORI, DEM)
- Quality status (ORI Quality, Overall Quality)
- File info (Spot Errors, File Sizes, Path)

## Column Mapping

The export function maps web form fields to Excel columns exactly as in the original file:

| Excel Column | Field Name | Web Form Field |
|--------------|------------|----------------|
| 0 | SL No. | Auto-numbered |
| 1 | V | Auto-generated (V1, V2, etc.) |
| 2 | Tile No | Tile Number input |
| 3 | Village Name | Village Name input |
| 4 | LGD CODE | LGD Code input |
| 5 | AREA | Area input |
| 6 | TALUK | Taluk (village) input |
| 7 | HOBLI | Hobli input |
| 8 | Date of flying | Date of Flying input |
| 9 | No. of flights | Number of Flights input |
| 10 | Flying Height (m) | Flying Height + " m" |
| 11 | No. of Raw Images | Raw Images input |
| 12 | Intra Flight overlap | Overlap dropdown |
| 13 | File naming... | File Naming dropdown |
| 14 | GPS instrument... | GPS Processing dropdown |
| 15 | (empty) | - |
| 16 | ORI GSD | ORI GSD input |
| 17 | DEM GSD | DEM GSD input |
| 18-20 | Image RMSE X, Y, Z | Image Processing inputs |
| 21-23 | GCP Error X, Y, Z | GCP Error inputs |
| 24 | No Of IBASE | IBASE input |
| 25-27 | Net Adj Error X, Y, Z | Network Adjustment inputs |
| 28-31 | CORS I, II, III, IV | CORS Station inputs |
| 32 | ORI Pixel size | ORI Pixel input |
| 33 | DEM Pixel size | DEM Pixel input |
| 34 | ORI QUALITY | ORI Quality dropdown |
| 35 | OVERALL QUALITY | Overall Quality dropdown |
| 36 | SPOT ERRORS | Spot Errors textarea |
| 37-39 | File Size ORI/DEM/RAW | File Size inputs |
| 40 | PATH | Path input |

## Features

### 1. Automatic Formatting
- Column widths are set for readability
- Multi-line headers preserved with \n characters
- Empty cells handled correctly

### 2. Data Validation Before Export
- All required fields must be filled
- User is notified if validation fails
- No partial exports

### 3. Smart Filename
- Includes submission type (e.g., FS-8)
- Includes district name
- Includes current date
- Easy to identify and organize

### 4. Compatible Format
The exported file is **100% compatible** with:
- Microsoft Excel (Windows/Mac)
- Google Sheets
- LibreOffice Calc
- Any other Excel-compatible software

## Technology

### SheetJS (xlsx) Library
- Industry-standard JavaScript library for Excel
- Loaded from CDN: `https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js`
- Version: 0.20.1
- License: Apache 2.0

## Troubleshooting

### Export Button Not Working
1. Check that all required fields (marked with *) are filled
2. Ensure at least one village entry exists
3. Check browser console for errors (F12)
4. Refresh the page and try again

### Excel File Won't Open
1. Ensure you're using a compatible program (Excel, Sheets, etc.)
2. Check that the file downloaded completely
3. Try opening with a different program

### Missing Data in Excel
1. Verify all data was entered in the web form
2. Check that you clicked "Save Data" before export
3. Review the exported file column by column

### Filename Issues
- If filename contains invalid characters, it will be sanitized
- Spaces in district/submission type are preserved
- Special characters are allowed

## Advantages Over JSON Export

| Feature | JSON Export (Old) | Excel Export (New) |
|---------|-------------------|-------------------|
| File Format | .json | .xlsx |
| Direct Use | No | Yes |
| Excel Compatible | No | Yes |
| Same Format as Reference | No | Yes |
| Headers Included | No | Yes |
| Metadata Section | No | Yes |
| Column Structure | Different | Exact Match |
| Ready for QA/QC | No | Yes |

## Next Steps

After exporting:
1. Open the Excel file
2. Verify all data is correct
3. Share with team or upload to system
4. Archive original if needed

## Notes

- The export function creates a **new** Excel file
- Original QAQC-FS8-Acceptance.xlsx is never modified
- You can export multiple times with different filenames
- Each export is a complete, standalone file

## Support

If you encounter issues:
1. Check this guide first
2. Verify internet connection (for SheetJS CDN)
3. Try in a different browser
4. Check browser console for errors
5. Contact support with error messages

---

**Last Updated**: January 18, 2025
**Version**: 2.0 (with Excel Export)
