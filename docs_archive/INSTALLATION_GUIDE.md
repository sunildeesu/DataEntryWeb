# QA/QC Data Entry Web Application - Installation & Usage Guide

## Quick Start (3 Steps)

### Step 1: Download/Clone the Project
```bash
# If using Git
git clone <repository-url>
cd DataEntryWeb

# OR just extract the ZIP file to a folder
```

### Step 2: Start Local Web Server
```bash
# Navigate to the project folder
cd /path/to/DataEntryWeb

# Start Python web server (Python 3)
python3 -m http.server 8000

# OR if you have Python 2
python -m SimpleHTTPServer 8000
```

You should see:
```
Serving HTTP on :: port 8000 (http://[::]:8000/) ...
```

### Step 3: Open in Browser
Open your web browser and go to:
```
http://localhost:8000/index.html
```

**That's it! The application is now running.** 🎉

---

## Detailed Installation Guide

### System Requirements

**Minimum Requirements:**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for local web server)
- Internet connection (for loading SheetJS library from CDN)

**No Installation Needed:**
- ✅ No Node.js required
- ✅ No npm packages
- ✅ No build process
- ✅ No database setup
- ✅ Just HTML, CSS, and JavaScript

---

## Project Structure

```
DataEntryWeb/
├── index.html                          # Main application page
├── script.js                           # Application logic
├── styles.css                          # Styling and formatting
├── QAQC-FS8-Acceptance.xlsx           # Excel template (REQUIRED for full export)
│
├── README.md                           # Overview and features
├── INSTALLATION_GUIDE.md              # This file
├── QUICKSTART.md                      # Quick reference guide
├── EXPORT_TROUBLESHOOTING.md          # Export debugging help
├── THRESHOLD_VALIDATIONS.md           # Validation rules
├── COLUMN_HEADERS_MAPPING.md          # Excel column mapping
├── DROPDOWN_CORRECTIONS.md            # Dropdown specifications
└── EXCEL_FORMATTING_ANALYSIS.md       # Complete formatting review
```

---

## Step-by-Step Installation

### For Windows Users

**Option 1: Using Python (Recommended)**

1. **Check if Python is installed:**
   ```cmd
   python --version
   ```
   If not installed, download from: https://www.python.org/downloads/

2. **Navigate to project folder:**
   ```cmd
   cd C:\path\to\DataEntryWeb
   ```

3. **Start web server:**
   ```cmd
   python -m http.server 8000
   ```

4. **Open browser:**
   - Go to: `http://localhost:8000/index.html`

**Option 2: Using VS Code Live Server**

1. Install Visual Studio Code
2. Install "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"

---

### For macOS Users

**Option 1: Using Python (Pre-installed)**

1. **Open Terminal** (Cmd+Space, type "Terminal")

2. **Navigate to project folder:**
   ```bash
   cd /Users/YourName/Desktop/DataEntryWeb
   ```

3. **Start web server:**
   ```bash
   python3 -m http.server 8000
   ```

4. **Open browser:**
   - Go to: `http://localhost:8000/index.html`
   - Or run in Terminal:
     ```bash
     open http://localhost:8000/index.html
     ```

**Option 2: Using Built-in Apache (Advanced)**

macOS has Apache pre-installed:
1. Copy project to: `/Library/WebServer/Documents/`
2. Enable Apache: `sudo apachectl start`
3. Open: `http://localhost/DataEntryWeb/index.html`

---

### For Linux Users

**Using Python:**

1. **Open Terminal**

2. **Navigate to project:**
   ```bash
   cd ~/DataEntryWeb
   ```

3. **Start server:**
   ```bash
   python3 -m http.server 8000
   ```

4. **Open browser:**
   ```bash
   xdg-open http://localhost:8000/index.html
   # OR
   firefox http://localhost:8000/index.html
   ```

---

## Alternative Methods (Without Python)

### Method 1: Using Node.js (if you have it)

```bash
# Install http-server globally
npm install -g http-server

# Navigate to project folder
cd /path/to/DataEntryWeb

# Start server
http-server -p 8000

# Open: http://localhost:8000/index.html
```

### Method 2: Using PHP (if you have it)

