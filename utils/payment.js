async function processPayment(amount, currency = 'USD') {
    try {
        // Simulated payment processing
        const paymentData = {
            amount,
            currency,
            timestamp: new Date().toISOString()
        };
        
        return await trickleCreateObject('payment', paymentData);
    } catch (error) {
        reportError(error);
        return null;
    }
}

function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

async function verifyPayment(paymentId) {
    try {
        const payment = await trickleGetObject('payment', paymentId);
        return payment.objectData.status === 'completed';
    } catch (error) {
        reportError(error);
        return false;
    }
}
