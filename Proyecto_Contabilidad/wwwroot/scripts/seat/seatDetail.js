//#region Variables
var route = location.href;
var seat_id = route.split("/")[5]
//#endregion

document.addEventListener("DOMContentLoaded", () => {
    getAccountCatalog()

});

function addDetail() {
    // Obtener los valores de los campos
    var accountId = $("#accountId").val();
    var amount = $("#amount").val();
    var description = $("#description").val();



    // Verificar si algún campo está vacío
    if (accountId === "" || amount === "" || description === "") {
        alertWarning("Todos los campos son obligatorios. Por favor, complete todos los campos.");
        return; // Detener la ejecución si hay campos vacíos
    }


    // Si todas las validaciones pasan, enviar los datos al servidor
    var formData = {
        id: 0,
        seat_id: seat_id,
        account_id: accountId,
        amount: amount,
        description: description,
        active: true
    };


    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: base_url + '/SeatDetail',
        data: JSON.stringify(formData),
        dataType: "json",
        success: function (data) {
            
            $("#accountId").val(null);
            $("#amount").val("");
            $("#description").val("");

        },
        error: function (error) {
            // Manejar errores si es necesario
            console.log(error);
        }
    });
}

function getAccountCatalog() {

    $(".account_select").select2({
        ajax: {
            type: "GET",
            url: base_url + "/Account/Select",
            cache: false,  
        }
    });
}

function saveDetail() {

    fetch(base_url + '/SeatDetail/GetBySeat/' + seat_id)
        .then(response => response.json())
        .then(data => {

            if (data.length > 1) {
                window.location.href = url_front + "Seat/Details/" + seat_id;
            }
            else {
                alertWarning("Debe tener 2 asientos como minimo.")
            }

        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });

}
