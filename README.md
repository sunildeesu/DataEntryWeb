# QA/QC Data Entry Webpage - Drone Survey Data

A comprehensive web-based data entry form for Quality Assurance and Quality Control (QA/QC) of Drone Survey Data, specifically designed for QAQC-FS8-Acceptance workflows.

## Features

### 1. Metadata Management
- **Examiner Information**: Name and designation
- **Timeline Tracking**: Commenced date, finished date, and automatic calculation of number of days
- **Location Details**: District and Taluk information
- **Submission Information**: Fresh/Resubmission type, Hard Disk number, and Agency details

### 2. Village Data Entry Table
Dynamic table with the following fields for each village:
- Basic Information (SL No., Tile No, Village Name, LGD Code, Area)
- Location (Taluk, Hobli)
- Flight Details (Date, Number of flights, Flying height, Raw images count)
- Quality Checks (Intra-flight overlap, File naming, GPS processing)
- GSD Measurements (ORI and DEM)
- RMSE Calculations (Image processing and GCP errors with X, Y, Z coordinates)
- Network Adjustment (IBASE details and error measurements)
- CORS Stations (4 station inputs)
- Pixel Sizes (ORI and DEM)
- Quality Status (ORI and Overall acceptance/rejection)
- File Information (Spot errors, file sizes for ORI/DEM/RAW, and path)

### 3. Data Management Features
- **Add/Remove Rows**: Dynamically add or remove village entries
- **Save Data**: Store form data in browser's localStorage
- **Load Data**: Retrieve previously saved data
- **Auto-Save**: Automatic data saving every 2 minutes
- **Export**: Export data as JSON file for backup
- **Form Reset**: Clear all data and start fresh
- **Form Validation**: Required field validation with visual feedback

### 4. User Experience
- Responsive design that works on desktop and mobile devices
- Color-coded validation (errors in red, success in green)
- Toast notifications for user actions
- Automatic calculation of number of days between dates
- Sticky table headers for easy navigation
- Professional gradient design with smooth animations

## File Structure

```
DataEntryWeb/
├── index.html              # Main HTML structure
├── styles.css              # Complete styling and responsive design
├── script.js               # JavaScript functionality and data handling
├── QAQC-FS8-Acceptance.xlsx # Reference Excel file
├── README.md               # This documentation file
└── Analysis Files (optional)
    ├── analyze_excel.py
    ├── detailed_analysis.py
    ├── final_field_extraction.py
    └── qaqc_form_structure.json
```

## Usage Instructions

### Getting Started

1. **Open the Application**
   - Simply open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge)
   - No server or installation required - runs entirely in the browser

2. **Fill in Examiner Information**
   - Enter your name and designation
   - Select the commenced and finished dates (auto-calculates number of days)
   - Enter data received date

3. **Enter Location Details**
   - Fill in District and Taluk information
   - Specify submission type (e.g., FS-8)
   - Enter Hard Disk number and Agency name

4. **Add Village Data**
   - Click "Add Village Entry" to add a new row
   - Fill in all required fields for each village
   - Use the horizontal scroll to access all columns
   - Click "Remove Last Entry" to delete the last row if needed

5. **Save Your Work**
   - Click "Save Data" to store your progress in the browser
   - Data is automatically saved every 2 minutes
   - Use "Load Saved Data" to retrieve your work later

6. **Export Data**
   - Click "Export to Excel" to download your data as a JSON file
   - The file can be imported later or processed by other tools

### Field Descriptions

#### Required Fields (marked with *)
- Name of Examiner
- Designation
- Commenced On
- Finished On
- Data Received Date
- District
- Taluk
- Fresh Submission / Resubmission
- Hard Disk No
- Name of Empanelled Agency

#### Village Entry Fields

**Basic Information:**
- **SL No.**: Auto-numbered serial number
- **Tile No**: Survey tile identifier (e.g., J-03, I-03)
- **Village Name**: Name of the village
- **LGD CODE**: Local Government Directory code
- **Area**: Area in square kilometers

