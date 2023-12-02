document.addEventListener("DOMContentLoaded", () => {
    loadDataFromAPI()
});

function loadDataFromAPI() {
    fetch(base_url + '/Employee')
        .then(response => response.json())
        .then(data => {
            const employeeCardsContainer = document.getElementById('employee-cards');

            // Iterar sobre los datos de los colaboradores y crear una tarjeta para cada uno
            data.forEach(employee => {
                const cardHtml = `
                                                    <div class="col-lg-6 col-xl-4">
                                                        <div class="card card-default p-4" data-toggle="modall" data-target="#modal-contact" data-employee-id="${employee.employeeID}">
                                                            <a href="javascript:0" class="media text-secondary" data-toggle="modal" data-target="#modal-contact">
                                                                <div class="media-body">
                                                                    <div class="d-flex justify-content-between">
                                                                        <h5 class="mt-0 mb-2 text-dark">${employee.firstName} ${employee.lastName}</h5>
                                                                        <div class="dropdown">
                                                                            <a class="dropdown-toggle icon-burger-mini" href="#" role="button" id="dropdownMenuLink"
                                                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                                                            </a>
                                                                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                                                                <a class="dropdown-item" data-toggle="modal" data-target="#modal-edit-contact" onclick="setDataModal(${employee.employeeID})" href="#">Editar</a>
                                                                                <a class="dropdown-item" onclick="deleteAccount(${employee.employeeID})" href="#">Eliminar</a>
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
                                                                        <li class="d-flex">
                                                                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-edit-contact" data-employee-id="${employee.employeeID}">
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
                //alert(employee.employeeID);
                // Agregar la tarjeta al contenedor
                employeeCardsContainer.innerHTML += cardHtml;
            });
        })
        .catch(error => console.error('Error al cargar los datos de los colaboradores:', error));
}

