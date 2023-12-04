document.addEventListener("DOMContentLoaded", () => {
    loadDataFromAPI()
});


var employeeId = 0

function onInit() {
    clearDataModal()
    const employeeCardsContainer = document.getElementById('employee-cards');
    employeeCardsContainer.innerHTML = "";
    loadDataFromAPI();
}


function loadDataFromAPI() {
    fetch(base_url + '/Employee')
        .then(response => response.json())
        .then(data => {
            const employeeCardsContainer = document.getElementById('employee-cards');

            /*<a class="dropdown-item" data - toggle="modal" data - target="#modal-edit-contact" onclick = "setDataModal(${employee.employeeID})" href = "#" > Editar</a >*/
            console.log(data)
            // Iterar sobre los datos de los colaboradores y crear una tarjeta para cada uno
            data.forEach(employee => {
                const cardHtml = `
                                                    <div class="col-lg-6 col-xl-4">
                                                        <div class="card card-default p-4" data-toggle="modall" data-target="#modal-contact" data-employee-id="${employee.employeeId}">
                                                            <a href="javascript:0" class="media text-secondary" data-toggle="modal" data-target="#modal-contact">
                                                                <div class="media-body">
                                                                    <div class="d-flex justify-content-between">
                                                                        <h5 class="mt-0 mb-2 text-dark">${employee.firstName} ${employee.lastName}</h5>
                                                                        <div class="dropdown">
                                                                            <a class="dropdown-toggle icon-burger-mini" href="#" role="button" id="dropdownMenuLink"
                                                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                                                            </a>
                                                                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                                                                
                                                                                <a class="dropdown-item" data-toggle="modal" data-target="#modal-edit-contact" onclick="setDataModal(${employee.employeeId})">Editar</a>
                                                                                <a class="dropdown-item" onclick="deleteEmployee(${employee.employeeId})" href="#">Eliminar</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <ul class="list-unstyled text-smoke text-smoke">
                                                            
                                                                        <li class="d-flex">
                                                                            <i class="mdi mdi-account mr-1"></i>
                                                                            <span>${employee.username}</span>
                                                                        </li>
                                                                        <li class="d-flex">
                                                                            <i class="mdi mdi-email mr-1"></i>
                                                                            <span>${employee.emailAddress}</span>
                                                                        </li>                                                                        
                                                                        <li class="d-flex">
                                                                        <i class="mdi mdi-id mr-1"></i>
                                                                        <span style="opacity: 0;">${employee.employeeID}</span>
                                                                        </li>                                                                        
                                                                    </ul>
                                                                </div>
                                                            </a>
                                                            <br>

                                                        </div>
                                                    </div>
                                                `;

                // Agregar la tarjeta al contenedor
                employeeCardsContainer.innerHTML += cardHtml;
            });
        })
        .catch(error => console.error('Error al cargar los datos de los colaboradores:', error));
}

function addemployee() {

    // Obtener los valores de los campos
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var username = $("#username").val();
    var emailAddress = $("#emailAddress").val();
    var password = $("#password").val();

    employeeId = 0;

    // Validaciones
    if (!validateFormEmployee()) {
        return;
    }

    // Si todas las validaciones pasan, enviar los datos al servidor
    var formData = {
        EmployeeId: employeeId,
        FirstName: firstName,
        LastName: lastName,
        Username: username,
        EmailAddress: emailAddress,
        Password: password,
        Active: true,
    };

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: base_url + '/Employee',
        data: JSON.stringify(formData),
        dataType: "json",
        success: function (data) {
            
            alertSuccess("Colaborador creado con exito.")
            onInit();
            $('#modal-add-contact').modal('hide');
        },
        error: function (error) {
            // Manejar errores si es necesario
            console.log(error);
        }
    });
}

function validateFormEmployee() {
    var isValid = true;
    var message = "";

    if (employeeId == 0) {
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var username = $("#username").val();
        var emailAddress = $("#emailAddress").val();
        var password = $("#password").val();
    }
    else {
        var firstName = $("#edit-firstName").val();
        var lastName = $("#edit-lastName").val();
        var username = $("#edit-username").val();
        var emailAddress = $("#edit-emailAddress").val();
        var password = $("#edit-password").val();
    }

   
    // Validar el formato del correo electrónico
    //var email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Expresión regular para validar un número de teléfono de 8 dígitos
    var phoneRegex = /^\d{8}$/;

    // Expresión regular para validar que el nombre no contenga números
    var nameRegex = /^[A-Za-z ]+$/;

    // Verificar si algún campo está vacío
    if (firstName === "" || lastName === "" || username === "" || emailAddress === "" || password == "") {
        isValid = false
        message = `Todos los campos son obligatorios. Por favor, complete todos los campos.`
    }
    else if (!firstName.match(nameRegex)) {
        isValid = false
        message = 'El nombre no puede contener numeros ni caracteres especiales.'
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
    employeeId = id;

    fetch(base_url + '/Employee/' + id)
        .then(response => response.json())
        .then(data => {

            $("#edit-firstName").val(data.firstName);
            $("#edit-lastName").val(data.lastName);
            $("#edit-username").val(data.username);
            $("#edit-emailAddress").val(data.emailAddress);
            $("#edit-password").val(data.password);

        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });
}

function clearDataModal() {
    accountId = 0;
    $("#firstName").val("");
    $("#lastName").val("");
    $("#username").val("");
    $("#emailAddress").val("");
    $("#password").val("");
}

function editEmployee() {
    // Obtener los valores de los campos
    var firstName = $("#edit-firstName").val();
    var lastName = $("#edit-lastName").val();
    var username = $("#edit-username").val();
    var emailAddress = $("#edit-emailAddress").val();
    var password = $("#edit-password").val();

    // Validaciones
    if (!validateFormEmployee()) {
        return;
    }

    // Si todas las validaciones pasan, enviar los datos al servidor
    var formData = {
        EmployeeId: employeeId,
        FirstName: firstName,
        LastName: lastName,
        Username: username,
        EmailAddress: emailAddress,
        Password: password,
        Active: true,
    };

    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: base_url + '/Employee',
        data: JSON.stringify(formData),
        dataType: "json",
        success: function (data) {

            alertSuccess("Colaborador modificado con exito.")
            onInit();
            $('#modal-edit-contact').modal('hide');

        },
        error: function (error) {
            // Manejar errores si es necesario
            console.log(error);
        }
    });
}

function deleteEmployee(id) {

    employeeID = id;

    Swal.fire({
        title: `&#191;Desea eliminar el Colaborador seleccionado?`,
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
                url: base_url + '/Employee/' + employeeID,
                dataType: "json",
                success: function (data) {
                    location.reload();
                },
                error: function (error) {
                    console.error(error);
                }
            });
        }
    });


}