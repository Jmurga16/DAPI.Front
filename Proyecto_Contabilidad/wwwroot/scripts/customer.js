document.addEventListener("DOMContentLoaded", () => {

    loadDataFromAPI();
});

function loadDataFromAPI() {
    fetch(base_url + '/Customer')
        .then(response => response.json())
        .then(data => {
            const customerCardsContainer = document.getElementById('customer-cards');

            // Iterar sobre los datos de los clientes y crear una tarjeta para cada uno                        
            data.forEach(customer => {
                const cardHtml = `
                                    <div class="col-lg-6 col-xl-4">
                                        <div class="card card-default p-4" data-toggle="modall" data-target="#modal-contact" data-customer-id="${customer.customerID}">
                                            <a href="javascript:0" class="media text-secondary" data-toggle="modal" data-target="#modal-contact">
                                                <div class="media-body">
                                                    <h5 class="mt-0 mb-2 text-dark">${customer.customerName}</h5>
                                                    <ul class="list-unstyled text-smoke text-smoke">
                                                        <li class="d-flex">
                                                            <i class="mdi mdi-map mr-1"></i>
                                                            <span>${customer.customerAddress}</span>
                                                        </li>
                                                        <li class="d-flex">
                                                            <i class="mdi mdi-email mr-1"></i>
                                                            <span>${customer.emailAddress}</span>
                                                        </li>
                                                        <li class="d-flex">
                                                            <i class="mdi mdi-phone mr-1"></i>
                                                            <span>${customer.phoneNumber}</span>
                                                        </li>
                                                        <li class="d-flex">
                                                        <i class="mdi mdi-id mr-1"></i>
                                                        <span style="opacity: 0;">${customer.customerID}</span>
                                                        </li>
                                                        <li class="d-flex">
                                                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-edit-contact" data-customer-id="${customer.customerID}">
                                                            Editar
                                                        </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </a>
                                            <br>

                                        </div>
                                    </div>
                                `;
                //alert(customer.customerID);
                // Agregar la tarjeta al contenedor
                customerCardsContainer.innerHTML += cardHtml;
            });

        })
        .catch(error => console.error('Error al cargar los datos de los clientes:', error));
}

function addCustomer() {
    // Obtener los valores de los campos
    var customerName = $("#CustomerName").val();
    var customerAddress = $("#CustomerAddress").val();
    var emailAddress = $("#EmailAddress").val();
    var phoneNumber = $("#PhoneNumber").val();

    // Verificar si algún campo está vacío
    if (!customerName || !customerAddress || !emailAddress || !phoneNumber) {
        // Mostrar un mensaje de error si algún campo está vacío
        alert("Por favor, complete todos los campos.");
        return; // Evita el envío del formulario
    }

    // Expresión regular para validar un número de teléfono de 8 dígitos
    var phoneRegex = /^\d{8}$/;

    // Expresión regular para validar que el nombre no contenga números
    var nameRegex = /^[A-Za-z ]+$/;

    // Validar el formato del correo electrónico
    //var email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!customerName.match(nameRegex)) {
        alert('El nombre no puede contener números ni caracteres especiales.');
        return;
    }

    if (!phoneNumber.match(phoneRegex)) {
        alert('El número de teléfono no cumple con el formato correcto (debe contener 8 dígitos numéricos).');
        return;
    }

    if (!employeeemailAddress.match(emailRegex)) {
        alert('El correo debe cumplir con el formato.');
        return;
    }

    // Si todas las validaciones pasan, enviar los datos al servidor
    var formData = {
        idType: 1,
        customerName: customerName,
        customerAddress: customerAddress,
        emailAddress: emailAddress,
        phoneNumber: phoneNumber
    };

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "https://proyectorg-api.azurewebsites.net/api/Customer",
        data: JSON.stringify(formData),
        dataType: "json",
        success: function (data) {
            // Procesar la respuesta si es necesario
            // Puedes mostrar un mensaje de éxito o actualizar la lista de clientes, por ejemplo
            $("#CustomerName").val("");
            $("#CustomerAddress").val("");
            $("#EmailAddress").val("");
            $("#PhoneNumber").val("");
            location.reload();
        },
        error: function (error) {
            // Manejar errores si es necesario
            console.log(error);
        }
    });
}

