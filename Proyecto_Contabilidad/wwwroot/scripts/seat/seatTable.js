//#region Variables
var route = location.href;
var seat_id = route.split("/")[5]

var accounts = [];
//#endregion

document.addEventListener("DOMContentLoaded", () => {
    getAccounts()

});

function getAccounts() {

    fetch(base_url + '/Account')
        .then(response => response.json())
        .then(data => {

            accounts = data;
            console.log(data)
            loadDataFromAPI()

        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });

}


function loadDataFromAPI() {
    fetch(base_url + '/SeatDetail/GetBySeat/' + seat_id)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('tableBody');
            var accountName = "";
            var accountCode = "";

            console.log(data);

            //return;

            data.forEach(item => {

                accounts.forEach(opc => {
                    if (item.accounT_ID == opc.accountId) {
                        accountCode = opc.accountCode
                        accountName = opc.accountName
                    }
                })


                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                                            <td>${accountCode}</td>
                                            <td>${accountName}</td>
                                            <td>${item.amount}</td>
                                            <td>USD</td>
                                            <td>${item.amount * 600}</td>
                                            <td>CRC</td>
                                            <td>${item.description}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <a class="dropdown-toggle icon-burger-mini" href="#" role="button" id="dropdownMenuLink"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                                    </a>
                                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                                        <a class="dropdown-item" data-toggle="modal" data-target="#modal-edit-contact" href="#">Editar</a>
                                                        <a class="dropdown-item" href="#">Eliminar</a>
                                                    </div>
                                                </div>
                                            </td>
                                        `;

                tableBody.appendChild(newRow);
            });
        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });

}

function postDetail() {


    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: base_url + '/Seat/Post/' + seat_id,        
        dataType: "json",
        success: function (data) {

            console.log(data)

            window.location.href = url_front + "Seat/List"

        },
        error: function (error) {            
            console.log(error);
        }
    });

}