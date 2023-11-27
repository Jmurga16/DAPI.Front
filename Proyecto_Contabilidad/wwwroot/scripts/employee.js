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
                                                                    <h5 class="mt-0 mb-2 text-dark">${employee.employeeName}</h5>
                                                                    <ul class="list-unstyled text-smoke text-smoke">
                                                                        <li class="d-flex">
                                                                            <i class="mdi mdi-map mr-1"></i>
                                                                            <span>${employee.employeeLastname}</span>
                                                                        </li>
                                                                        <li class="d-flex">
                                                                        <i class="mdi mdi-map mr-1"></i>
                                                                       <span>${employee.employeeUsername}</span>
                                                                        </li>
                                                                        <li class="d-flex">
                                                                            <i class="mdi mdi-email mr-1"></i>
                                                                            <span>${employee.emailAddress}</span>
                                                                        </li>
                                                                        <li class="d-flex">
                                                                            <i class="mdi mdi-phone mr-1"></i>
                                                                            <span>${employee.password}</span>
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

