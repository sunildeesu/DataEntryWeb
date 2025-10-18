# Check Points (ANEX-IV) Implementation Plan

## Current Status

✅ **Completed:**
- Analyzed ANEX-IV sheet structure
- Identified required fields
- Created modal HTML structure
- Added modal CSS styling
- Initialized global state for check points

⏳ **In Progress:**
- Adding check point button to village rows
- Creating modal JavaScript functionality

❌ **Pending:**
- Complete modal functionality
- Update export to fill ANEX-IV sheet
- Testing

## ANEX-IV Sheet Structure

### Per Village Entry:
Each village has 5 rows in ANEX-IV:

**Row 1:** Village Header
- Column A: SL NO (1, 2, 3...)
- Column B: Village Name-LGD CODE (e.g., "Beluru-611918")
- Column C: "Check points Name"
- Columns D-O: Check point names (CP_1 through CP_12)

**Row 2:** H.Dist Error
- Column C: "H.Dist Error"
- Columns D-O: Horizontal distance error values

**Row 3:** Actual Height
- Column C: "Actual height"
- Columns D-O: Actual height values

**Row 4:** Observed Height + On Marker
- Column B: "1.On Marker(3.2.c) (Y/N)"
- Column C: Y or N
- Column D: "Observed height"
- Columns E-P: Observed height values

**Row 5:** Height Error + Spatially Distributed
- Column B: "2.Spatially Well Distributed(3.5.(II).3) (Y/N)"
- Column C: Y or N
- Column D: "Height Error"
- Columns E-P: Height error values

### Required Fields Per Village:
1. **On Marker (Y/N)** - One value per village
2. **Spatially Well Distributed (Y/N)** - One value per village
3. **Up to 12 Check Points**, each with:
   - Check Point Name (text)
   - H.Dist Error (number, cm)
   - Actual Height (number, meters)
   - Observed Height (number, meters)
   - Height Error (number, cm)

## Implementation Requirements

### 1. UI Components Needed

#### A. Check Points Button in Village Table
- Add a "Check Points" button/link in each village row
- Shows count of check points entered (e.g., "Check Points (3)")
- Opens modal when clicked

#### B. Check Points Modal
- ✅ Modal HTML structure created
- ✅ Modal CSS styling added
- ❌ JavaScript functionality needed:
  - Open/close modal
  - Load village-specific data
  - Add/remove check point rows
  - Save check points to global state
  - Validate check point data

### 2. Data Structure

```javascript
checkPointsData = {
  1: {  // Village row ID
    onMarker: 'Y',
    spatiallyDistributed: 'N',
    checkPoints: [
      {
        name: '611918_BELURU_CP_1',
        hDistError: 7.573,
        actualHeight: 675.5963745,
        observedHeight: 675.5968,
        heightError: -0.04255
      },
      // ... up to 12 check points
    ]
  },
  2: { // Village 2 data... },
  // ...
}
```

### 3. JavaScript Functions Needed

```javascript
// Modal Functions
function openCheckPointsModal(villageRowId) {
  // Load village name
  // Load existing check points if any
  // Show modal
}

function closeCheckPointsModal() {
  // Hide modal
  // Clear current village ref
}

// Check Point Management
function addCheckPointRow() {
  // Add new row to check points table
  // Max 12 rows
}

function removeCheckPointRow(cpIndex) {
  // Remove specific check point
}

function saveCheckPoints() {
  // Collect all check point data from modal
  // Validate data
  // Store in checkPointsData[villageRowId]
  // Update button text to show count
  // Close modal
}

// Export Enhancement
function updateANEXIVSheet(wb) {
  // Get ANEX-IV sheet
  // For each village with check points:
  //   - Calculate starting row
  //   - Write village header row
  //   - Write H.Dist Error row
  //   - Write Actual Height row
  //   - Write Observed Height + On Marker row
  //   - Write Height Error + Spatially Distributed row
}
```

### 4. Export Updates Required

In `processExcelExport()` function, add after ENTRY sheet update:

```javascript
// Update ANEX-IV sheet with check points
const anexIV = wb.Sheets['ANEX-IV'];
if (anexIV && Object.keys(checkPointsData).length > 0) {
    updateANEXIVSheet(wb);
}
```

## Step-by-Step Implementation

### Step 1: Add Check Points Button to Village Rows
In `addVillageRow()` function, add before the closing `</tr>`:

```javascript
<td>
    <button type="button" class="btn btn-primary btn-sm"
            onclick="openCheckPointsModal(${rowCounter})">
        <span id="cpBtnText_${rowCounter}">Check Points</span>
    </button>
</td>
```

