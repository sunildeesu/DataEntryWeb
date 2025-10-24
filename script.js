// QA/QC Data Entry Form - JavaScript

// Global state
let villageEntries = [];
let rowCounter = 0;
let checkPointsData = {}; // Store check points for each village
let currentVillageRow = null; // Track which village is being edited
let deletedRows = []; // Track deleted rows for undo functionality

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    setupEventListeners();
    addInitialRow();
});

// Initialize form
function initializeForm() {
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('commencedOn').value = today;
    document.getElementById('finishedOn').value = today;
    calculateDays();
}

// Setup event listeners
function setupEventListeners() {
    // Date change listeners
    document.getElementById('commencedOn').addEventListener('change', calculateDays);
    document.getElementById('finishedOn').addEventListener('change', calculateDays);

    // Button listeners
    document.getElementById('addRow').addEventListener('click', addVillageRow);
    document.getElementById('removeRow').addEventListener('click', removeLastRow);
    document.getElementById('undoRemove').addEventListener('click', undoLastRemove);
    document.getElementById('saveData').addEventListener('click', saveFormData);
    document.getElementById('exportExcel').addEventListener('click', exportToExcel);
    document.getElementById('loadData').addEventListener('click', loadFormData);

    // Modal listeners
    document.getElementById('addCheckPoint').addEventListener('click', addCheckPoint);
    document.getElementById('saveCheckPoints').addEventListener('click', saveCheckPoints);

    // Close modal listeners
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeCheckPointsModal);
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('checkPointsModal');
        if (e.target === modal) {
            closeCheckPointsModal();
        }
    });

    // Form reset listener
    document.getElementById('qaqcForm').addEventListener('reset', function(e) {
        if (!confirm('Are you sure you want to reset the entire form? All data will be lost.')) {
            e.preventDefault();
        } else {
            setTimeout(() => {
                villageEntries = [];
                rowCounter = 0;
                deletedRows = [];
                checkPointsData = {}; // Clear check points data
                document.getElementById('villageTableBody').innerHTML = '';
                document.getElementById('undoRemove').disabled = true;
                addInitialRow();
                initializeForm();
            }, 100);
        }
    });
}

// Calculate number of days between dates
function calculateDays() {
    const commencedOn = document.getElementById('commencedOn').value;
    const finishedOn = document.getElementById('finishedOn').value;

    if (commencedOn && finishedOn) {
        const start = new Date(commencedOn);
        const end = new Date(finishedOn);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        document.getElementById('noOfDays').value = diffDays;
    }
}

// Add initial row
function addInitialRow() {
    addVillageRow();
}

// Add village data row
function addVillageRow() {
    rowCounter++;
    const tbody = document.getElementById('villageTableBody');
    const row = document.createElement('tr');
    row.setAttribute('data-row-id', rowCounter);

    row.innerHTML = `
        <td><input type="number" value="${rowCounter}" readonly class="row-number"></td>
        <td><input type="text" name="tileNo_${rowCounter}" placeholder="e.g., J-03"></td>
        <td><input type="text" name="villageName_${rowCounter}" placeholder="Village Name"></td>
        <td><input type="text" name="lgdCode_${rowCounter}" placeholder="LGD CODE"></td>
        <td><input type="number" step="0.000001" name="area_${rowCounter}" placeholder="Area"></td>
        <td><input type="text" name="talukVillage_${rowCounter}" placeholder="Taluk"></td>
        <td><input type="text" name="hobli_${rowCounter}" placeholder="Hobli"></td>
        <td><input type="date" name="dateOfFlying_${rowCounter}"></td>
        <td><input type="number" name="noOfFlights_${rowCounter}" placeholder="Flights"></td>
        <td><input type="number" name="flyingHeight_${rowCounter}" placeholder="Height (m)"></td>
        <td><input type="number" name="rawImages_${rowCounter}" placeholder="Images"></td>
        <td><input type="text" name="intraFlightOverlap_${rowCounter}" placeholder="No overlap / Yes"></td>
        <td><input type="text" name="fileNaming_${rowCounter}" placeholder="YES / NO"></td>
        <td><input type="text" name="gpsProcessing_${rowCounter}" placeholder="YES / NO"></td>
        <td><input type="text" name="oriGsd_${rowCounter}" placeholder="ORI GSD"></td>
        <td><input type="text" name="demGsd_${rowCounter}" placeholder="DEM GSD"></td>
        <td><input type="number" step="0.00001" name="imgProcX_${rowCounter}" placeholder="X"></td>
        <td><input type="number" step="0.00001" name="imgProcY_${rowCounter}" placeholder="Y"></td>
        <td><input type="number" step="0.00001" name="imgProcZ_${rowCounter}" placeholder="Z"></td>
        <td><input type="number" step="0.00001" name="gcpX_${rowCounter}" placeholder="X"></td>
        <td><input type="number" step="0.00001" name="gcpY_${rowCounter}" placeholder="Y"></td>
        <td><input type="number" step="0.00001" name="gcpZ_${rowCounter}" placeholder="Z"></td>
        <td><input type="text" name="noOfIbase_${rowCounter}" placeholder="IBASE"></td>
        <td><input type="number" step="0.0001" name="netAdjX_${rowCounter}" placeholder="X"></td>
        <td><input type="number" step="0.0001" name="netAdjY_${rowCounter}" placeholder="Y"></td>
        <td><input type="number" step="0.0001" name="netAdjZ_${rowCounter}" placeholder="Z"></td>
        <td><input type="text" name="cors1_${rowCounter}" placeholder="CORS I"></td>
        <td><input type="text" name="cors2_${rowCounter}" placeholder="CORS II"></td>
        <td><input type="text" name="cors3_${rowCounter}" placeholder="CORS III"></td>
        <td><input type="text" name="cors4_${rowCounter}" placeholder="CORS IV"></td>
        <td><input type="number" step="0.001" name="oriPixel_${rowCounter}" placeholder="ORI px"></td>
        <td><input type="number" step="0.001" name="demPixel_${rowCounter}" placeholder="DEM px"></td>
        <td><input type="text" name="oriQuality_${rowCounter}" placeholder="A / R" maxlength="1"></td>
        <td><input type="text" name="overallQuality_${rowCounter}" placeholder="A / R" maxlength="1"></td>
        <td><textarea name="spotErrors_${rowCounter}" placeholder="Spot errors..."></textarea></td>
        <td><input type="number" step="0.001" name="fileSizeOri_${rowCounter}" placeholder="ORI GB"></td>
        <td><input type="number" step="0.001" name="fileSizeDem_${rowCounter}" placeholder="DEM GB"></td>
        <td><input type="number" step="0.001" name="fileSizeRaw_${rowCounter}" placeholder="RAW GB"></td>
        <td><input type="text" name="path_${rowCounter}" placeholder="File path"></td>
        <td><button type="button" class="btn btn-info btn-sm" onclick="openCheckPointsModal(${rowCounter})">📍 Check Points</button></td>
    `;

    tbody.appendChild(row);
    showToast('New village entry added', 'success');
}

