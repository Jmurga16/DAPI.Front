document.addEventListener("DOMContentLoaded", () => {

    loadDataFromAPI();
});

var customerId = 0

function onInit() {
    clearDataModal()
    const customerCardsContainer = document.getElementById('customer-cards');
    customerCardsContainer.innerHTML = "";
    loadDataFromAPI();
}


function loadDataFromAPI() {
    fetch(base_url + '/Customer')
        .then(response => response.json())
        .then(data => {
            const customerCardsContainer = document.getElementById('customer-cards');

            // Iterar sobre los datos de los clientes y crear una tarjeta para cada uno                        
            data.forEach(customer => {
                const cardHtml = `
                                    <div class="col-lg-6 col-xl-4">
                                        <div class="card card-default p-4" data-toggle="modall" data-target="#modal-contact" data-customer-id="${customer.customerId}">
                                            <a href="javascript:0" class="media text-secondary" data-toggle="modal" data-target="#modal-contact">
                                                <div class="media-body">
                                                    
                                                     <div class="d-flex justify-content-between">
                                                        <h5 class="mt-0 mb-2 text-dark">${customer.customerName}</h5>
                                                        <div class="dropdown">
                                                            <a class="dropdown-toggle icon-burger-mini" href="#" role="button" id="dropdownMenuLink"
                                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                                            </a>
                                                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                                                                
                                                                <a class="dropdown-item" data-toggle="modal" data-target="#modal-edit-contact" onclick="setDataModal(${customer.customerId})">Editar</a>
                                                                <a class="dropdown-item" onclick="deleteCustomer(${customer.customerId})" >Eliminar</a>
                                                            </div>
                                                        </div>
                                                    </div>


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
                                                    </ul>
                                                </div>
                                            </a>
                                            <br>

                                        </div>
                                    </div>
                                `;

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

    customerId = 0;

    // Validaciones
    if (!validateFormCustomer()) {
        return;
    }

    // Si todas las validaciones pasan, enviar los datos al servidor
    var formData = {
        IdType: 1,
        CustomerName: customerName,
        CustomerAddress: customerAddress,
        EmailAddress: emailAddress,
        PhoneNumber: phoneNumber,
        Active: true
    };

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: base_url + '/Customer',
        data: JSON.stringify(formData),
        dataType: "json",
        success: function (data) {

            alertSuccess("Cliente creado con exito.")
            onInit();
            $('#modal-add-contact').modal('hide');

        },
        error: function (error) {
            // Manejar errores si es necesario
            console.log(error);
        }
    });
}


function validateFormCustomer() {
    var isValid = true;
    var message = "";
    console.log(customerId)

    if (customerId == 0) {
        var CustomerName = $("#CustomerName").val();
        var CustomerAddress = $("#CustomerAddress").val();
        var EmailAddress = $("#EmailAddress").val();
        var PhoneNumber = $("#PhoneNumber").val();
    }
    else {
        var CustomerName = $("#edit-CustomerName").val();
        var CustomerAddress = $("#edit-CustomerAddress").val();
        var EmailAddress = $("#edit-EmailAddress").val();
        var PhoneNumber = $("#edit-PhoneNumber").val();
    }

    // Validar el formato del correo electrónico
    //var email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Expresión regular para validar un número de teléfono de 8 dígitos
    var phoneRegex = /^\d{8}$/;

    // Expresión regular para validar que el nombre no contenga números
    var nameRegex = /^[A-Za-z ]+$/;

    // Verificar si algún campo está vacío
    if (!CustomerName || !CustomerAddress || !EmailAddress || !PhoneNumber) {
        isValid = false
        message = `Todos los campos son obligatorios. Por favor, complete todos los campos.`
    }
    else if (!CustomerName.match(nameRegex)) {
        isValid = false
        message = 'El nombre no puede contener numeros ni caracteres especiales.'
    }
    else if (!PhoneNumber.match(phoneRegex)) {
        isValid = false
        message = 'El número de teléfono no cumple con el formato correcto (debe contener 8 dígitos numéricos).';
    }
    //else if (!emailAddress.match(emailRegex)) {
    //    isValid = false
    //    message = 'El correo debe cumplir con el formato.';
    //}


    if (!isValid) {
        alertWarning(message)
    }

    return isValid;
}


function setDataModal(id) {
    customerId = id;

    fetch(base_url + '/Customer/' + id)
        .then(response => response.json())
        .then(data => {

            $("#edit-CustomerName").val(data.customerName);
            $("#edit-CustomerAddress").val(data.customerAddress);
            $("#edit-EmailAddress").val(data.emailAddress);
            $("#edit-PhoneNumber").val(data.phoneNumber);

        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });
}

function clearDataModal() {
    accountId = 0;
    $("#CustomerName").val("");
    $("#CustomerAddress").val("");
    $("#EmailAddress").val("");
    $("#PhoneNumber").val("");
}

function editCustomer() {
    // Obtener los valores de los campos
    var customerName = $("#edit-CustomerName").val();
    var customerAddress = $("#edit-CustomerAddress").val();
    var emailAddress = $("#edit-EmailAddress").val();
    var phoneNumber = $("#edit-PhoneNumber").val();

    // Validaciones
    if (!validateFormCustomer()) {
        return;
    }

    // Si todas las validaciones pasan, enviar los datos al servidor
    var formData = {
        CustomerId: customerId,
        IdType: 1,
        CustomerName: customerName,
        CustomerAddress: customerAddress,
        EmailAddress: emailAddress,
        PhoneNumber: phoneNumber,
        Active: true
    };

    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: base_url + '/Customer',
        data: JSON.stringify(formData),
        dataType: "json",
        success: function (data) {

            alertSuccess("Cliente modificado con exito.")
            onInit();
            $('#modal-edit-contact').modal('hide');

        },
        error: function (error) {
            // Manejar errores si es necesario
            console.log(error);
        }
    });
}

function deleteCustomer(id) {
    customerId = id;

    Swal.fire({
        title: `&#191;Desea eliminar el Cliente seleccionado?`,
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
                url: base_url + '/Customer/' + customerId,
                dataType: "json",
                success: function (data) {
                    alertSuccess("Cliente eliminado con exito.")
                    onInit();
                },
                error: function (error) {
                    console.error(error);
                }
            });
        }
    });
}