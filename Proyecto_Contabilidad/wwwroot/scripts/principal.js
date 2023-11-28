document.addEventListener("DOMContentLoaded", () => {
    setCustomer()
});

function setCustomer() {
        
    var newContent = 'Cliente: ' + localStorage.getItem("currentCustomerName");
    var contentHolder = document.getElementById('customer-name');
    contentHolder.innerHTML = newContent;
        
}
