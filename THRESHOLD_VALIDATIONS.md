# Threshold Validations - Real-time Quality Control

## Overview

The form implements real-time conditional formatting that highlights cells in **RED** when values exceed quality control thresholds, exactly matching the Excel file behavior.

## Implemented Validations

### 1. Image Processing RMSE (Columns S, T, U)

**Column S - Image Processing X:**
- **Threshold:** ≤ 4.085 cm
- **Validation:** Value > 4.085 → RED background
- **Reference:** (3.5.I or IV(a)) IN UAV REPORT

**Column T - Image Processing Y:**
- **Threshold:** ≤ 4.085 cm
- **Validation:** Value > 4.085 → RED background
- **Reference:** (3.5.I or IV(a)) IN UAV REPORT

**Column U - Image Processing Z:**
- **Threshold:** ≤ 10.204 cm
- **Validation:** Value > 10.204 → RED background
- **Reference:** (3.5.I or IV(a)) IN UAV REPORT

---

### 2. GCP & Check Points Error RMSE (Columns V, W, X)

**Column V - GCP Error X:**
- **Threshold:** ≤ 10 cm
- **Validation:** Value > 10 → RED background
- **Reference:** 3.5.IV(b) IN UAV REPORT

**Column W - GCP Error Y:**
- **Threshold:** ≤ 10 cm
- **Validation:** Value > 10 → RED background
- **Reference:** 3.5.IV(b) IN UAV REPORT

**Column X - GCP Error Z:**
- **Threshold:** ≤ 20 cm
- **Validation:** Value > 20 → RED background
- **Reference:** 3.5.IV(b) IN UAV REPORT

---

### 3. Network Adjustment Errors (Columns Z, AA, AB)

**Column Z - Network Adjustment X:**
- **Threshold:** ≤ 2.5 cm
- **Validation:** Value > 2.5 → RED background
- **Reference:** (3.5.II(1))

**Column AA - Network Adjustment Y:**
- **Threshold:** ≤ 2.5 cm
- **Validation:** Value > 2.5 → RED background
- **Reference:** (3.5.II(1))

**Column AB - Network Adjustment Z:**
- **Threshold:** ≤ 5 cm
- **Validation:** Value > 5 → RED background
- **Reference:** (3.5.II(1))

---

### 4. Pixel Size (Columns AG, AH)

**Column AG - ORI Pixel Size:**
- **Threshold:** ≤ 5 cm
- **Validation:** Value > 5 → RED background
- **Reference:** (3.2.e/3.3.4)
- **Excel Formatting:** ✅ Confirmed in Excel conditional formatting

**Column AH - DEM Pixel Size:**
- **Threshold:** ≤ 10 cm
- **Validation:** Value > 10 → RED background
- **Reference:** (3.2.e/3.3.5)
- **Excel Formatting:** ✅ Confirmed in Excel conditional formatting

---

### 5. Quality Fields (Columns AI, AJ)