// Remove last row
function removeLastRow() {
    const tbody = document.getElementById('villageTableBody');
    if (tbody.children.length > 1) {
        const lastRow = tbody.lastChild;

        // Extract row data before deletion for undo functionality
        const rowData = extractRowData(lastRow);
        deletedRows.push(rowData);

        // Remove the row
        tbody.removeChild(lastRow);
        rowCounter--;

        // Enable undo button
        document.getElementById('undoRemove').disabled = false;

        showToast('Last entry removed. Click Undo to restore.', 'info');
    } else {
        showToast('Cannot remove the last row', 'warning');
    }
}

// Extract row data from a table row
function extractRowData(row) {
    const inputs = row.querySelectorAll('input, textarea, select');
    const rowData = {
        rowNumber: rowCounter,
        values: {}
    };

    inputs.forEach(input => {
        if (input.name) {
            rowData.values[input.name] = input.value;
        }
    });

    return rowData;
}

// Undo last removed row
function undoLastRemove() {
    if (deletedRows.length === 0) {
        return;
    }

    const rowData = deletedRows.pop();

    // Add a new row
    rowCounter++;
    const tbody = document.getElementById('villageTableBody');
    const row = document.createElement('tr');
    row.setAttribute('data-row-id', rowCounter);

    row.innerHTML = `
        <td><input type="number" value="${rowCounter}" readonly class="row-number"></td>
        <td><input type="text" name="tileNo_${rowCounter}" placeholder="e.g., J-03"></td>
        <td><input type="text" name="villageName_${rowCounter}" placeholder="Village Name"></td>
        <td><input type="text" name="lgdCode_${rowCounter}" placeholder="LGD CODE"></td>
        <td><input type="number" step="0.000001" name="area_${rowCounter}" placeholder="Area"></td>
        <td><input type="text" name="talukVillage_${rowCounter}" placeholder="Taluk"></td>
        <td><input type="text" name="hobli_${rowCounter}" placeholder="Hobli"></td>
        <td><input type="date" name="dateOfFlying_${rowCounter}"></td>
        <td><input type="number" name="noOfFlights_${rowCounter}" placeholder="Flights"></td>
        <td><input type="number" name="flyingHeight_${rowCounter}" placeholder="Height (m)"></td>
        <td><input type="number" name="rawImages_${rowCounter}" placeholder="Images"></td>
        <td><input type="text" name="intraFlightOverlap_${rowCounter}" placeholder="No overlap / Yes"></td>
        <td><input type="text" name="fileNaming_${rowCounter}" placeholder="YES / NO"></td>
        <td><input type="text" name="gpsProcessing_${rowCounter}" placeholder="YES / NO"></td>
        <td><input type="text" name="oriGsd_${rowCounter}" placeholder="ORI GSD"></td>
        <td><input type="text" name="demGsd_${rowCounter}" placeholder="DEM GSD"></td>
        <td><input type="number" step="0.00001" name="imgProcX_${rowCounter}" placeholder="X"></td>
        <td><input type="number" step="0.00001" name="imgProcY_${rowCounter}" placeholder="Y"></td>
        <td><input type="number" step="0.00001" name="imgProcZ_${rowCounter}" placeholder="Z"></td>
        <td><input type="number" step="0.00001" name="gcpX_${rowCounter}" placeholder="X"></td>
        <td><input type="number" step="0.00001" name="gcpY_${rowCounter}" placeholder="Y"></td>
        <td><input type="number" step="0.00001" name="gcpZ_${rowCounter}" placeholder="Z"></td>
        <td><input type="text" name="noOfIbase_${rowCounter}" placeholder="IBASE"></td>
        <td><input type="number" step="0.0001" name="netAdjX_${rowCounter}" placeholder="X"></td>
        <td><input type="number" step="0.0001" name="netAdjY_${rowCounter}" placeholder="Y"></td>
        <td><input type="number" step="0.0001" name="netAdjZ_${rowCounter}" placeholder="Z"></td>
        <td><input type="text" name="cors1_${rowCounter}" placeholder="CORS I"></td>
        <td><input type="text" name="cors2_${rowCounter}" placeholder="CORS II"></td>
        <td><input type="text" name="cors3_${rowCounter}" placeholder="CORS III"></td>
        <td><input type="text" name="cors4_${rowCounter}" placeholder="CORS IV"></td>
        <td><input type="number" step="0.001" name="oriPixel_${rowCounter}" placeholder="ORI px"></td>
        <td><input type="number" step="0.001" name="demPixel_${rowCounter}" placeholder="DEM px"></td>
        <td><input type="text" name="oriQuality_${rowCounter}" placeholder="A / R" maxlength="1"></td>
        <td><input type="text" name="overallQuality_${rowCounter}" placeholder="A / R" maxlength="1"></td>
        <td><textarea name="spotErrors_${rowCounter}" placeholder="Spot errors..."></textarea></td>
        <td><input type="number" step="0.001" name="fileSizeOri_${rowCounter}" placeholder="ORI GB"></td>
        <td><input type="number" step="0.001" name="fileSizeDem_${rowCounter}" placeholder="DEM GB"></td>
        <td><input type="number" step="0.001" name="fileSizeRaw_${rowCounter}" placeholder="RAW GB"></td>
        <td><input type="text" name="path_${rowCounter}" placeholder="File path"></td>
    `;

    tbody.appendChild(row);

    // Restore the data
    const inputs = row.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        const oldName = input.name.replace(`_${rowCounter}`, `_${rowData.rowNumber}`);
        if (rowData.values[oldName]) {
            input.value = rowData.values[oldName];
        }
    });

    // Disable undo button if no more deleted rows
    if (deletedRows.length === 0) {
        document.getElementById('undoRemove').disabled = true;
    }

    showToast('Row restored successfully', 'success');
}