$(document).on('click', 'button[data-customer-id]', function () {
    // Obtén el ID del cliente desde el atributo de datos del botón
    const customerId = parseInt($(this).data('customer-id'));

    // A continuación, puedes llenar los campos del modal de edición
    const customerName = $(this).closest('.card').find('h5').text();
    const customerAddress = $(this).closest('.card').find('.mdi-map + span').text();
    const emailAddress = $(this).closest('.card').find('.mdi-email + span').text();
    const phoneNumber = $(this).closest('.card').find('.mdi-phone + span').text();

    // Asignar los valores obtenidos a los campos del modal
    $('#edit-customerName').val(customerName);
    $('#edit-customerAddress').val(customerAddress);
    $('#edit-EmailAddress').val(emailAddress);
    $('#edit-PhoneNumber').val(phoneNumber);

    // Asignar el valor del cliente ID al atributo data para uso posterior
    $('#save-edit').attr('data-customer-id', customerId);

    // Mostrar el modal de edición
    $('#modal-edit-contact').modal('show');
});

// Manejar el evento "Guardar" en el modal de edición
$('#save-edit').click(function () {
    // Obtener el ID del cliente del atributo data y convertirlo a número entero
    const customerId = parseInt($('#save-edit').data('customer-id'), 10);

    // Obtener los valores de los campos de edición
    var editedCustomerName = $('#edit-customerName').val();
    var editedCustomerAddress = $('#edit-customerAddress').val();
    var editedEmailAddress = $('#edit-EmailAddress').val();
    var editedPhoneNumber = $('#edit-PhoneNumber').val();

    // Expresión regular para validar un número de teléfono de 8 dígitos
    var phoneRegex = /^\d{8}$/;

    // Expresión regular para validar que el nombre no contenga números
    var nameRegex = /^[A-Za-z ]+$/;

    // Validar el formato del correo electrónico
    //var email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


    if (!editedCustomerName.match(nameRegex)) {
        alert('El nombre no puede contener números ni caracteres especiales.');
        return;
    }

    if (!editedPhoneNumber.match(phoneRegex)) {
        alert('El número de teléfono no cumple con el formato correcto (debe contener 8 dígitos numéricos).');
        return;
    }

    if (!employeeemailAddress.match(emailRegex)) {
        alert('El correo debe cumplir con el formato.');
        return;
    }

    // Crea un objeto con los datos editados del cliente
    var editedCustomer = {
        customerID: customerId, // Ajusta el nombre de la propiedad según tu API
        idType: 1,
        customerName: editedCustomerName,
        customerAddress: editedCustomerAddress,
        emailAddress: editedEmailAddress,
        phoneNumber: editedPhoneNumber
    };

    // Realiza una solicitud PUT o PATCH a la API para guardar los cambios
    $.ajax({
        url: `https://proyectorg-api.azurewebsites.net/api/Customer`,
        type: 'PUT',
        contentType: 'application/json', // Configura el tipo de contenido como JSON
        data: JSON.stringify(editedCustomer),
        dataType: "json",
        success: function (data) {
            // Cliente editado exitosamente
            alert('Cliente editado con éxito.');
            // Cierra el modal de edición
            $('#modal-edit-contact').modal('hide');
            location.reload();
        },
        error: function (error) {
            // Ocurrió un error al editar el cliente
            console.error('Error al editar el cliente:', error);
        }
    });
});

function deleteCustomer(customerId) {
    // Realiza una solicitud HTTP DELETE a la API para eliminar el cliente
    $.ajax({
        url: `https://proyectorg-api.azurewebsites.net/api/Customer`,
        type: 'DELETE',
        success: function (data) {
            // Cliente eliminado exitosamente, puedes realizar alguna acción adicional si es necesario
            console.log(`Cliente con ID ${customerId} eliminado.`);
            // Recarga la página para actualizar la lista de clientes (puedes hacerlo de manera más eficiente actualizando la vista sin recargar)
            location.reload();
        },
        error: function (error) {
            // Ocurrió un error al eliminar el cliente
            console.error(`Error al eliminar el cliente con ID ${customerId}: ${error.responseText}`);
        }
    });
}