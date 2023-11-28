//#region Variables
var url_front = 'http://localhost:5108/'
var base_url = 'https://localhost:7259/api'

var currentCustomerID = 0;
var currentCustomerName = ""

var listConversion = [
    { id: 0, name: "No Convierte" },
    { id: 1, name: "De Colon a Dolar" },
    { id: 2, name: "De Dolar a Colon" }
];

var listAccountType = [
    { id: 1, name: "Activo" },
    { id: 2, name: "Gasto" },
    { id: 3, name: "Ingreso" },
    { id: 4, name: "Pasivo" },
    { id: 5, name: "Patrimonio" },
];

//#endregion