// Threshold validation function
function validateThresholds(input) {
    const name = input.name;
    let value;

    // For GSD fields, extract numeric value from text like "2.67 cm/pix"
    if (name.includes('oriGsd_') || name.includes('demGsd_')) {
        const match = input.value.match(/[\d.]+/);
        value = match ? parseFloat(match[0]) : NaN;
    } else {
        value = parseFloat(input.value);
    }

    // Skip if empty or not a number
    if (!input.value || isNaN(value)) {
        input.classList.remove('threshold-exceeded');
        return;
    }

    let exceeded = false;

    // ORI GSD (column Q) - can be text or number field
    if (name.includes('oriGsd_')) {
        exceeded = value > 5;
    }
    // DEM GSD (column R) - can be text or number field
    else if (name.includes('demGsd_')) {
        exceeded = value > 10;
    }
    // Image Processing RMSE X & Y (columns S, T)
    else if (name.includes('imgProcX_') || name.includes('imgProcY_')) {
        exceeded = value > 4.085;
    }
    // Image Processing RMSE Z (column U)
    else if (name.includes('imgProcZ_')) {
        exceeded = value > 10.204;
    }
    // GCP Error RMSE X & Y (columns V, W)
    else if (name.includes('gcpX_') || name.includes('gcpY_')) {
        exceeded = value > 10;
    }
    // GCP Error RMSE Z (column X)
    else if (name.includes('gcpZ_')) {
        exceeded = value > 20;
    }
    // Network Adjustment X & Y (columns Z, AA)
    else if (name.includes('netAdjX_') || name.includes('netAdjY_')) {
        exceeded = value > 2.5;
    }
    // Network Adjustment Z (column AB)
    else if (name.includes('netAdjZ_')) {
        exceeded = value > 5;
    }
    // ORI Pixel size (column AG)
    else if (name.includes('oriPixel_')) {
        exceeded = value > 5;
    }
    // DEM Pixel size (column AH)
    else if (name.includes('demPixel_')) {
        exceeded = value > 10;
    }

    // Apply or remove threshold-exceeded class
    if (exceeded) {
        input.classList.add('threshold-exceeded');
    } else {
        input.classList.remove('threshold-exceeded');
    }
}

// Quality field validation (A/R coloring)
function validateQuality(input) {
    const value = input.value.trim().toUpperCase();

    // Remove all quality classes first
    input.classList.remove('quality-accepted', 'quality-rejected');

    if (value === 'A') {
        input.classList.add('quality-accepted');
    } else if (value === 'R') {
        input.classList.add('quality-rejected');
    }
}

// Add event delegation for threshold validation
document.addEventListener('DOMContentLoaded', function() {
    // Use event delegation on table body
    document.getElementById('villageTableBody').addEventListener('input', function(e) {
        if (e.target.tagName === 'INPUT') {
            // Validate threshold fields (numbers and GSD text fields)
            if (e.target.type === 'number' || e.target.name.includes('oriGsd_') || e.target.name.includes('demGsd_')) {
                validateThresholds(e.target);
            }

            // Quality field validation
            if (e.target.name && (e.target.name.includes('oriQuality_') || e.target.name.includes('overallQuality_'))) {
                validateQuality(e.target);
            }
        }
    });

    // Also validate on blur for better UX
    document.getElementById('villageTableBody').addEventListener('blur', function(e) {
        if (e.target.tagName === 'INPUT') {
            if (e.target.type === 'number' || e.target.name.includes('oriGsd_') || e.target.name.includes('demGsd_')) {
                validateThresholds(e.target);
            }
            if (e.target.name && (e.target.name.includes('oriQuality_') || e.target.name.includes('overallQuality_'))) {
                validateQuality(e.target);
            }
        }
    }, true);
});

