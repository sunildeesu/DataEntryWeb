# Quick Start Guide

## Getting Started in 3 Steps

### 1. Open the Application
Simply double-click `index.html` or drag it into your web browser.

### 2. Fill in the Form
- **Top Section**: Enter examiner details, dates, and location
- **Table Section**: Click "Add Village Entry" and fill in the data
- Click "Save Data" when done

### 3. Export Your Data
Click "Export to Excel" to download your data as a JSON file.

---

## Main Features

### Buttons

- **+ Add Village Entry**: Adds a new row to the table
- **- Remove Last Entry**: Removes the last row
- **Save Data**: Saves to browser (automatic backup every 2 minutes)
- **Export to Excel**: Downloads data as JSON file
- **Load Saved Data**: Retrieves previously saved data
- **Reset Form**: Clears all data

### Required Fields (marked with *)
All fields in the top sections with a red asterisk must be filled before saving.

### Village Data Table
Scroll horizontally to see all columns. Each village entry includes:
- Basic info (Name, Code, Area)
- Flight details (Date, Height, Images)
- Quality metrics (RMSE, GSD, Pixel sizes)
- Quality status (Accepted/Rejected)
- File information

---

## Tips

1. Fill in examiner information first
2. Add one village entry at a time
3. Save frequently (or rely on auto-save)
4. Export data regularly as backup
5. Use Tab key to navigate between fields

---

## Data Saved Where?

- **Browser Storage**: Data saved in your browser's localStorage (survives page refresh)
- **JSON Export**: Downloaded to your computer's Downloads folder

---

## Need Help?

Check the full README.md for detailed documentation.

---

**Quick Reference - Field Validation Limits:**

| Field | Limit |
|-------|-------|
| ORI GSD | ≤ 5 cm |
| DEM GSD | ≤ 10 cm |
| Image RMSE (X,Y) | ≤ 4.085 cm |
| Image RMSE (Z) | ≤ 10.204 cm |
| GCP Error (X,Y) | ≤ 10 cm |
| GCP Error (Z) | ≤ 20 cm |
| Network Adj (X,Y) | ≤ 2.5 cm |
| Network Adj (Z) | ≤ 5 cm |
