document.addEventListener("DOMContentLoaded", () => {
    loadDataFromAPI()
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

