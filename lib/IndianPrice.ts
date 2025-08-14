
function indianCurrency(price:any) {
    
    const num = Number(price)

    const formatCurrency = Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
    })
    return formatCurrency.format(num)
}

export default indianCurrency;