// Save form data to localStorage
function saveFormData() {
    try {
        // Validate required fields
        if (!validateForm()) {
            showToast('Please fill all required fields', 'error');
            return;
        }

        const formData = {
            metadata: {
                examinerName: document.getElementById('examinerName').value,
                designation: document.getElementById('designation').value,
                commencedOn: document.getElementById('commencedOn').value,
                finishedOn: document.getElementById('finishedOn').value,
                noOfDays: document.getElementById('noOfDays').value,
                dataReceivedDate: document.getElementById('dataReceivedDate').value,
                district: document.getElementById('district').value,
                taluk: document.getElementById('taluk').value,
                submissionType: document.getElementById('submissionType').value,
                hardDiskNo: document.getElementById('hardDiskNo').value,
                agency: document.getElementById('agency').value
            },
            villageData: []
        };

        // Collect village data
        const tbody = document.getElementById('villageTableBody');
        const rows = tbody.querySelectorAll('tr');

        rows.forEach((row, index) => {
            const rowId = index + 1;
            const rowData = {
                slNo: rowId,
                tileNo: getInputValue(row, `tileNo_${rowId}`),
                villageName: getInputValue(row, `villageName_${rowId}`),
                lgdCode: getInputValue(row, `lgdCode_${rowId}`),
                area: getInputValue(row, `area_${rowId}`),
                talukVillage: getInputValue(row, `talukVillage_${rowId}`),
                hobli: getInputValue(row, `hobli_${rowId}`),
                dateOfFlying: getInputValue(row, `dateOfFlying_${rowId}`),
                noOfFlights: getInputValue(row, `noOfFlights_${rowId}`),
                flyingHeight: getInputValue(row, `flyingHeight_${rowId}`),
                rawImages: getInputValue(row, `rawImages_${rowId}`),
                intraFlightOverlap: getInputValue(row, `intraFlightOverlap_${rowId}`),
                fileNaming: getInputValue(row, `fileNaming_${rowId}`),
                gpsProcessing: getInputValue(row, `gpsProcessing_${rowId}`),
                oriGsd: getInputValue(row, `oriGsd_${rowId}`),
                demGsd: getInputValue(row, `demGsd_${rowId}`),
                imgProcX: getInputValue(row, `imgProcX_${rowId}`),
                imgProcY: getInputValue(row, `imgProcY_${rowId}`),
                imgProcZ: getInputValue(row, `imgProcZ_${rowId}`),
                gcpX: getInputValue(row, `gcpX_${rowId}`),
                gcpY: getInputValue(row, `gcpY_${rowId}`),
                gcpZ: getInputValue(row, `gcpZ_${rowId}`),
                noOfIbase: getInputValue(row, `noOfIbase_${rowId}`),
                netAdjX: getInputValue(row, `netAdjX_${rowId}`),
                netAdjY: getInputValue(row, `netAdjY_${rowId}`),
                netAdjZ: getInputValue(row, `netAdjZ_${rowId}`),
                cors1: getInputValue(row, `cors1_${rowId}`),
                cors2: getInputValue(row, `cors2_${rowId}`),
                cors3: getInputValue(row, `cors3_${rowId}`),
                cors4: getInputValue(row, `cors4_${rowId}`),
                oriPixel: getInputValue(row, `oriPixel_${rowId}`),
                demPixel: getInputValue(row, `demPixel_${rowId}`),
                oriQuality: getInputValue(row, `oriQuality_${rowId}`),
                overallQuality: getInputValue(row, `overallQuality_${rowId}`),
                spotErrors: getInputValue(row, `spotErrors_${rowId}`),
                fileSizeOri: getInputValue(row, `fileSizeOri_${rowId}`),
                fileSizeDem: getInputValue(row, `fileSizeDem_${rowId}`),
                fileSizeRaw: getInputValue(row, `fileSizeRaw_${rowId}`),
                path: getInputValue(row, `path_${rowId}`)
            };
            formData.villageData.push(rowData);
        });

        // Save to localStorage
        localStorage.setItem('qaqcFormData', JSON.stringify(formData));
        localStorage.setItem('qaqcFormSaveDate', new Date().toISOString());

        showToast('Data saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving data:', error);
        showToast('Error saving data: ' + error.message, 'error');
    }
}