```bash
cd /path/to/DataEntryWeb
php -S localhost:8000

# Open: http://localhost:8000/index.html
```

### Method 3: Using Browser Extensions

**Chrome/Edge:**
- Install "Web Server for Chrome" extension
- Point it to the project folder
- Click the provided URL

### Method 4: Online Hosting (For Production)

Upload files to any web hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web hosting provider

---

## Important Files

### Required Files (Must be present):

1. **index.html** - Main application
2. **script.js** - JavaScript functionality
3. **styles.css** - Styling
4. **QAQC-FS8-Acceptance.xlsx** - Excel template for full export

### Optional Files (Documentation):

- README.md - Feature overview
- QUICKSTART.md - Quick usage guide
- All other .md files - Technical documentation

---

## First Time Setup

### Step 1: Verify File Structure

Ensure all required files are in the same folder:
```
✅ index.html
✅ script.js
✅ styles.css
✅ QAQC-FS8-Acceptance.xlsx
```

### Step 2: Test Basic Functionality

1. Open the application
2. You should see a purple gradient header
3. Try adding a village entry (click "+ Add Village Entry")
4. Try filling some fields and check threshold validations

### Step 3: Test Export

1. Fill all required metadata fields (marked with red *)
2. Add at least one village entry
3. Click "Export to Excel"
4. Check browser console (F12) for any errors
5. File should download to your Downloads folder

---

## Usage Guide

### Basic Workflow

**1. Fill Metadata Section:**
- Name of Examiner (dropdown)
- Designation (dropdown)
- Dates (Commenced, Finished, Data Received)
- District & Taluk (dropdowns)
- Submission Type (e.g., "FS-8")
- Hard Disk Number
- Agency (dropdown)

**2. Add Village Entries:**
- Click "+ Add Village Entry" for each village
- Fill in village data (41 columns total)
- Threshold validations work in real-time:
  - Red background = Value exceeds threshold
  - Green (A) = Accepted
  - Red (R) = Rejected

**3. Save Your Work:**
- Click "Save Data" to save to browser localStorage
- Data persists even after closing browser
- Click "Load Saved Data" to restore

**4. Export to Excel:**
- Click "Export to Excel"
- Downloads file with all 15 sheets and formulas preserved
- Or creates basic Excel file if template unavailable

**5. Manage Entries:**
- "Remove Last Entry" - Delete last row
- "↺ Undo Remove" - Restore deleted row
- "Reset Form" - Clear all data (after confirmation)

---

## Keyboard Shortcuts & Tips

### Navigation:
- **Tab** - Move to next field
- **Shift+Tab** - Move to previous field
- **Enter** - In some fields, moves to next

### Data Entry Tips:
1. Fill metadata first (required for export)
2. Use Tab key for faster data entry
3. Watch for red backgrounds (threshold exceeded)
4. Quality fields: Type "A" or "R" for instant color coding
5. GSD fields: Can enter "2.5 cm/pix" or just "2.5"

---

## Troubleshooting

### Issue 1: Page Won't Load

**Symptoms:**
- Blank page
- "This site can't be reached"

**Solutions:**
1. Check web server is running (see terminal/cmd output)
2. Verify URL: `http://localhost:8000/index.html`
3. Try different port: `python3 -m http.server 8080`
4. Check firewall settings

---

### Issue 2: Styling Looks Broken

**Symptoms:**
- No colors
- Plain text
- No layout

**Solutions:**
1. Check `styles.css` exists in same folder
2. Check browser console for 404 errors
3. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

### Issue 3: Export Not Working

**Symptoms:**
- "Template not found" error
- No file downloads