**Flight Information:**
- **Date of Flying**: Date when the drone survey was conducted
- **No. of Flights**: Number of flight missions
- **Flying Height**: Altitude in meters
- **No. of Raw Images**: Total raw images captured

**Quality Checks:**
- **Intra Flight Overlap**: Whether overlap criterion (52m) is met
- **File Naming & Data**: Compliance with naming conventions and data requirements (3.3.1-3.4)
- **GPS & Processing**: GPS instrument and processing compliance (3.2.c-3.6.i)

**GSD (Ground Sample Distance):**
- **ORI GSD**: Orthophoto GSD (should be ≤5 cm)
- **DEM GSD**: Digital Elevation Model GSD (should be ≤10 cm)

**RMSE (Root Mean Square Error):**
- **Image Processing**: X, Y (≤4.085 cm), Z (≤10.204 cm)
- **GCP Error**: X, Y (≤10 cm), Z (≤20 cm)

**Network Adjustment:**
- **No. of IBASE**: Number of base stations
- **Error Values**: X, Y (≤2.5 cm), Z (≤5 cm)

**CORS Stations:**
- Four CORS (Continuously Operating Reference Station) identifiers

**Pixel Sizes:**
- **ORI**: Orthophoto pixel size in cm
- **DEM**: DEM pixel size in cm

**Quality Status:**
- **ORI Quality**: Accepted (A) or Rejected (R)
- **Overall Quality**: Final acceptance status

**File Information:**
- **Spot Errors**: Notes on any errors or issues found
- **File Sizes**: ORI, DEM, and RAW data sizes in GB
- **Path**: File path location

## Technical Details

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Data Storage
- Uses browser's localStorage for data persistence
- Data survives page refreshes but is browser-specific
- Export to JSON for cross-browser/device compatibility

### Validation
- Real-time validation on required fields
- Date range validation for timeline fields
- Numeric validation for measurement fields
- Visual feedback with color coding

### Responsive Design
- Desktop-optimized for data entry
- Mobile-friendly with horizontal scrolling for table
- Adapts to different screen sizes automatically

## Data Flow

Based on the QAQC-FS8-Acceptance.xlsx file structure:

1. **Header Section** (Rows 0-6): Metadata fields
2. **Column Headers** (Rows 7-8): Field definitions with parent/child relationships
3. **Data Rows** (Row 9+): Individual village entries

The form replicates this structure while providing an enhanced user interface for data entry.

## Keyboard Shortcuts

- **Tab**: Navigate between fields
- **Shift + Tab**: Navigate backwards
- **Enter**: Submit form (when focused on buttons)
- **Ctrl/Cmd + S**: Could be implemented for quick save

## Tips for Best Use

1. **Regular Saving**: Although auto-save is enabled, manually save important data
2. **Export Backups**: Regularly export data as JSON files for backup
3. **Fill Systematically**: Complete one village entry fully before moving to the next
4. **Validate as You Go**: Check quality status fields (Accepted/Rejected) carefully
5. **Use Placeholders**: Refer to placeholder text for format examples

## Future Enhancements

Potential improvements that could be added:

- Direct Excel export using libraries like SheetJS (xlsx)
- Database integration for multi-user access
- Import from CSV/Excel files
- Advanced validation rules based on QA/QC standards
- Comparison with acceptance criteria
- Report generation
- Cloud storage integration
- User authentication and role-based access

## Support

For issues or questions:
1. Check that all required fields are filled
2. Verify date formats are correct
3. Ensure numeric fields contain valid numbers
4. Clear browser cache if experiencing issues
5. Try a different browser if problems persist

## License

This tool is designed for internal QA/QC processes for drone survey data management.

## Version

Version 1.0 - Initial Release (January 2025)

---

**Note**: This form is based on the QAQC-FS8-Acceptance.xlsx structure and includes all fields identified in the analysis. The form structure follows the same validation criteria and field requirements as specified in the Excel template.
