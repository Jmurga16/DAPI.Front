//#region Variables
var route = location.href;
var seat_id = route.split("/")[5]

var accounts = [];
var dataSeat = [];
var dataSeatDetail = [];
var statusSeat;

var detailId = ""

//#endregion

document.addEventListener("DOMContentLoaded", () => {
    getSeat()
});

function onInit() {
    clearDataModal()
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";
    getTableSeatDetails();
}

function getSeat() {

    fetch(base_url + '/Seat/' + seat_id)
        .then(response => response.json())
        .then(data => {

            dataSeat = data    
            statusSeat = data.status;

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

            accounts = data;
            getTableSeatDetails()

        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });

}

function getTableSeatDetails() {
    fetch(base_url + '/SeatDetail/GetBySeat/' + seat_id)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('tableBody');
            var accountName = "";
            var accountCode = "";

            dataSeatDetail = data;
            
            data.forEach(item => {

                accounts.forEach(opc => {
                    if (item.accounT_ID == opc.accountId) {
                        accountCode = opc.accountCode
                        accountName = opc.accountName
                    }
                })

                var amountDolar = dataSeat.exchangE_RATE != null ? item.amount : ""
                var amountCRC = dataSeat.exchangE_RATE != null ? item.amount * dataSeat.exchangE_RATE : item.amount
                
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                                            <td>${accountCode}</td>
                                            <td>${accountName}</td>
                                            <td>${amountDolar}</td>
                                            <td>USD</td>
                                            <td>${amountCRC}</td>
                                            <td>CRC</td>
                                            <td>${item.description}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <a class="dropdown-toggle icon-burger-mini" href="#" role="button" id="dropdownMenuLink"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                                    </a>
                                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                                        <a class="dropdown-item" data-toggle="modal" data-target="#modal-edit-contact" onclick="setDataModal(${item.id},'${accountCode}')">Editar</a>
                                                        <a class="dropdown-item" onclick="deleteDetail(${item.id})">Eliminar</a>
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

function goToCreateDetail() {
    window.location.href = "/Seat/CreateDetail/" + seat_id;
}

function validatePost() {
    var counter = 0;
    var isValid = true;
    dataSeatDetail.forEach(item => {
        counter = counter + item.amount
    })

    if (counter != 0) {
        isValid = false
        alertWarning("Las cantidades deben sumar 0.")
    }

    return isValid;

}

function postDetail() {

    if (validatePost() == false) {
        return
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: base_url + '/Seat/Post/' + seat_id,
        dataType: "json",
        success: function (data) {
            
            addLog("POSTEA EL ASIENTO CON ID: " + seat_id)
            window.location.href = url_front + "Seat/List"

        },
        error: function (error) {
            console.log(error);
        }
    });

}

function deleteDetail(id) {

    Swal.fire({
        title: `&#191;Desea eliminar el Detalle de Asiento seleccionado?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "DELETE",
                contentType: "application/json",
                url: base_url + '/SeatDetail/' + id,
                dataType: "json",
                success: function (data) {
                    alertSuccess("Detalle de Asiento eliminado con exito.")
                    addLog("ELIMINA AL DETALLE DE ASIENTO CON ID: " + seat_id)

                    onInit()
                },
                error: function (error) {
                    console.error(error);
                }
            });
        }
    });
}

async function getAccountCatalog() {

    $(".account_select").select2({
        ajax: {
            type: "GET",
            url: base_url + "/Account/Select",
            cache: false,
        }
    });
}

async function setDataModal(id, accountCode) {
    
    await getAccountCatalog()

    detailId = id

    fetch(base_url + '/SeatDetail/' + id)
        .then(response => response.json())
        .then(data => {
            
            $("#amount").val(data.amount);
            $("#description").val(data.description);
          
        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });
}

function clearDataModal() {
    $('#accountId').val(null).trigger('change');
    $("#amount").val("");
    $("#description").val("");
}

function editDetail() {
    var accountId = $("#accountId").val();
    var amount = $("#amount").val();
    var description = $("#description").val();

    if (accountId === null || amount === "" || description === "") {
        alertWarning("Todos los campos son obligatorios. Por favor, complete todos los campos.");
        return;
    }

    // Si todas las validaciones pasan, enviar los datos al servidor
    var formData = {
        id: detailId,
        seat_id: seat_id,
        account_id: accountId,
        amount: amount,
        description: description,
        active: true
    };

    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: base_url + '/SeatDetail',
        data: JSON.stringify(formData),
        dataType: "json",
        success: function (data) {

            alertSuccess("Detalle de asiento modificado con exito.")
            addLog("EDITA AL DETALLE DE ASIENTO CON ID: " + detailId)
            onInit();
            $('#modal-edit-contact').modal('hide');

        },
        error: function (error) {
            // Manejar errores si es necesario
            console.log(error);
        }
    });
}