### Step 2: Implement Modal Functions

```javascript
// At end of script.js

// Modal event listeners
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', closeCheckPointsModal);
});

document.getElementById('addCheckPoint').addEventListener('click', addCheckPointRow);
document.getElementById('saveCheckPoints').addEventListener('click', saveCheckPoints);

// Modal functions
function openCheckPointsModal(villageRowId) {
    currentVillageRow = villageRowId;

    // Get village name
    const villageName = document.querySelector(`[name="villageName_${villageRowId}"]`).value || 'Village ' + villageRowId;
    document.getElementById('modalVillageName').textContent = villageName;

    // Load existing data if any
    const data = checkPointsData[villageRowId] || {
        onMarker: '',
        spatiallyDistributed: '',
        checkPoints: []
    };

    document.getElementById('onMarker').value = data.onMarker;
    document.getElementById('spatiallyDistributed').value = data.spatiallyDistributed;

    // Clear and populate check points
    document.getElementById('checkPointsBody').innerHTML = '';
    data.checkPoints.forEach((cp, index) => {
        addCheckPointRow(cp, index + 1);
    });

    // Show modal
    document.getElementById('checkPointsModal').classList.add('show');
}

function closeCheckPointsModal() {
    document.getElementById('checkPointsModal').classList.remove('show');
    currentVillageRow = null;
}

let cpCounter = 0;
function addCheckPointRow(data = null, num = null) {
    const tbody = document.getElementById('checkPointsBody');
    const cpNum = num || tbody.children.length + 1;

    if (cpNum > 12) {
        showToast('Maximum 12 check points allowed', 'warning');
        return;
    }

    cpCounter++;
    const row = document.createElement('tr');
    row.setAttribute('data-cp-id', cpCounter);

    row.innerHTML = `
        <td>${cpNum}</td>
        <td><input type="text" value="${data?.name || ''}" class="cp-name" placeholder="CP_${cpNum}"></td>
        <td><input type="number" step="0.001" value="${data?.hDistError || ''}" class="cp-hdist" placeholder="cm"></td>
        <td><input type="number" step="0.0001" value="${data?.actualHeight || ''}" class="cp-actual" placeholder="m"></td>
        <td><input type="number" step="0.0001" value="${data?.observedHeight || ''}" class="cp-observed" placeholder="m"></td>
        <td><input type="number" step="0.001" value="${data?.heightError || ''}" class="cp-herror" placeholder="cm"></td>
        <td><button type="button" class="btn-remove-cp" onclick="removeCheckPointRow(${cpCounter})">Remove</button></td>
    `;

    tbody.appendChild(row);
}

function removeCheckPointRow(cpId) {
    const row = document.querySelector(`[data-cp-id="${cpId}"]`);
    if (row) {
        row.remove();
        // Renumber rows
        const rows = document.querySelectorAll('#checkPointsBody tr');
        rows.forEach((row, index) => {
            row.querySelector('td').textContent = index + 1;
        });
    }
}

function saveCheckPoints() {
    if (!currentVillageRow) return;

    const data = {
        onMarker: document.getElementById('onMarker').value,
        spatiallyDistributed: document.getElementById('spatiallyDistributed').value,
        checkPoints: []
    };

    // Collect check points
    const rows = document.querySelectorAll('#checkPointsBody tr');
    rows.forEach(row => {
        data.checkPoints.push({
            name: row.querySelector('.cp-name').value,
            hDistError: row.querySelector('.cp-hdist').value,
            actualHeight: row.querySelector('.cp-actual').value,
            observedHeight: row.querySelector('.cp-observed').value,
            heightError: row.querySelector('.cp-herror').value
        });
    });

    // Store data
    checkPointsData[currentVillageRow] = data;

    // Update button text
    const btnText = document.getElementById(`cpBtnText_${currentVillageRow}`);
    if (btnText) {
        btnText.textContent = `Check Points (${data.checkPoints.length})`;
    }

    showToast(`Saved ${data.checkPoints.length} check points`, 'success');
    closeCheckPointsModal();
}
```

### Step 3: Update ANEX-IV Sheet on Export

Add this function after `processExcelExport()`:

```javascript
function updateANEXIVSheet(wb) {
    const ws = wb.Sheets['ANEX-IV'];
    if (!ws) return;

    const cols = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P'];

    Object.keys(checkPointsData).forEach((villageId, index) => {
        const data = checkPointsData[villageId];
        const villageName = document.querySelector(`[name="villageName_${villageId}"]`)?.value || '';
        const lgdCode = document.querySelector(`[name="lgdCode_${villageId}"]`)?.value || '';

        // Calculate starting row (each village takes 5 rows, starting after header at row 4)
        const startRow = 5 + (index * 5);

        // Row 1: Village header + Check point names
        setCellValue(ws, `A${startRow}`, parseInt(villageId));
        setCellValue(ws, `B${startRow}`, `${villageName}-${lgdCode}`);
        setCellValue(ws, `C${startRow}`, 'Check points Name');

        data.checkPoints.forEach((cp, cpIndex) => {
            if (cpIndex < 12) {
                setCellValue(ws, `${cols[cpIndex + 3]}${startRow}`, cp.name);
            }
        });

        // Row 2: H.Dist Error
        setCellValue(ws, `C${startRow + 1}`, 'H.Dist Error');
        data.checkPoints.forEach((cp, cpIndex) => {
            if (cpIndex < 12) {
                setCellValue(ws, `${cols[cpIndex + 3]}${startRow + 1}`, cp.hDistError);
            }
        });

        // Row 3: Actual height
        setCellValue(ws, `C${startRow + 2}`, 'Actual height');
        data.checkPoints.forEach((cp, cpIndex) => {
            if (cpIndex < 12) {
                setCellValue(ws, `${cols[cpIndex + 4]}${startRow + 2}`, cp.actualHeight);
            }
        });

        // Row 4: On Marker + Observed height
        setCellValue(ws, `B${startRow + 3}`, '1.On Marker(3.2.c) (Y/N)');
        setCellValue(ws, `C${startRow + 3}`, data.onMarker);
        setCellValue(ws, `D${startRow + 3}`, 'Observed height');
        data.checkPoints.forEach((cp, cpIndex) => {
            if (cpIndex < 12) {
                setCellValue(ws, `${cols[cpIndex + 4]}${startRow + 3}`, cp.observedHeight);
            }
        });

        // Row 5: Spatially Distributed + Height Error
        setCellValue(ws, `B${startRow + 4}`, '\n2.Spatially Well Distributed(3.5.(II).3) (Y/N)');
        setCellValue(ws, `C${startRow + 4}`, data.spatiallyDistributed);
        setCellValue(ws, `D${startRow + 4}`, 'Height Error');
        data.checkPoints.forEach((cp, cpIndex) => {
            if (cpIndex < 12) {
                setCellValue(ws, `${cols[cpIndex + 4]}${startRow + 4}`, cp.heightError);
            }
        });

        // Fill remaining columns with 0
        for (let i = data.checkPoints.length; i < 12; i++) {
            setCellValue(ws, `${cols[i + 4]}${startRow + 4}`, 0);
        }
    });
}
```

Then call it in `processExcelExport()` before writing the file:

```javascript
// Update ANEX-IV sheet with check points
if (Object.keys(checkPointsData).length > 0) {
    updateANEXIVSheet(wb);
}
```

## Testing Checklist

- [ ] Open modal for village
- [ ] Add check point (max 12)
- [ ] Remove check point
- [ ] Save check points
- [ ] Button shows count
- [ ] Reopen modal shows saved data
- [ ] Export includes ANEX-IV data
- [ ] Excel file ANEX-IV sheet has correct format
- [ ] All 5 rows per village present
- [ ] Values in correct cells

## Estimated Effort

- Modal JavaScript: 2-3 hours
- Export ANEX-IV update: 1-2 hours
- Testing & debugging: 1-2 hours
- **Total: 4-7 hours**

## Alternative: Simplified Approach

If full implementation is too complex, consider:

1. **Option A:** Add check points as a separate CSV import
2. **Option B:** Use a simplified single-row input (comma-separated values)
3. **Option C:** Focus only on ENTRY sheet for now, add ANEX-IV later

## Files to Modify

1. ✅ `index.html` - Modal HTML added
2. ✅ `styles.css` - Modal CSS added
3. ⏳ `script.js` - Need to add:
   - Check points button in table
   - Modal functions
   - ANEX-IV export function

## Summary

The check points feature is **80% complete** in terms of UI/CSS. The remaining 20% is:
- JavaScript for modal interaction
- Export logic for ANEX-IV

Would you like me to:
1. **Complete the full implementation** (adds 200-300 lines of JS)
2. **Create a simplified version** (text inputs only)
3. **Skip for now** and document for future enhancement

Let me know your preference!

---

**Status**: Partially Implemented
**Priority**: Medium (ANEX-IV data is important but ENTRY sheet is primary)
**Complexity**: Medium-High
