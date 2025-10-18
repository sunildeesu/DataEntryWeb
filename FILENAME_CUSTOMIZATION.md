# Filename Customization - Export Feature

## Overview

When exporting to Excel, you can now customize the filename before the file is created. The system provides a smart default name but allows you to change it to whatever you prefer.

---

## How It Works

### Step-by-Step Process:

**1. Click "Export to Excel" Button**

**2. Filename Prompt Appears**

You'll see a dialog box with:
- Title: "Enter filename for the Excel export:"
- Subtitle: "(without .xlsx extension)"
- Default filename pre-filled in the input box

**3. Choose Your Action:**

**Option A: Keep Default Name**
- Just click "OK" or press Enter
- File exports with the default name

**Option B: Customize Name**
- Edit the text in the input box
- Type your desired filename
- Click "OK" or press Enter

**Option C: Cancel Export**
- Click "Cancel" or press Escape
- Export is cancelled, nothing downloads
- You'll see: "Export cancelled" message

---

## Default Filename Format

The system automatically generates a filename based on your form data:

**Format:**
```
QAQC-FS8-{SubmissionType}_{District}_{Date}
```

**Examples:**
- `QAQC-FS8-FS-8_HASSAN_2025-01-18`
- `QAQC-FS8-RS-1_TUMAKURU_2025-01-18`
- `QAQC-FS8-FS-10_BELAGAVI_2025-01-18`

**Components:**
- `QAQC-FS8-` - Fixed prefix
- `FS-8` - From "Submission Type" field
- `HASSAN` - From "District" field
- `2025-01-18` - Current date (YYYY-MM-DD)

---

## Customization Options

### You Can:

✅ **Change the entire name:**
```
My_QA_Report_January_2025
```

✅ **Add project codes:**
```
QAQC-FS8-PROJECT_123_HASSAN_2025-01-18
```

✅ **Use descriptive names:**
```
Hassan_District_First_Submission_Jan18
```

✅ **Add version numbers:**
```
QAQC-FS8-HASSAN-v1.0
```

✅ **Use date formats you prefer:**
```
QAQC_18Jan2025_HASSAN
```

### You Don't Need To:

❌ Add `.xlsx` extension (added automatically)
❌ Worry about invalid characters (cleaned automatically)

---

## Automatic Filename Sanitization

The system automatically cleans your filename to ensure compatibility:

### Invalid Characters Removed:

These characters are replaced with underscore `_`:
- `<` `>` `:` `"` `/` `\` `|` `?` `*`

**Examples:**

| Your Input | Actual Filename |
|------------|-----------------|
| `Report:Jan/18` | `Report_Jan_18.xlsx` |
| `QAQC<>Data` | `QAQC__Data.xlsx` |
| `File?Name*` | `File_Name_.xlsx` |
| `Path\\Report` | `Path__Report.xlsx` |

**Why?** Windows and other operating systems don't allow these characters in filenames.

---

## Examples

### Example 1: Using Default Name

**Form Data:**
- Submission Type: `FS-8`
- District: `TUMAKURU`
- Date: `2025-01-18`

**Prompt Shows:**
```
Enter filename for the Excel export:
(without .xlsx extension)
┌────────────────────────────────────────┐
│ QAQC-FS8-FS-8_TUMAKURU_2025-01-18    │
└────────────────────────────────────────┘
           [OK]    [Cancel]
```

**Press OK → Downloads:** `QAQC-FS8-FS-8_TUMAKURU_2025-01-18.xlsx`

---

### Example 2: Custom Name

**Form Data:**
- Same as above

**Prompt Shows:**
```
Enter filename for the Excel export:
(without .xlsx extension)
┌────────────────────────────────────────┐
│ QAQC-FS8-FS-8_TUMAKURU_2025-01-18    │  ← Delete this
└────────────────────────────────────────┘
```

**You Type:**
```
┌────────────────────────────────────────┐
│ Tumakuru_District_Survey_Report        │
└────────────────────────────────────────┘
```

**Press OK → Downloads:** `Tumakuru_District_Survey_Report.xlsx`

---

### Example 3: Adding Project Code

**You Edit To:**
```
┌────────────────────────────────────────┐
│ PROJ-2025-001_QAQC-FS8-TUMAKURU       │
└────────────────────────────────────────┘
```

**Press OK → Downloads:** `PROJ-2025-001_QAQC-FS8-TUMAKURU.xlsx`

---

### Example 4: Cancelling Export

**Prompt Shows:**
```
Enter filename for the Excel export:
(without .xlsx extension)
┌────────────────────────────────────────┐
│ QAQC-FS8-FS-8_TUMAKURU_2025-01-18    │
└────────────────────────────────────────┘
           [OK]    [Cancel]  ← Click this
