document.addEventListener("DOMContentLoaded", () => {
    getEmployees()
});

var listEmployees = []

function onInit() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";
    loadDataFromAPI();
}

function getEmployees() {

    fetch(base_url + '/Employee/')
        .then(response => response.json())
        .then(data => {

            listEmployees = data;
            console.log(data)
            loadDataFromAPI();
        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });
}

function loadDataFromAPI() {
    fetch(base_url + '/Log')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('tableBody');

            console.log(data)

            data.forEach(item => {

                var employee = "";

                listEmployees.forEach(opc => {
                    if (item.employeeId == opc.employeeId) {
                        employee = opc.username
                    }
                })

                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                                    <td>${employee}</td>
                                    <td>${item.logDescription}</td>                                          
                                    <td>${item.dateTime.slice(0, 10)}</td>                                          
                                   `;

                tableBody.appendChild(newRow);
            });
        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });
}