**Column AI - ORI Quality:**
- **Value "A" (Accepted):** GREEN background (#92D050)
- **Value "R" (Rejected):** RED background (#FF0000)
- **Excel Formatting:** ✅ Confirmed in Excel conditional formatting

**Column AJ - Overall Quality:**
- **Value "A" (Accepted):** GREEN background (#92D050)
- **Value "R" (Rejected):** RED background (#FF0000)
- **Excel Formatting:** ✅ Confirmed in Excel conditional formatting

---

## Technical Implementation

### CSS Classes

```css
/* Red background for exceeded thresholds */
.threshold-exceeded {
    background-color: #ff0000 !important;
    color: white !important;
    border-color: #cc0000 !important;
}

/* Green background for accepted quality */
.quality-accepted {
    background-color: #92D050 !important;
    color: black !important;
    border-color: #7AB836 !important;
}

/* Red background for rejected quality */
.quality-rejected {
    background-color: #FF0000 !important;
    color: white !important;
    border-color: #CC0000 !important;
}
```

### JavaScript Functions

**1. `validateThresholds(input)` - script.js:245-297**
- Checks numeric input values against defined thresholds
- Applies `threshold-exceeded` class when value exceeds limit
- Removes class when value is within acceptable range

**2. `validateQuality(input)` - script.js:299-311**
- Checks quality field values (A/R)
- Applies appropriate class for color coding
- Case-insensitive validation

**3. Event Listeners - script.js:313-338**
- Real-time validation on `input` event
- Re-validation on `blur` event for better UX
- Event delegation for dynamically added rows

---

## Field Name Mappings (JavaScript)

| Excel Column | Field Name | Threshold | JavaScript Pattern |
|--------------|------------|-----------|-------------------|
| S | Image Proc X | 4.085 | `imgProcX_` |
| T | Image Proc Y | 4.085 | `imgProcY_` |
| U | Image Proc Z | 10.204 | `imgProcZ_` |
| V | GCP X | 10 | `gcpX_` |
| W | GCP Y | 10 | `gcpY_` |
| X | GCP Z | 20 | `gcpZ_` |
| Z | Net Adj X | 2.5 | `netAdjX_` |
| AA | Net Adj Y | 2.5 | `netAdjY_` |
| AB | Net Adj Z | 5 | `netAdjZ_` |
| AG | ORI Pixel | 5 | `oriPixel_` |
| AH | DEM Pixel | 10 | `demPixel_` |
| AI | ORI Quality | A/R | `oriQuality_` |
| AJ | Overall Quality | A/R | `overallQuality_` |

---

## User Experience

### Real-time Validation
- **As you type:** Values are checked immediately
- **Visual feedback:** Background turns red instantly when threshold is exceeded
- **White text:** Ensures readability on red background
- **Persistent:** Color remains until value is corrected

### Quality Indicators
- **Green (A):** Indicates acceptance - good quality
- **Red (R):** Indicates rejection - failed quality check
- **Automatic:** Updates as user types A or R

### Data Loading
- **Saved data:** Validations applied when loading from localStorage
- **Excel import:** (Future) Will validate imported data
- **Consistent:** All validation methods use same logic

---

## Validation Testing Checklist

To test all validations:

### Image Processing RMSE
- [ ] Enter 5.0 in Image Proc X → Should turn RED
- [ ] Enter 4.0 in Image Proc X → Should be normal
- [ ] Enter 5.0 in Image Proc Y → Should turn RED
- [ ] Enter 11.0 in Image Proc Z → Should turn RED
- [ ] Enter 10.0 in Image Proc Z → Should be normal

### GCP Error RMSE
- [ ] Enter 11 in GCP X → Should turn RED
- [ ] Enter 9 in GCP X → Should be normal
- [ ] Enter 21 in GCP Z → Should turn RED
- [ ] Enter 19 in GCP Z → Should be normal

### Network Adjustment
- [ ] Enter 3.0 in Net Adj X → Should turn RED
- [ ] Enter 2.0 in Net Adj X → Should be normal
- [ ] Enter 6 in Net Adj Z → Should turn RED
- [ ] Enter 4 in Net Adj Z → Should be normal

### Pixel Size
- [ ] Enter 6 in ORI Pixel → Should turn RED
- [ ] Enter 4 in ORI Pixel → Should be normal
- [ ] Enter 11 in DEM Pixel → Should turn RED
- [ ] Enter 9 in DEM Pixel → Should be normal

### Quality Fields
- [ ] Type "A" in ORI Quality → Should turn GREEN
- [ ] Type "R" in ORI Quality → Should turn RED
- [ ] Type "a" in Overall Quality → Should turn GREEN (case insensitive)
- [ ] Type "r" in Overall Quality → Should turn RED (case insensitive)

---

## Excel vs Webpage Comparison

| Feature | Excel ENTRY Sheet | Webpage Implementation | Status |
|---------|-------------------|------------------------|--------|
| ORI Pixel > 5 | RED | RED | ✅ Match |
| DEM Pixel > 10 | RED | RED | ✅ Match |
| ORI Quality = "A" | GREEN | GREEN | ✅ Match |
| ORI Quality = "R" | RED | RED | ✅ Match |
| Overall Quality = "A" | GREEN | GREEN | ✅ Match |
| Overall Quality = "R" | RED | RED | ✅ Match |
| RMSE thresholds | Not explicitly in Excel CF | Implemented based on headers | ✅ Enhanced |

**Note:** While Excel file only has explicit conditional formatting for Pixel Size and Quality fields, we've implemented all threshold validations based on the column header specifications, providing enhanced quality control.

---

## Benefits

1. **Immediate Feedback:** Users see violations instantly
2. **Quality Assurance:** Prevents submission of out-of-spec data
3. **Excel Consistency:** Matches Excel file behavior
4. **User-Friendly:** Clear visual indicators
5. **Comprehensive:** All thresholds from specifications implemented
6. **Persistent:** Validation survives save/load cycles

---

**Status:** ✅ Complete
**Date:** January 18, 2025
**Files Modified:**
- styles.css (lines 272-296)
- script.js (lines 245-338, 502-511)
