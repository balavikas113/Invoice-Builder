document.addEventListener('DOMContentLoaded', function() {
    // Initialize the invoice
    initializeInvoice();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initial render of the invoice preview
    updateInvoicePreview();
});

// Initialize the invoice form with data
function initializeInvoice() {
    const data = window.invoiceModule.data;
    
    // Set invoice details
    document.getElementById('invoiceNumber').value = data.invoiceNumber;
    document.getElementById('issueDate').value = data.issueDate;
    document.getElementById('dueDate').value = data.dueDate;
    document.getElementById('currency').value = data.currency;
    document.getElementById('taxRate').value = data.taxRate;
    document.getElementById('discountRate').value = data.discountRate;
    
    // Set sender details
    document.getElementById('fromName').value = data.from.name;
    document.getElementById('fromAddress').value = data.from.address;
    document.getElementById('fromEmail').value = data.from.email;
    document.getElementById('fromPhone').value = data.from.phone;
    
    // Set recipient details
    document.getElementById('toName').value = data.to.name;
    document.getElementById('toAddress').value = data.to.address;
    document.getElementById('toEmail').value = data.to.email;
    document.getElementById('toPhone').value = data.to.phone;
    
    // Set notes
    document.getElementById('notes').value = data.notes;
    
    // Render initial items
    const itemsTableBody = document.getElementById('itemsTableBody');
    itemsTableBody.innerHTML = '';
    
    data.items.forEach(item => {
        renderItemRow(item);
    });
    
    // Calculate initial totals
    window.invoiceModule.calculate();
}

// Set up all event listeners
function setupEventListeners() {
    // Add item button
    document.getElementById('addItemBtn').addEventListener('click', function() {
        const newItem = window.invoiceModule.addItem();
        renderItemRow(newItem);
        updateInvoicePreview();
    });
    
    // Logo upload
    document.getElementById('logoUpload').addEventListener('change', handleLogoUpload);
    
    // Print button
    document.getElementById('printBtn').addEventListener('click', function() {
        window.print();
    });
    
    // Download PDF button
    document.getElementById('downloadBtn').addEventListener('click', generatePDF);
    
    // Form input changes
    setupFormChangeListeners();
    
    // Navigation links
    setupNavigationLinks();
}

// Set up form change listeners
function setupFormChangeListeners() {
    // Invoice details
    document.getElementById('invoiceNumber').addEventListener('input', function(e) {
        window.invoiceModule.data.invoiceNumber = e.target.value;
        updateInvoicePreview();
    });
    
    document.getElementById('issueDate').addEventListener('input', function(e) {
        window.invoiceModule.data.issueDate = e.target.value;
        updateInvoicePreview();
    });
    
    document.getElementById('dueDate').addEventListener('input', function(e) {
        window.invoiceModule.data.dueDate = e.target.value;
        updateInvoicePreview();
    });
    
    document.getElementById('currency').addEventListener('change', function(e) {
        window.invoiceModule.data.currency = e.target.value;
        updateInvoicePreview();
    });
    
    document.getElementById('taxRate').addEventListener('input', function(e) {
        window.invoiceModule.data.taxRate = parseFloat(e.target.value) || 0;
        window.invoiceModule.calculate();
        updateInvoicePreview();
    });
    
    document.getElementById('discountRate').addEventListener('input', function(e) {
        window.invoiceModule.data.discountRate = parseFloat(e.target.value) || 0;
        window.invoiceModule.calculate();
        updateInvoicePreview();
    });
    
    // Sender details
    document.getElementById('fromName').addEventListener('input', function(e) {
        window.invoiceModule.data.from.name = e.target.value;
        updateInvoicePreview();
    });
    
    document.getElementById('fromAddress').addEventListener('input', function(e) {
        window.invoiceModule.data.from.address = e.target.value;
        updateInvoicePreview();
    });
    
    document.getElementById('fromEmail').addEventListener('input', function(e) {
        window.invoiceModule.data.from.email = e.target.value;
        updateInvoicePreview();
    });
    
    document.getElementById('fromPhone').addEventListener('input', function(e) {
        window.invoiceModule.data.from.phone = e.target.value;
        updateInvoicePreview();
    });
    
    // Recipient details
    document.getElementById('toName').addEventListener('input', function(e) {
        window.invoiceModule.data.to.name = e.target.value;
        updateInvoicePreview();
    });
    
    document.getElementById('toAddress').addEventListener('input', function(e) {
        window.invoiceModule.data.to.address = e.target.value;
        updateInvoicePreview();
    });
    
    document.getElementById('toEmail').addEventListener('input', function(e) {
        window.invoiceModule.data.to.email = e.target.value;
        updateInvoicePreview();
    });
    
    document.getElementById('toPhone').addEventListener('input', function(e) {
        window.invoiceModule.data.to.phone = e.target.value;
        updateInvoicePreview();
    });
    
    // Notes
    document.getElementById('notes').addEventListener('input', function(e) {
        window.invoiceModule.data.notes = e.target.value;
        updateInvoicePreview();
    });
}

// Set up navigation links
function setupNavigationLinks() {
    // Login and signup buttons
    const loginBtn = document.querySelector('a.btn-outline');
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Login functionality would be implemented here in a real application.');
    });
    
    const signupBtn = document.querySelector('a.btn-primary');
    signupBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Sign up functionality would be implemented here in a real application.');
    });
    
    // Footer links
    const footerLinks = document.querySelectorAll('.footer-column a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageName = e.target.textContent;
            alert(`You clicked on the "${pageName}" page. This would navigate to the ${pageName} page in a real application.`);
        });
    });
}

