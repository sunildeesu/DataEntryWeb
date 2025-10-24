# QA/QC Data Entry - Drone Survey

A web-based application for entering and managing QA/QC data for drone surveys with Excel export functionality.

## Features

- ✅ **41-column village data table** matching Excel template structure
- ✅ **Real-time threshold validation** (15 different validations)
- ✅ **Quality field color coding** (Green for Accepted, Red for Rejected)
- ✅ **Perfect Excel export** - Copies reference file with all formatting, formulas, and sheets intact
- ✅ **Custom filename selection** for exports
- ✅ **Undo/Redo** for row operations
- ✅ **LocalStorage persistence** - Auto-saves every 2 minutes
- ✅ **Responsive design** with professional styling

## Quick Start

### Prerequisites

- Python 3.x
- openpyxl library

```bash
pip3 install openpyxl
```

### Running the Application

1. **Start the Python server:**
   ```bash
   python3 server.py 8001
   ```

2. **Open in browser:**
   ```
   http://localhost:8001/index.html
   ```

3. **Fill in the form and export:**
   - Enter examiner information
   - Add village data entries
   - Click "Export to Excel"
   - The exported file will have all 15 sheets with formulas and formatting preserved

## File Structure

```
DataEntryWeb/
├── index.html              # Web form interface
├── script.js               # Frontend JavaScript (validation, UI logic)
├── styles.css              # Application styling
├── server.py               # Python HTTP server (serves app + handles export)
├── export_excel.py         # Excel export logic using openpyxl
├── QAQC-FS8-Acceptance.xlsx  # Reference template file
├── README.md               # This file
├── README_PYTHON_SERVER.md # Detailed server documentation
├── QUICKSTART.md           # Quick start guide
├── LICENSE                 # MIT License
└── docs_archive/           # Archived documentation and analysis scripts
```

## How Export Works

1. **Browser** sends form data to Python server (JSON via HTTP POST)
2. **Python** copies the reference Excel file (`QAQC-FS8-Acceptance.xlsx`)
3. **Python** opens the copy with openpyxl (preserves all formatting)
4. **Python** fills ENTRY sheet with form data
5. **Python** saves the workbook (all 15 sheets, formulas, formatting intact)
6. **Browser** downloads the Excel file

### What Gets Preserved

✅ All 15 sheets (ENTRY, ANEX-I through ANEX-IV, etc.)
✅ All 1291+ formulas (ANEX-IV auto-calculates from ENTRY data)
✅ All formatting (colors, borders, merged cells, conditional formatting)
✅ All data validations (Y/N dropdowns)
✅ Column widths, row heights, hidden rows

## Threshold Validations

The application validates the following fields in real-time:

| Field | Threshold | Column |
|-------|-----------|--------|
| ORI GSD | ≤ 5 cm | Q |
| DEM GSD | ≤ 10 cm | R |
| Image Processing X, Y | ≤ 4.085 cm | S, T |
| Image Processing Z | ≤ 10.204 cm | U |
| GCP Error X, Y | ≤ 10 cm | V, W |
| GCP Error Z | ≤ 20 cm | X |
| Network Adjustment X, Y | ≤ 2.5 cm | Z, AA |
| Network Adjustment Z | ≤ 5 cm | AB |
| ORI Pixel | ≤ 5 cm | AG |
| DEM Pixel | ≤ 10 cm | AH |

Fields exceeding thresholds are highlighted in red.

## Browser Compatibility

- Chrome (Recommended)
- Firefox
- Safari
- Edge

## License

MIT License - See [LICENSE](LICENSE) file for details.

## Support

For detailed server documentation, see [README_PYTHON_SERVER.md](README_PYTHON_SERVER.md)

---

**Built with:**
- HTML5, CSS3, JavaScript (ES6)
- Python 3
- openpyxl library
