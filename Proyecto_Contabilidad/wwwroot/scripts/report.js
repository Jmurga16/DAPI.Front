document.addEventListener("DOMContentLoaded", () => {
    getSeats()
});

var listSeats = []
var listDetailSeats = []
var reporte = []
var listAccount = []
var customer_id = localStorage.getItem("currentCustomerID");

function onInit() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";
    loadDataFromAPI();
}

function getSeats() {

    fetch(base_url + '/Seat/')
        .then(response => response.json())
        .then(data => {

            data.forEach(item => {
                if (item.customeR_ID == customer_id) {
                    listSeats.push(item)
                }
            })

            getDetailSeats()
        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });
}

function getDetailSeats() {

    fetch(base_url + '/SeatDetail/')
        .then(response => response.json())
        .then(data => {

            listDetailSeats = data
            getAccounts()
        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });
}

function getAccounts() {

    fetch(base_url + '/Account')
        .then(response => response.json())
        .then(data => {

            listAccount = data;
            getTableData()

        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });

}

function getTableData() {

    const tableBody = document.getElementById('tableBody');

    var codigo = ""
    var nombreCuenta = ""
    var inicial = 0

    listDetailSeats.forEach(item => {

        var debitoCRC = 0;
        var creditoCRC = 0;
        var saldoFinalCRC = 0;

        var debitoDolar = 0;
        var creditoDolar = 0;
        var saldoFinalDolar = 0;

        var amountDolar = 0
        var amountCRC = 0

        listAccount.forEach(account => {
            if (item.accounT_ID == account.accountId) {
                codigo = account.accountCode
                nombreCuenta = account.accountName
            }
        })

        listSeats.forEach(opc => {
            if (item.seaT_ID == opc.id) {
                exchange = opc.exchangE_RATE
                amountDolar = opc.exchangE_RATE != null ? item.amount : 0
                amountCRC = opc.exchangE_RATE != null ? item.amount * opc.exchangE_RATE : item.amount
            }
        })

        debitoCRC = amountCRC > 0 ? amountCRC : 0
        creditoCRC = amountCRC <= 0 ? amountCRC : 0

        debitoDolar = amountDolar > 0 ? amountDolar : 0
        creditoDolar = amountDolar <= 0 ? amountDolar : 0

        saldoFinalCRC = (inicial + debitoCRC + creditoCRC)
        saldoFinalDolar = (inicial + debitoDolar + creditoDolar)

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
                                    <td>${codigo}</td>
                                    <td>${nombreCuenta}</td>
                                    
                                    <td>${inicial}</td>
                                    <td>${debitoCRC}</td>
                                    <td>${creditoCRC}</td>
                                    <td>${saldoFinalCRC}</td>

                                    <td>${inicial}</td>
                                    <td>${debitoDolar}</td>
                                    <td>${creditoDolar}</td>
                                    <td>${saldoFinalDolar}</td>
                                   `;

        tableBody.appendChild(newRow);
    });

}

function loadDataFromAPI() {
    fetch(base_url + '/Log')
        .then(response => response.json())
        .then(data => {

        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });
}




