# QA/QC Data Entry - Python Server Setup

## Why Python Server?

The Python server is **required** for proper Excel export because:

- ✅ **Preserves ALL formatting** - Colors, borders, merged cells, conditional formatting
- ✅ **Preserves ALL formulas** - ANEX-IV sheet auto-calculates from ENTRY data
- ✅ **Preserves ALL 15 sheets** - Complete workbook structure intact
- ✅ **Creates true copy** - Uses `shutil.copy2()` to copy reference file perfectly
- ✅ **Uses openpyxl** - Industry-standard library for Excel manipulation

The JavaScript-only approach (SheetJS) has limitations and cannot preserve complex Excel features.

## Prerequisites

Install Python 3 and required library:

```bash
# Check if Python 3 is installed
python3 --version

# Install openpyxl library
pip3 install openpyxl
```

## How to Run

### Step 1: Start the Python Server

Open Terminal in the project directory and run:

```bash
python3 server.py
```

You should see:

```
============================================================
🚀 QA/QC Data Entry Server Started
============================================================
📍 Server running at: http://localhost:8000
📄 Open: http://localhost:8000/index.html
🛑 Press Ctrl+C to stop the server
============================================================
```

### Step 2: Open the Application

Open your browser and go to:

```
http://localhost:8000/index.html
```

**IMPORTANT:** You must use `http://localhost:8000/index.html` (not just opening `index.html` directly) for the export to work!

### Step 3: Use the Application

1. Fill in the form data (examiner info, village data, etc.)
2. Click **"Export to Excel"**
3. The Python server will:
   - Copy `QAQC-FS8-Acceptance.xlsx`
   - Fill it with your data
   - Send it to your browser for download

### Step 4: Stop the Server

When done, press `Ctrl+C` in the Terminal to stop the server.

## What Happens During Export

```
┌─────────────────────────────────────────────────┐
│  1. Browser sends form data to Python server    │
│     (JSON format via HTTP POST)                 │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│  2. Python script copies reference file         │
│     shutil.copy2('QAQC-FS8-Acceptance.xlsx')    │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│  3. Python opens copied file with openpyxl      │
│     wb = load_workbook(copy, keep_vba=True)     │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│  4. Python fills ENTRY sheet with form data     │
│     ws['E1'] = examinerName                     │
│     ws.cell(row=11, col=1).value = village1     │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│  5. Python saves the workbook                   │
│     wb.save(output_file)                        │
│     (ALL 15 sheets, formulas, formatting saved) │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│  6. Python sends file to browser                │
│     Browser downloads the Excel file            │
└─────────────────────────────────────────────────┘
```

## File Structure

```
DataEntryWeb/
├── index.html                  # Web form interface
├── script.js                   # Frontend JavaScript
├── styles.css                  # Styling
├── server.py                   # Python HTTP server ⭐
├── export_excel.py             # Excel export logic ⭐
├── QAQC-FS8-Acceptance.xlsx    # Reference file (template)
└── README_PYTHON_SERVER.md     # This file
```

## Troubleshooting

### Error: "Make sure Python server is running!"

**Solution:** Start the Python server first before trying to export.

```bash
python3 server.py
```

### Error: "openpyxl not found"

**Solution:** Install the openpyxl library:

```bash
pip3 install openpyxl
```

### Error: "Reference file not found"

**Solution:** Make sure `QAQC-FS8-Acceptance.xlsx` exists in the project directory.

### Port 8000 already in use

**Solution:** Use a different port:

```bash
python3 server.py 8080
```

Then open: `http://localhost:8080/index.html`

### Browser security error (CORS)

**Solution:** Always access via `http://localhost:8000/index.html`, not by opening `index.html` directly from file system.

## Verify Export Success

After exporting, open the downloaded Excel file and verify:

1. ✅ All 15 sheets are present (ENTRY, Sheet3, ANEX-I through ANEX-IV, etc.)
2. ✅ ENTRY sheet has your filled data
3. ✅ ANEX-IV sheet shows calculated values (formulas working)
4. ✅ Colors, borders, merged cells all preserved
5. ✅ Conditional formatting working (red/green cells based on values)

## Command Line Usage (Advanced)

You can also export directly from command line:

```bash
# Create a data.json file with your form data
echo '{"metadata": {...}, "villageData": [...]}' > data.json

# Run export
python3 export_excel.py data.json "My-Custom-Filename"
```

## Benefits Summary

| Feature | JavaScript Only | Python Server |
|---------|----------------|---------------|
| Export works | ❌ Broken file | ✅ Perfect |
| All 15 sheets | ❌ Only 1 sheet | ✅ All 15 |
| Formulas | ❌ Lost | ✅ Preserved |
| Formatting | ❌ Lost | ✅ Preserved |
| Merged cells | ❌ Lost | ✅ Preserved |
| Conditional formatting | ❌ Lost | ✅ Preserved |
| File opens in Excel | ❌ Error | ✅ Opens perfectly |

---

**Start the server and enjoy perfect Excel exports! 🎉**
