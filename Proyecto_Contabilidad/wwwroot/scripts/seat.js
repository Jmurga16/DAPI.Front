//#region Variables
var url_front = 'http://localhost:5108/'
var url_api = 'https://localhost:7259/api'

//#endregion

function addSeat() {
    // Obtener los valores de los campos
    var date = $("#date").val();
    var currency = $("#currency").val();
    var exchange_rate = $("#exchange_rate").val();
    var reference = $("#reference").val();

    // Verificar si algún campo está vacío
    if (date === "" || currency === "" || reference === "") {
        alert("Todos los campos son obligatorios. Por favor, complete todos los campos.");
        return; // Detener la ejecución si hay campos vacíos
    }

    if (currency === "USD" && exchange_rate === "") {
        alert("Debe digitar el tipo de Cambio.");
    }

    // Si todas las validaciones pasan, enviar los datos al servidor
    var formData = {
        id:0,
        //date: date,
        currency: currency,
        exchange_rate: exchange_rate,
        reference: reference,
        status: false
    };


    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: url_api + '/Seat',
        data: JSON.stringify(formData),
        dataType: "json",
        success: function (data) {
            // Procesar la respuesta si es necesario
            // Puedes mostrar un mensaje de éxito o actualizar la lista de clientes, por ejemplo
            $("#date").val("");
            $("#currency").val("");
            $("#exchange_rate").val("");
            $("#reference").val("");
            $("#status").val("");
                        
            window.location.href = url_front + "Seat/CreateDetail/" + data.id;
        },
        error: function (error) {
            // Manejar errores si es necesario
            console.log(error);
        }
    });
}