// Load form data from localStorage
function loadFormData() {
    try {
        const savedData = localStorage.getItem('qaqcFormData');
        if (!savedData) {
            showToast('No saved data found', 'warning');
            return;
        }

        const formData = JSON.parse(savedData);
        const saveDate = localStorage.getItem('qaqcFormSaveDate');

        if (confirm(`Load data saved on ${new Date(saveDate).toLocaleString()}?`)) {
            // Load metadata
            document.getElementById('examinerName').value = formData.metadata.examinerName || '';
            document.getElementById('designation').value = formData.metadata.designation || '';
            document.getElementById('commencedOn').value = formData.metadata.commencedOn || '';
            document.getElementById('finishedOn').value = formData.metadata.finishedOn || '';
            document.getElementById('noOfDays').value = formData.metadata.noOfDays || '';
            document.getElementById('dataReceivedDate').value = formData.metadata.dataReceivedDate || '';
            document.getElementById('district').value = formData.metadata.district || '';
            document.getElementById('taluk').value = formData.metadata.taluk || '';
            document.getElementById('submissionType').value = formData.metadata.submissionType || '';
            document.getElementById('hardDiskNo').value = formData.metadata.hardDiskNo || '';
            document.getElementById('agency').value = formData.metadata.agency || '';

            // Clear existing rows
            document.getElementById('villageTableBody').innerHTML = '';
            rowCounter = 0;

            // Load village data
            formData.villageData.forEach((data, index) => {
                addVillageRow();
                const row = document.getElementById('villageTableBody').lastChild;
                const rowId = index + 1;

                setInputValue(row, `tileNo_${rowId}`, data.tileNo);
                setInputValue(row, `villageName_${rowId}`, data.villageName);
                setInputValue(row, `lgdCode_${rowId}`, data.lgdCode);
                setInputValue(row, `area_${rowId}`, data.area);
                setInputValue(row, `talukVillage_${rowId}`, data.talukVillage);
                setInputValue(row, `hobli_${rowId}`, data.hobli);
                setInputValue(row, `dateOfFlying_${rowId}`, data.dateOfFlying);
                setInputValue(row, `noOfFlights_${rowId}`, data.noOfFlights);
                setInputValue(row, `flyingHeight_${rowId}`, data.flyingHeight);
                setInputValue(row, `rawImages_${rowId}`, data.rawImages);
                setInputValue(row, `intraFlightOverlap_${rowId}`, data.intraFlightOverlap);
                setInputValue(row, `fileNaming_${rowId}`, data.fileNaming);
                setInputValue(row, `gpsProcessing_${rowId}`, data.gpsProcessing);
                setInputValue(row, `oriGsd_${rowId}`, data.oriGsd);
                setInputValue(row, `demGsd_${rowId}`, data.demGsd);
                setInputValue(row, `imgProcX_${rowId}`, data.imgProcX);
                setInputValue(row, `imgProcY_${rowId}`, data.imgProcY);
                setInputValue(row, `imgProcZ_${rowId}`, data.imgProcZ);
                setInputValue(row, `gcpX_${rowId}`, data.gcpX);
                setInputValue(row, `gcpY_${rowId}`, data.gcpY);
                setInputValue(row, `gcpZ_${rowId}`, data.gcpZ);
                setInputValue(row, `noOfIbase_${rowId}`, data.noOfIbase);
                setInputValue(row, `netAdjX_${rowId}`, data.netAdjX);
                setInputValue(row, `netAdjY_${rowId}`, data.netAdjY);
                setInputValue(row, `netAdjZ_${rowId}`, data.netAdjZ);
                setInputValue(row, `cors1_${rowId}`, data.cors1);
                setInputValue(row, `cors2_${rowId}`, data.cors2);
                setInputValue(row, `cors3_${rowId}`, data.cors3);
                setInputValue(row, `cors4_${rowId}`, data.cors4);
                setInputValue(row, `oriPixel_${rowId}`, data.oriPixel);
                setInputValue(row, `demPixel_${rowId}`, data.demPixel);
                setInputValue(row, `oriQuality_${rowId}`, data.oriQuality);
                setInputValue(row, `overallQuality_${rowId}`, data.overallQuality);
                setInputValue(row, `spotErrors_${rowId}`, data.spotErrors);
                setInputValue(row, `fileSizeOri_${rowId}`, data.fileSizeOri);
                setInputValue(row, `fileSizeDem_${rowId}`, data.fileSizeDem);
                setInputValue(row, `fileSizeRaw_${rowId}`, data.fileSizeRaw);
                setInputValue(row, `path_${rowId}`, data.path);

                // Validate thresholds for loaded data
                row.querySelectorAll('input[type="number"]').forEach(input => {
                    validateThresholds(input);
                });

                // Validate quality fields
                const oriQualityInput = row.querySelector(`input[name="oriQuality_${rowId}"]`);
                const overallQualityInput = row.querySelector(`input[name="overallQuality_${rowId}"]`);
                if (oriQualityInput) validateQuality(oriQualityInput);
                if (overallQualityInput) validateQuality(overallQualityInput);
            });

            showToast('Data loaded successfully!', 'success');
        }
    } catch (error) {
        console.error('Error loading data:', error);
        showToast('Error loading data: ' + error.message, 'error');
    }
}

