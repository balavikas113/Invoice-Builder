// Invoice data model
let invoiceData = {
    invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currency: 'USD',
    taxRate: 10,
    discountRate: 0,
    logo: null,
    from: {
        name: 'Your Company Name',
        address: 'Your Company Address',
        city: 'Your City',
        country: 'Your Country',
        zipCode: 'Your Zip Code',
        email: 'your.email@example.com',
        phone: '+1-555-123-4567'
    },
    to: {
        name: 'Client Name',
        address: 'Client Address',
        city: 'Client City',
        country: 'Client Country',
        zipCode: 'Client Zip Code',
        email: 'client@example.com',
        phone: '+1-555-987-6543'
    },
    items: [
        {
            id: 'item-1',
            description: 'Website Design',
            quantity: 1,
            price: 1000,
            amount: 1000
        }
    ],
    notes: 'Thank you for your business!',
    subtotal: 0,
    taxAmount: 0,
    discountAmount: 0,
    total: 0
}

// Calculate invoice totals
function calculateInvoice() {
    // Calculate each item's amount
    invoiceData.items.forEach(item => {
        item.amount = item.quantity * item.price
    })
    
    // Calculate subtotal
    invoiceData.subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0)
    
    // Calculate tax amount
    invoiceData.taxAmount = (invoiceData.subtotal * invoiceData.taxRate) / 100
    
    // Calculate discount amount
    invoiceData.discountAmount = (invoiceData.subtotal * invoiceData.discountRate) / 100
    
    // Calculate total
    invoiceData.total = invoiceData.subtotal + invoiceData.taxAmount - invoiceData.discountAmount
    
    return invoiceData
}

// Generate a unique ID for items
function generateUniqueId() {
    return 'item-' + Math.random().toString(36).substr(2, 9)
}

// Add a new item to the invoice
function addItem() {
    const newItem = {
        id: generateUniqueId(),
        description: '',
        quantity: 1,
        price: 0,
        amount: 0
    }
    
    invoiceData.items.push(newItem)
    return newItem
}

// Remove an item from the invoice
function removeItem(itemId) {
    if (invoiceData.items.length > 1) {
        invoiceData.items = invoiceData.items.filter(item => item.id !== itemId)
        return true
    }
    return false
}

// Update an item in the invoice
function updateItem(itemId, field, value) {
    const item = invoiceData.items.find(item => item.id === itemId)
    if (item) {
        item[field] = value
        if (field === 'quantity' || field === 'price') {
            item.amount = item.quantity * item.price
        }
        return true
    }
    return false
}

// Export functions and data
window.invoiceModule = {
    data: invoiceData,
    calculate: calculateInvoice,
    addItem: addItem,
    removeItem: removeItem,
    updateItem: updateItem
}