// Handle logo upload
function handleLogoUpload(e) {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            window.invoiceModule.data.logo = event.target.result;
            
            // Update logo preview
            const logoPreview = document.getElementById('logoPreview');
            logoPreview.innerHTML = '';
            
            const img = document.createElement('img');
            img.src = event.target.result;
            img.classList.add('logo-image');
            logoPreview.appendChild(img);
            
            updateInvoicePreview();
        };
        
        reader.readAsDataURL(e.target.files[0]);
    }
}

// Render an item row in the table
function renderItemRow(item) {
    const itemsTableBody = document.getElementById('itemsTableBody');
    
    const row = document.createElement('tr');
    row.id = item.id;
    row.innerHTML = `
        <td>
            <input type="text" class="item-description" value="${item.description}" placeholder="Item description">
        </td>
        <td>
            <input type="number" class="item-quantity" value="${item.quantity}" min="1">
        </td>
        <td>
            <input type="number" class="item-price" value="${item.price}" min="0" step="0.01">
        </td>
        <td class="item-amount">${formatCurrency(item.amount)}</td>
        <td>
            <button type="button" class="remove-item-btn">
                <i class="fas fa-times"></i>
            </button>
        </td>
    `;
    
    itemsTableBody.appendChild(row);
    
    // Add event listeners to the new row
    const descInput = row.querySelector('.item-description');
    const qtyInput = row.querySelector('.item-quantity');
    const priceInput = row.querySelector('.item-price');
    const removeBtn = row.querySelector('.remove-item-btn');
    
    descInput.addEventListener('input', function(e) {
        window.invoiceModule.updateItem(item.id, 'description', e.target.value);
        updateInvoicePreview();
    });
    
    qtyInput.addEventListener('input', function(e) {
        const qty = parseInt(e.target.value) || 0;
        window.invoiceModule.updateItem(item.id, 'quantity', qty);
        window.invoiceModule.calculate();
        row.querySelector('.item-amount').textContent = formatCurrency(item.quantity * item.price);
        updateInvoicePreview();
    });
    
    priceInput.addEventListener('input', function(e) {
        const price = parseFloat(e.target.value) || 0;
        window.invoiceModule.updateItem(item.id, 'price', price);
        window.invoiceModule.calculate();
        row.querySelector('.item-amount').textContent = formatCurrency(item.quantity * item.price);
        updateInvoicePreview();
    });
    
    removeBtn.addEventListener('click', function() {
        if (window.invoiceModule.removeItem(item.id)) {
            row.remove();
            window.invoiceModule.calculate();
            updateInvoicePreview();
        } else {
            alert('You need at least one item in the invoice.');
        }
    });
}

// Update the invoice preview
function updateInvoicePreview() {
    const data = window.invoiceModule.calculate();
    const currencySymbol = getCurrencySymbol(data.currency);
    
    const previewElement = document.getElementById('invoicePreview');
    
    previewElement.innerHTML = `
        <div class="invoice-preview-header">
            <div class="invoice-preview-logo">
                ${data.logo ? `<img src="${data.logo}" alt="Company Logo" class="logo-image">` : ''}
            </div>
            <div class="invoice-preview-meta">
                <div class="invoice-preview-title">INVOICE</div>
                <div>Invoice Number: ${data.invoiceNumber}</div>
                <div>Issue Date: ${formatDate(data.issueDate)}</div>
                <div>Due Date: ${formatDate(data.dueDate)}</div>
            </div>
        </div>
        
        <div class="invoice-preview-addresses">
            <div class="invoice-preview-address">
                <h4>From</h4>
                <div>${data.from.name}</div>
                <div>${formatAddress(data.from.address)}</div>
                <div>${data.from.email}</div>
                <div>${data.from.phone}</div>
            </div>
            <div class="invoice-preview-address">
                <h4>To</h4>
                <div>${data.to.name}</div>
                <div>${formatAddress(data.to.address)}</div>
                <div>${data.to.email}</div>
                <div>${data.to.phone}</div>
            </div>
        </div>
        
        <div class="invoice-preview-items">
            <table class="invoice-preview-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.items.map(item => `
                        <tr>
                            <td>${item.description}</td>
                            <td>${item.quantity}</td>
                            <td>${formatCurrency(item.price)}</td>
                            <td>${formatCurrency(item.amount)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="invoice-preview-summary">
            <div>Subtotal: ${formatCurrency(data.subtotal)}</div>
            <div>Tax (${data.taxRate}%): ${formatCurrency(data.taxAmount)}</div>
            <div>Discount (${data.discountRate}%): ${formatCurrency(data.discountAmount)}</div>
            <div class="invoice-preview-total">Total: ${formatCurrency(data.total)}</div>
        </div>
        
        ${data.notes ? `
            <div class="invoice-preview-notes">
                <strong>Notes:</strong>
                <div>${formatNotes(data.notes)}</div>
            </div>
        ` : ''}
    `;
}

// Format currency based on selected currency
function formatCurrency(amount) {
    const data = window.invoiceModule.data;
    const currencySymbol = getCurrencySymbol(data.currency);
    
    return `${currencySymbol}${amount.toFixed(2)}`;
}

// Get currency symbol
function getCurrencySymbol(currency) {
    const symbols = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'INR': '₹'
    };
    
    return symbols[currency] || '$';
}

// Format date for display
function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Format address for display
function formatAddress(address) {
    if (!address) return '';
    
    return address.replace(/\n/g, '<br>');
}

// Format notes for display
function formatNotes(notes) {
    if (!notes) return '';
    
    return notes.replace(/\n/g, '<br>');
}

// Generate PDF
function generatePDF() {
    const element = document.getElementById('invoicePreview');
    const opt = {
        margin: 10,
        filename: `Invoice-${window.invoiceModule.data.invoiceNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Generate PDF
    html2pdf().set(opt).from(element).save();
}