// Export to Excel in QAQC-FS8-Acceptance format using Python backend
function exportToExcel() {
    try {
        console.log('Export to Excel started...');

        // Validate form first
        if (!validateForm()) {
            console.log('Form validation failed');
            showToast('Please fill all required fields before exporting', 'error');
            return;
        }

        console.log('Form validation passed');

        // Get metadata for default filename
        const submissionType = document.getElementById('submissionType').value;
        const district = document.getElementById('district').value;
        const dateStr = new Date().toISOString().split('T')[0];

        // Generate default filename
        const defaultFilename = `QAQC-FS8-${submissionType}_${district}_${dateStr}`;

        // Prompt user for filename
        const customFilename = prompt(
            'Enter filename for the Excel export:\n(without .xlsx extension)',
            defaultFilename
        );

        // User cancelled
        if (customFilename === null) {
            showToast('Export cancelled', 'info');
            return;
        }

        // Validate filename (remove invalid characters)
        const sanitizedFilename = customFilename.trim().replace(/[<>:"/\\|?*]/g, '_') || defaultFilename;

        console.log('Export filename:', sanitizedFilename);
        showToast('Preparing data for export...', 'info');

        // Prepare data for export
        const formData = {
            metadata: {
                examinerName: document.getElementById('examinerName').value,
                designation: document.getElementById('designation').value,
                commencedOn: document.getElementById('commencedOn').value,
                finishedOn: document.getElementById('finishedOn').value,
                noOfDays: document.getElementById('noOfDays').value,
                dataReceivedDate: document.getElementById('dataReceivedDate').value,
                district: document.getElementById('district').value,
                taluk: document.getElementById('taluk').value,
                submissionType: document.getElementById('submissionType').value,
                hardDiskNo: document.getElementById('hardDiskNo').value,
                agency: document.getElementById('agency').value
            },
            villageData: [],
            checkPointsData: checkPointsData,  // Include check points data for ANEX-IV
            filename: sanitizedFilename
        };

        // Collect village data
        const tbody = document.getElementById('villageTableBody');
        const rows = tbody.querySelectorAll('tr');

        rows.forEach((row, index) => {
            const rowId = index + 1;
            const rowData = {
                slNo: rowId,
                tileNo: getInputValue(row, `tileNo_${rowId}`),
                villageName: getInputValue(row, `villageName_${rowId}`),
                lgdCode: getInputValue(row, `lgdCode_${rowId}`),
                area: getInputValue(row, `area_${rowId}`),
                talukVillage: getInputValue(row, `talukVillage_${rowId}`),
                hobli: getInputValue(row, `hobli_${rowId}`),
                dateOfFlying: getInputValue(row, `dateOfFlying_${rowId}`),
                noOfFlights: getInputValue(row, `noOfFlights_${rowId}`),
                flyingHeight: getInputValue(row, `flyingHeight_${rowId}`),
                rawImages: getInputValue(row, `rawImages_${rowId}`),
                intraFlightOverlap: getInputValue(row, `intraFlightOverlap_${rowId}`),
                fileNaming: getInputValue(row, `fileNaming_${rowId}`),
                gpsProcessing: getInputValue(row, `gpsProcessing_${rowId}`),
                oriGsd: getInputValue(row, `oriGsd_${rowId}`),
                demGsd: getInputValue(row, `demGsd_${rowId}`),
                imgProcX: getInputValue(row, `imgProcX_${rowId}`),
                imgProcY: getInputValue(row, `imgProcY_${rowId}`),
                imgProcZ: getInputValue(row, `imgProcZ_${rowId}`),
                gcpX: getInputValue(row, `gcpX_${rowId}`),
                gcpY: getInputValue(row, `gcpY_${rowId}`),
                gcpZ: getInputValue(row, `gcpZ_${rowId}`),
                noOfIbase: getInputValue(row, `noOfIbase_${rowId}`),
                netAdjX: getInputValue(row, `netAdjX_${rowId}`),
                netAdjY: getInputValue(row, `netAdjY_${rowId}`),
                netAdjZ: getInputValue(row, `netAdjZ_${rowId}`),
                cors1: getInputValue(row, `cors1_${rowId}`),
                cors2: getInputValue(row, `cors2_${rowId}`),
                cors3: getInputValue(row, `cors3_${rowId}`),
                cors4: getInputValue(row, `cors4_${rowId}`),
                oriPixel: getInputValue(row, `oriPixel_${rowId}`),
                demPixel: getInputValue(row, `demPixel_${rowId}`),
                oriQuality: getInputValue(row, `oriQuality_${rowId}`),
                overallQuality: getInputValue(row, `overallQuality_${rowId}`),
                spotErrors: getInputValue(row, `spotErrors_${rowId}`),
                fileSizeOri: getInputValue(row, `fileSizeOri_${rowId}`),
                fileSizeDem: getInputValue(row, `fileSizeDem_${rowId}`),
                fileSizeRaw: getInputValue(row, `fileSizeRaw_${rowId}`),
                path: getInputValue(row, `path_${rowId}`)
            };
            formData.villageData.push(rowData);
        });

        console.log('Data prepared, sending to Python backend...');
        showToast('Creating Excel file with Python...', 'info');

        // Send to Python backend (port 8001)
        fetch('http://localhost:8001/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            // Download the file
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${sanitizedFilename}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            console.log('File downloaded successfully');
            showToast('Excel file exported successfully with all formatting!', 'success');
        })
        .catch(error => {
            console.error('Error exporting to Excel:', error);
            showToast('Error: ' + error.message + '. Make sure Python server is running!', 'error');
        });

    } catch (error) {
        console.error('Error exporting to Excel:', error);
        showToast('Error exporting to Excel: ' + error.message, 'error');
    }
}

// Validate form
function validateForm() {
    const requiredFields = [
        'examinerName', 'designation', 'commencedOn', 'finishedOn',
        'dataReceivedDate', 'district', 'taluk', 'submissionType',
        'hardDiskNo', 'agency'
    ];

    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.classList.add('error');
            field.focus();
            return false;
        } else {
            field.classList.remove('error');
        }
    }

    return true;
}