**Solutions:**
1. Check `QAQC-FS8-Acceptance.xlsx` is in same folder
2. Use web server (don't open file:// directly)
3. Check browser console for errors
4. See `EXPORT_TROUBLESHOOTING.md` for detailed help
5. Fallback export will create basic file automatically

---

### Issue 4: SheetJS Library Not Loading

**Symptoms:**
- "Excel library not loaded" message
- Export button doesn't work

**Solutions:**
1. Check internet connection (CDN needs to download)
2. Refresh page (Ctrl+R or Cmd+R)
3. Check browser console for network errors
4. Try different browser

---

### Issue 5: Data Not Saving

**Symptoms:**
- "Save Data" doesn't work
- Data lost after refresh

**Solutions:**
1. Check browser supports localStorage (all modern browsers do)
2. Check private/incognito mode (might block localStorage)
3. Check browser storage settings
4. Use "Export to Excel" as backup

---

## Browser Compatibility

### Fully Supported:
- ✅ Chrome 90+ (Recommended)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Features by Browser:

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Form validation | ✅ | ✅ | ✅ | ✅ |
| Threshold coloring | ✅ | ✅ | ✅ | ✅ |
| Excel export | ✅ | ✅ | ✅ | ✅ |
| LocalStorage | ✅ | ✅ | ✅ | ✅ |
| Undo/Redo | ✅ | ✅ | ✅ | ✅ |

---

## Performance Tips

### For Better Performance:

1. **Clear old data** periodically (Reset Form)
2. **Export regularly** to avoid losing work
3. **Limit village entries** to 50-100 per session
4. **Close browser console** when not debugging
5. **Use modern browser** (latest version)

---

## Security & Privacy

### Data Storage:
- ✅ All data stored **locally** in browser
- ✅ No server uploads
- ✅ No cloud storage
- ✅ No external tracking
- ✅ Works offline (except Excel CDN library)

### Important:
- Data is stored in browser's localStorage
- Clearing browser data will delete saved forms
- Export to Excel to backup your data
- Don't use on public/shared computers without exporting

---

## Updating the Application

### To Update:

1. **Backup your data** (Export to Excel)
2. **Replace files** with new versions
3. **Keep** QAQC-FS8-Acceptance.xlsx (reference template)
4. **Clear browser cache** (Ctrl+Shift+Delete)
5. **Reload page** (Ctrl+Shift+R)
6. **Test** basic functionality

---

## Getting Help

### Resources:

1. **README.md** - Feature overview
2. **QUICKSTART.md** - Quick reference
3. **EXPORT_TROUBLESHOOTING.md** - Export issues
4. **THRESHOLD_VALIDATIONS.md** - Validation rules
5. **Browser Console** - F12 for error messages

### Reporting Issues:

Include:
- Browser and version
- Operating System
- Steps to reproduce
- Console error messages (F12 → Console tab)
- Screenshots if relevant

---

## Advanced Configuration

### Changing Port Number:

```bash
# Use different port
python3 -m http.server 9000

# Then open: http://localhost:9000/index.html
```

### Running on Network:

```bash
# Allow access from other devices on network
python3 -m http.server 8000 --bind 0.0.0.0

# Then access from other devices:
# http://YOUR_IP_ADDRESS:8000/index.html
# (Find your IP: ipconfig on Windows, ifconfig on Mac/Linux)
```

### Production Deployment:

For production use:
1. Upload to web hosting
2. Configure HTTPS
3. Set up proper domain
4. Consider authentication if needed
5. Regular backups of Excel exports

---

## Quick Reference Card

### Starting Application:
```bash
cd /path/to/DataEntryWeb
python3 -m http.server 8000
# Open: http://localhost:8000/index.html
```

### Required Fields (10):
1. Examiner Name
2. Designation
3. Commenced On
4. Finished On
5. Data Received Date
6. District
7. Taluk
8. Submission Type
9. Hard Disk No
10. Agency

### Keyboard Shortcuts:
- Tab/Shift+Tab - Navigate fields
- F12 - Open browser console
- Ctrl+R - Reload page
- Ctrl+Shift+R - Hard reload

### Threshold Colors:
- 🔴 Red - Value exceeds limit
- 🟢 Green - Accepted (A)
- 🔴 Red - Rejected (R)

---

## Conclusion

The QA/QC Data Entry application is ready to use!

**Simple 3-Step Start:**
1. Extract files to a folder
2. Run: `python3 -m http.server 8000`
3. Open: `http://localhost:8000/index.html`

**For Help:**
- Check README.md for features
- Check EXPORT_TROUBLESHOOTING.md for export issues
- Open browser console (F12) for error messages

**Enjoy using the application!** 🎉

---

**Document Version:** 1.0
**Last Updated:** January 18, 2025
**Application Version:** Complete with all features