```

**Result:**
- No file downloads
- Toast message: "Export cancelled"
- You can try again later

---

## Best Practices

### Recommended Naming Conventions:

**1. Include Date:**
```
QAQC_2025-01-18_HASSAN
```
*Why:* Easy to sort and find files by date

**2. Include Location:**
```
HASSAN_District_QA_Report
```
*Why:* Quickly identify which area the data is for

**3. Use Underscores Instead of Spaces:**
```
QAQC_Hassan_January_2025  ✅
QAQC Hassan January 2025  ⚠️ (works, but less standard)
```
*Why:* Better compatibility across systems

**4. Keep It Short but Descriptive:**
```
QAQC-HASSAN-JAN25  ✅
QAQC_FS8_First_Submission_Hassan_District_January_2025_Version_1  ⚠️ (too long)
```
*Why:* Easier to read and manage

**5. Use Consistent Format:**
If your team uses a specific format, stick to it:
```
QAQC-{DISTRICT}-{DATE}-{TYPE}
↓
QAQC-HASSAN-2025-01-18-FS8
```

---

## Technical Details

### Implementation:

**Location:** script.js, lines 561-586

**Code Flow:**
```javascript
1. User clicks "Export to Excel"
2. Form validation passes
3. Generate default filename from form data
4. Show prompt with default filename
5. User enters custom name (or keeps default)
6. Sanitize filename (remove invalid chars)
7. Pass to export functions
8. Append .xlsx extension
9. Download file
```

**Sanitization Function:**
```javascript
const sanitizedFilename = customFilename
    .trim()                           // Remove leading/trailing spaces
    .replace(/[<>:"/\\|?*]/g, '_')    // Replace invalid chars with _
    || defaultFilename;               // Fallback to default if empty
```

---

## Keyboard Shortcuts

In the filename prompt:

- **Enter** - Accept filename and export
- **Escape** - Cancel export
- **Ctrl+A / Cmd+A** - Select all text (to replace entirely)
- **Tab** - Focus OK button
- **Shift+Tab** - Focus Cancel button

---

## Common Use Cases

### Use Case 1: Multiple Submissions Same Day

**Problem:** Exporting multiple villages on the same day creates duplicate names

**Solution:** Add sequence numbers
```
QAQC-FS8-HASSAN-2025-01-18-Village1
QAQC-FS8-HASSAN-2025-01-18-Village2
QAQC-FS8-HASSAN-2025-01-18-Village3
```

---

### Use Case 2: Resubmissions

**Problem:** Need to distinguish between original and resubmission

**Solution:** Add submission status
```
QAQC-FS8-HASSAN-2025-01-18        (Original)
QAQC-RS1-HASSAN-2025-01-20         (Resubmission 1)
QAQC-RS2-HASSAN-2025-01-22         (Resubmission 2)
```

---

### Use Case 3: Team Collaboration

**Problem:** Multiple people working on same district

**Solution:** Add examiner initials
```
QAQC-FS8-HASSAN-BR-2025-01-18     (B R Rajee)
QAQC-FS8-HASSAN-JP-2025-01-18     (Jiji Parekkattu)
```

---

### Use Case 4: Project Tracking

**Problem:** Need to link reports to project numbers

**Solution:** Include project code
```
PRJ2025-001_QAQC-FS8-HASSAN
PRJ2025-001_QAQC-FS8-TUMAKURU
PRJ2025-001_QAQC-FS8-BELAGAVI
```

---

## Troubleshooting

### Issue 1: Filename Too Long

**Symptoms:**
- Filename truncated
- Error saving file

**Solution:**
- Windows limit: 255 characters
- Keep filename under 100 characters for safety
- Use abbreviations if needed

---

### Issue 2: Special Characters Not Working

**Symptoms:**
- Characters removed from filename
- Underscores appear instead

**Solution:**
- This is intentional (invalid characters)
- Use allowed characters: letters, numbers, `-`, `_`
- Avoid: `< > : " / \ | ? *`

---

### Issue 3: Blank Filename

**Symptoms:**
- Left prompt empty
- Got default name anyway

**Solution:**
- System automatically uses default if blank
- This prevents creating files with no name
- Intentional safety feature

---

### Issue 4: Prompt Doesn't Appear

**Symptoms:**
- Export starts without asking for filename

**Possible Causes:**
- Browser blocked popup (check browser settings)
- JavaScript error (check console)

**Solution:**
- Check browser console (F12) for errors
- Allow popups from localhost
- Refresh page and try again

---

## Comparison: Before vs After

### Before (No Customization):

```
User clicks "Export to Excel"
↓
File immediately downloads as:
QAQC-FS8-FS-8_HASSAN_2025-01-18.xlsx
(No choice, fixed name)
```

### After (With Customization):

```
User clicks "Export to Excel"
↓
Prompt appears with default name
↓
User can:
  - Keep default (click OK)
  - Change name (edit and click OK)
  - Cancel (click Cancel)
↓
File downloads with chosen name
```

---

## Future Enhancements

Potential improvements for future versions:

- 🔜 Remember last used naming pattern
- 🔜 Filename templates/presets
- 🔜 Auto-increment for multiple exports
- 🔜 Export history with filenames
- 🔜 Custom filename validation rules

---

## Summary

### Key Features:

✅ **Smart Default** - Auto-generated from form data
✅ **Full Customization** - Change to any valid name
✅ **Automatic Cleaning** - Invalid characters removed
✅ **Cancel Option** - Can abort export
✅ **No Extension Needed** - .xlsx added automatically
✅ **Works for Both Exports** - Template and fallback

### Benefits:

1. **Better Organization** - Name files your way
2. **Team Consistency** - Follow naming standards
3. **Easy Identification** - Descriptive names
4. **Version Control** - Add version numbers
5. **Project Tracking** - Include project codes

---

**Feature Status:** ✅ Implemented and Working
**Date Added:** January 18, 2025
**Files Modified:** script.js (lines 561-586, 616, 741, 764, 856)

**Enjoy customizing your export filenames!** 📝