// Helper function to get input value from row
function getInputValue(row, name) {
    const input = row.querySelector(`[name="${name}"]`);
    return input ? input.value : '';
}

// Helper function to set input value in row
function setInputValue(row, name, value) {
    const input = row.querySelector(`[name="${name}"]`);
    if (input) {
        input.value = value || '';
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add input validation on blur
document.addEventListener('blur', function(e) {
    if (e.target.tagName === 'INPUT' && e.target.hasAttribute('required')) {
        if (e.target.value.trim()) {
            e.target.classList.remove('error');
            e.target.classList.add('success');
        } else {
            e.target.classList.add('error');
            e.target.classList.remove('success');
        }
    }
}, true);

// =====================================================================
// SAVE/LOAD FUNCTIONALITY
// =====================================================================

// Save form data to localStorage
function saveFormData() {
    try {
        const formData = {
            metadata: {
                examinerName: document.getElementById('examinerName').value,
                designation: document.getElementById('designation').value,
                commencedOn: document.getElementById('commencedOn').value,
                finishedOn: document.getElementById('finishedOn').value,
                noOfDays: document.getElementById('noOfDays').value,
                dataReceivedDate: document.getElementById('dataReceivedDate').value,
                district: document.getElementById('district').value,
                taluk: document.getElementById('taluk').value,
                submissionType: document.getElementById('submissionType').value,
                hardDiskNo: document.getElementById('hardDiskNo').value,
                agency: document.getElementById('agency').value
            },
            villageData: getVillageData(),
            checkPointsData: checkPointsData,
            rowCounter: rowCounter
        };

        localStorage.setItem('qaqcFormData', JSON.stringify(formData));
        showToast('Form data saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving form data:', error);
        showToast('Error saving form data', 'error');
    }
}

// Load form data from localStorage
function loadFormData() {
    try {
        const savedData = localStorage.getItem('qaqcFormData');
        if (!savedData) {
            showToast('No saved data found', 'info');
            return;
        }

        const formData = JSON.parse(savedData);

        // Load metadata
        document.getElementById('examinerName').value = formData.metadata.examinerName || '';
        document.getElementById('designation').value = formData.metadata.designation || '';
        document.getElementById('commencedOn').value = formData.metadata.commencedOn || '';
        document.getElementById('finishedOn').value = formData.metadata.finishedOn || '';
        document.getElementById('noOfDays').value = formData.metadata.noOfDays || '';
        document.getElementById('dataReceivedDate').value = formData.metadata.dataReceivedDate || '';
        document.getElementById('district').value = formData.metadata.district || '';
        document.getElementById('taluk').value = formData.metadata.taluk || '';
        document.getElementById('submissionType').value = formData.metadata.submissionType || '';
        document.getElementById('hardDiskNo').value = formData.metadata.hardDiskNo || '';
        document.getElementById('agency').value = formData.metadata.agency || '';

        // Load village data
        const tbody = document.getElementById('villageTableBody');
        tbody.innerHTML = '';
        rowCounter = 0;

        if (formData.villageData && formData.villageData.length > 0) {
            formData.villageData.forEach(village => {
                addVillageRow();
                const currentRow = rowCounter;

                // Fill in the data
                for (const [key, value] of Object.entries(village)) {
                    if (key !== 'slNo') {
                        const input = document.querySelector(`input[name="${key}_${currentRow}"], textarea[name="${key}_${currentRow}"]`);
                        if (input) {
                            input.value = value || '';

                            // Trigger validation for numeric fields
                            if (input.type === 'number') {
                                input.dispatchEvent(new Event('input'));
                            }
                        }
                    }
                }
            });
        }

        // Load check points data
        if (formData.checkPointsData) {
            checkPointsData = formData.checkPointsData;
        }

        showToast('Form data loaded successfully!', 'success');
    } catch (error) {
        console.error('Error loading form data:', error);
        showToast('Error loading form data', 'error');
    }
}

// Auto-save functionality (every 2 minutes)
setInterval(() => {
    const autoSave = document.getElementById('examinerName').value;
    if (autoSave) {
        saveFormData();
        console.log('Auto-saved at', new Date().toLocaleTimeString());
    }
}, 120000); // 2 minutes

// =====================================================================
// CHECK POINTS MODAL FUNCTIONS (ANEX-IV)
// =====================================================================

// Open check points modal for a specific village row
function openCheckPointsModal(rowId) {
    currentVillageRow = rowId;
    const modal = document.getElementById('checkPointsModal');

    // Get village name from the table
    const villageNameInput = document.querySelector(`input[name="villageName_${rowId}"]`);
    const villageName = villageNameInput ? villageNameInput.value : `Village ${rowId}`;

    document.getElementById('modalVillageName').textContent = villageName;

    // Load existing check points data if available
    if (checkPointsData[rowId]) {
        loadCheckPointsIntoModal(checkPointsData[rowId]);
    } else {
        // Initialize with empty data
        clearCheckPointsModal();
    }

    modal.style.display = 'block';
}

// Close check points modal
function closeCheckPointsModal() {
    const modal = document.getElementById('checkPointsModal');
    modal.style.display = 'none';
    currentVillageRow = null;
}

// Clear check points modal
function clearCheckPointsModal() {
    document.getElementById('onMarker').value = '';
    document.getElementById('spatiallyDistributed').value = '';
    document.getElementById('checkPointsBody').innerHTML = '';
}

// Load check points data into modal
function loadCheckPointsIntoModal(data) {
    document.getElementById('onMarker').value = data.onMarker || '';
    document.getElementById('spatiallyDistributed').value = data.spatiallyDistributed || '';

    // Clear existing check points
    document.getElementById('checkPointsBody').innerHTML = '';

    // Load check points
    if (data.checkPoints && data.checkPoints.length > 0) {
        data.checkPoints.forEach((cp, index) => {
            addCheckPointRow(index + 1, cp);
        });
    }
}

// Add a check point row to the modal table
function addCheckPoint() {
    const tbody = document.getElementById('checkPointsBody');
    const currentCount = tbody.children.length;

    if (currentCount >= 12) {
        showToast('Maximum 12 check points allowed per village', 'error');
        return;
    }

    addCheckPointRow(currentCount + 1);
}

// Add check point row with optional data
function addCheckPointRow(number, data = {}) {
    const tbody = document.getElementById('checkPointsBody');
    const row = document.createElement('tr');
    row.setAttribute('data-cp-id', number);

    row.innerHTML = `
        <td>${number}</td>
        <td><input type="text" name="cpName_${number}" value="${data.name || ''}" placeholder="CP ${number}"></td>
        <td><input type="number" step="0.01" name="cpHDistError_${number}" value="${data.hDistError || ''}" placeholder="H.Dist Error"></td>
        <td><input type="number" step="0.001" name="cpActualHeight_${number}" value="${data.actualHeight || ''}" placeholder="Actual Height" onchange="calculateHeightError(${number})"></td>
        <td><input type="number" step="0.001" name="cpObservedHeight_${number}" value="${data.observedHeight || ''}" placeholder="Observed Height" onchange="calculateHeightError(${number})"></td>
        <td><input type="number" step="0.01" name="cpHeightError_${number}" value="${data.heightError || ''}" placeholder="Height Error" readonly></td>
        <td><button type="button" class="btn btn-danger btn-sm" onclick="removeCheckPoint(${number})">Remove</button></td>
    `;

    tbody.appendChild(row);
}

// Calculate height error for a check point
function calculateHeightError(cpNumber) {
    const actualHeight = parseFloat(document.querySelector(`input[name="cpActualHeight_${cpNumber}"]`).value) || 0;
    const observedHeight = parseFloat(document.querySelector(`input[name="cpObservedHeight_${cpNumber}"]`).value) || 0;

    // Formula: (Actual - Observed) * 100
    const heightError = (actualHeight - observedHeight) * 100;

    document.querySelector(`input[name="cpHeightError_${cpNumber}"]`).value = heightError.toFixed(2);
}

// Remove a check point row
function removeCheckPoint(cpNumber) {
    const row = document.querySelector(`tr[data-cp-id="${cpNumber}"]`);
    if (row) {
        row.remove();
        // Renumber remaining rows
        renumberCheckPoints();
    }
}

// Renumber check points after deletion
function renumberCheckPoints() {
    const tbody = document.getElementById('checkPointsBody');
    const rows = tbody.querySelectorAll('tr');

    rows.forEach((row, index) => {
        const number = index + 1;
        row.setAttribute('data-cp-id', number);
        row.children[0].textContent = number; // Update number column

        // Update input names and onclick handlers
        const inputs = row.querySelectorAll('input');
        inputs[0].name = `cpName_${number}`;
        inputs[0].placeholder = `CP ${number}`;
        inputs[1].name = `cpHDistError_${number}`;
        inputs[2].name = `cpActualHeight_${number}`;
        inputs[2].setAttribute('onchange', `calculateHeightError(${number})`);
        inputs[3].name = `cpObservedHeight_${number}`;
        inputs[3].setAttribute('onchange', `calculateHeightError(${number})`);
        inputs[4].name = `cpHeightError_${number}`;

        const button = row.querySelector('button');
        button.setAttribute('onclick', `removeCheckPoint(${number})`);
    });
}

// Save check points data
function saveCheckPoints() {
    if (!currentVillageRow) {
        showToast('Error: No village selected', 'error');
        return;
    }

    // Get metadata
    const onMarker = document.getElementById('onMarker').value;
    const spatiallyDistributed = document.getElementById('spatiallyDistributed').value;

    // Get all check points
    const checkPoints = [];
    const tbody = document.getElementById('checkPointsBody');
    const rows = tbody.querySelectorAll('tr');

    rows.forEach((row, index) => {
        const number = index + 1;
        const name = document.querySelector(`input[name="cpName_${number}"]`).value;
        const hDistError = document.querySelector(`input[name="cpHDistError_${number}"]`).value;
        const actualHeight = document.querySelector(`input[name="cpActualHeight_${number}"]`).value;
        const observedHeight = document.querySelector(`input[name="cpObservedHeight_${number}"]`).value;
        const heightError = document.querySelector(`input[name="cpHeightError_${number}"]`).value;

        checkPoints.push({
            name,
            hDistError,
            actualHeight,
            observedHeight,
            heightError
        });
    });

    // Save to global checkPointsData
    checkPointsData[currentVillageRow] = {
        onMarker,
        spatiallyDistributed,
        checkPoints
    };

    showToast(`Check points saved for Village ${currentVillageRow} (${checkPoints.length} points)`, 'success');
    closeCheckPointsModal();
}
