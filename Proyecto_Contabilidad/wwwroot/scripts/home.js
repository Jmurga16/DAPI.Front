document.addEventListener("DOMContentLoaded", () => {
    loadDataFromAPI()
});

var listCustomer = []

function loadDataFromAPI() {
    fetch(base_url + '/Customer')
        .then(response => response.json())
        .then(data => {

            listCustomer = data;

            var select = document.getElementById('mySelect');
            if (select) {
                data.forEach(item => {

                    $(select).append('<option value=' + item.customerID + '>' + item.customerName + '</option>');

                });
            }
        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });
}

function goToPrincipal() {    
    var customerSelected = $("#mySelect").val();
        
    listCustomer.forEach(item => {
        if (item.customerID == customerSelected) {
            currentCustomerID = item.customerID
            currentCustomerName = item.customerName
        }
    });

    localStorage.setItem("currentCustomerID", currentCustomerID);
    localStorage.setItem("currentCustomerName", currentCustomerName);

    window.location.href = url_front + 'Home/Principal';
}

