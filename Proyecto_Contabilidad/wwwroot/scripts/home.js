document.addEventListener("DOMContentLoaded", () => {
    loadDataFromAPI()
});

var listCustomer = []

function loadDataFromAPI() {
    fetch(base_url + '/Customer')
        .then(response => response.json())
        .then(data => {

            listCustomer = data;

            var select = document.getElementById('customerSelected');
            if (select) {
                data.forEach(item => {

                    $(select).append('<option value=' + item.customerId + '>' + item.customerName + '</option>');

                });
            }
        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });
}

function goToPrincipal() {    
    var customerSelected = $("#customerSelected").val();

    listCustomer.forEach(item => {
        if (item.customerId == customerSelected) {
            currentCustomerId = item.customerId
            currentCustomerName = item.customerName
        }
    });

    localStorage.setItem("currentCustomerID", currentCustomerId);
    localStorage.setItem("currentCustomerName", currentCustomerName);
    
    window.location.href = url_front + 'Home/Principal';
}

