# Export to Excel - Troubleshooting Guide

## Recent Updates

### Added Features:
1. **Enhanced Error Logging** - Console logs at every step
2. **Better Error Messages** - More detailed user feedback
3. **Fallback Export** - Basic Excel export if template fails
4. **Improved Error Handling** - Catches and reports all errors

---

## How to Test Export

### Step 1: Fill Required Fields

The export requires ALL these fields to be filled:

**Metadata Section:**
- ✅ Name of Examiner (dropdown)
- ✅ Designation (dropdown)
- ✅ Commenced On (date)
- ✅ Finished On (date)
- ✅ Data Received Date (date)
- ✅ District (dropdown)
- ✅ Taluk (dropdown)
- ✅ Fresh Submission / Resubmission (text, e.g., "FS-8")
- ✅ Hard Disk No (text, e.g., "AEREO-ADPO253")
- ✅ Name of Empanelled Agency (dropdown)

**Village Data:**
- ✅ At least one village row (added automatically)

### Step 2: Open Browser Console

**Chrome/Edge:**
- Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
- Click "Console" tab

**Safari:**
- Enable Developer Menu: Safari > Preferences > Advanced > Show Develop menu
- Press `Cmd+Option+C`

### Step 3: Click "Export to Excel"

Watch the console for messages. You should see:

```
Export to Excel started...
XLSX library loaded successfully
Form validation passed
Loading reference template...
Fetch response: 200
Template loaded, size: [number]
Processing Excel export...
Workbook loaded, sheets: [array of sheet names]
ENTRY sheet found
Writing file: QAQC-FS8-[details].xlsx
Total rows updated: [number]
File written successfully
```

---

## Common Issues and Solutions

### Issue 1: "Excel library not loaded"

**Symptoms:**
- Toast message: "Excel library not loaded. Please refresh the page."
- Console: "XLSX library not found"

**Solution:**
- Check if SheetJS script is loaded in index.html
- Look for: `<script src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>`
- Refresh the page (Cmd+R or Ctrl+R)
- Check internet connection (CDN needs to download)

---

### Issue 2: "Please fill all required fields"

**Symptoms:**
- Toast message: "Please fill all required fields before exporting"
- Console: "Form validation failed"

**Solution:**
- Check all 10 required metadata fields listed above
- Empty fields will have a red border when validation fails
- Fill in the focused field that has the error

---

### Issue 3: Template File Not Found

**Symptoms:**
- Console: "HTTP error! status: 404"
- Toast: "Error loading reference template"
- Falls back to basic export

**Causes:**
- QAQC-FS8-Acceptance.xlsx not in same folder as index.html
- File opened with `file://` protocol (not http://)

**Solutions:**

**Option A: Use Local Web Server (Recommended)**
```bash
# In the project folder:
python3 -m http.server 8000

# Then open:
http://localhost:8000/index.html
```

**Option B: Use Fallback Export**
- The fallback automatically creates a basic Excel file
- No formatting or formulas, but data is preserved
- File named: `QAQC-Basic-[details].xlsx`

**Option C: Ensure File Location**
```
DataEntryWeb/
├── index.html
├── script.js
├── styles.css
└── QAQC-FS8-Acceptance.xlsx  ← Must be here!
```

---

### Issue 4: CORS Error

**Symptoms:**
- Console: "CORS policy: No 'Access-Control-Allow-Origin' header"
- Happens when opening file with `file://` protocol

**Solution:**
Use a local web server (see Option A above)

---

### Issue 5: Export Button Does Nothing

**Symptoms:**
- No console messages
- No toast messages
- Button click has no effect

**Solution:**
1. Check browser console for JavaScript errors
2. Look for any red error messages
3. Check if script.js is loaded properly
4. Refresh page and try again

---

## Debugging Steps

### Step 1: Check Console Logs

After clicking "Export to Excel", check which message appears LAST:

1. **"Export to Excel started..."**
   → Function started successfully

2. **"XLSX library loaded successfully"**
   → SheetJS library is working

3. **"Form validation failed"**
   → **STOP:** Fill missing required fields

4. **"Fetch response: 200"**
   → Template file found and loading

5. **"Template loaded, size: [number]"**
   → Template loaded successfully

6. **"Workbook loaded, sheets: [...]"**
   → Excel file parsed successfully

7. **"ENTRY sheet found"**
   → Correct sheet located

8. **"File written successfully"**
   → **SUCCESS!** File should download

### Step 2: Check for Errors

Look for red error messages in console:
- They will show exactly what went wrong
- Copy the full error message for troubleshooting

### Step 3: Try Fallback Export

If template export fails:
- Fallback export runs automatically
- Creates basic Excel file without formatting
- Check Downloads folder for `QAQC-Basic-*.xlsx`

---

## Expected Behavior

### Successful Export (Template-Based):

1. ✅ Toast: "Loading reference template..."
2. ✅ Toast: "Excel file exported successfully with all sheets!"
3. ✅ File downloads: `QAQC-FS8-[details].xlsx`
4. ✅ File contains 15 sheets with all formulas preserved

### Fallback Export (Basic):

1. ⚠️ Toast: "Error loading reference template"
2. ⚠️ Toast: "Template not available. Creating basic Excel file..."
3. ⚠️ Toast: "Basic Excel file created (no formatting)"
4. ✅ File downloads: `QAQC-Basic-[details].xlsx`
5. ⚠️ File contains 1 sheet "Data" with values only (no formulas)

---

## What to Report

If export still doesn't work, please provide:

1. **Browser and version** (e.g., Chrome 120, Safari 17)
2. **Operating System** (macOS, Windows, Linux)
3. **How you opened the file** (double-click, local server, etc.)
4. **Full console log** (copy all messages)
5. **Any error messages** (red text in console)
6. **Which toast messages appeared**

---

## Files Modified

### script.js (lines 542-842)
- Enhanced `exportToExcel()` with detailed logging
- Improved `processExcelExport()` with error handling
- Complete `exportBasicExcel()` fallback implementation

### Changes Made:
1. Console logging at every step
2. Better error messages with details
3. HTTP status check for template fetch
4. Full fallback export with all data fields
5. Error stack traces for debugging

---

## Quick Checklist

Before reporting an issue:

- [ ] All 10 required fields are filled
- [ ] At least one village row exists
- [ ] Browser console is open
- [ ] SheetJS library loaded (no "XLSX not found" error)
- [ ] QAQC-FS8-Acceptance.xlsx is in the same folder
- [ ] Tried refreshing the page
- [ ] Checked Downloads folder for exported file

---

**Status:** ✅ Enhanced with debugging features
**Date:** January 18, 2025
**Export Methods:** 2 (Template-based + Fallback)
