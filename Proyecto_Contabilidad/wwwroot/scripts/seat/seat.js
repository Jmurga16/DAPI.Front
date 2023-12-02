//#region Variables


//#endregion

function addSeat() {
    // Obtener los valores de los campos
    var date_seat = $("#date_seat").val();
    var currency = $("#currency").val();
    var exchange_rate = $("#exchange_rate").val();
    var reference = $("#reference").val();
    var customer_id = 1;

    // Verificar si algún campo está vacío
    if (date_seat === "" || currency === "" || reference === "") {
        alert("Todos los campos son obligatorios. Por favor, complete todos los campos.");
        return; // Detener la ejecución si hay campos vacíos
    }

    if (currency === "USD" && exchange_rate === "") {
        alert("Debe digitar el tipo de Cambio.");
    }

    // Si todas las validaciones pasan, enviar los datos al servidor
    var formData = {
        id:0,
        date_seat: date_seat,
        currency: currency,
        exchange_rate: exchange_rate,
        reference: reference,
        customer_id : 1,
        status: false
    };


    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: base_url + '/Seat',
        data: JSON.stringify(formData),
        dataType: "json",
        success: function (data) {
            // Procesar la respuesta si es necesario
            // Puedes mostrar un mensaje de éxito o actualizar la lista de clientes, por ejemplo
            $("#date_seat").val("");
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

