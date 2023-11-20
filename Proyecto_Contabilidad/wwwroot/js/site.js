

$(document).ready(function () {
    // Hacer una solicitud HTTP GET a tu API para obtener los datos de los clientes
    /*fetch('https://localhost:7259/api/Customer')
        .then(response => response.json())
        .then(data => {
            const customerCardsContainer = document.getElementById('customer-cards');

            // Iterar sobre los datos de los clientes y crear una tarjeta para cada uno
            data.forEach(customer => {
                const cardHtml = `
                    <div class="col-lg-6 col-xl-4">
                        <div class="card card-default p-4" data-toggle="modall" data-target="#modal-contact" data-customer-id="${customer.customerID}" data-customer-name="${customer.customerName}" data-customer-email="${customer.emailAddress}" data-customer-phone="${customer.phoneNumber}" data-customer-address="${customer.customerAddress}">
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
                                    </ul>
                                </div>
                            </a>
                            <br>
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-edit-contact">Editar</button>
                        </div>
                    </div>
                `;

                // Agregar la tarjeta al contenedor
                customerCardsContainer.innerHTML += cardHtml;
            });
        })
        .catch(error => console.error('Error al cargar los datos de los clientes:', error));


     $('.card[data-toggle="modall"]').click(function () {
        // Obtener los datos del cliente desde la tarjeta
        var customerId = $(this).data('customer-id');
        var customerName = $(this).data('customer-name');
        var emailAddress = $(this).data('customer-email');
        var phoneNumber = $(this).data('customer-phone');
        var customerAddress = $(this).data('customer-address');

        // Actualizar el contenido del modal "Contacto" con los detalles del cliente
        $('#modal-contact #customer-name').text(customerName);
        $('#modal-contact #customer-email-address').text(emailAddress);
        $('#modal-contact #customer-phone-number').text(phoneNumber);
        $('#modal-contact #customer-address').text(customerAddress);
        $('#modal-contact #customer-id').text(customerId);
         

        // También puedes agregar una imagen del perfil del cliente aquí si tienes una URL
        // $('#modal-contact #customer-profile-image').attr('src', customerProfileImageUrl);
     });

    $(document).ready(function () {
        // Función para eliminar un cliente
        function deleteCustomer(customerId) {
            // Realizar una solicitud DELETE a tu API para eliminar el cliente
            $.ajax({
                url: `https://localhost:7259/api/Customer/${customerId}`,
                type: 'DELETE',
                success: function (result) {
                    // La eliminación fue exitosa, puedes realizar acciones adicionales si es necesario
                    // Por ejemplo, actualizar la lista de clientes en la interfaz
                    // Puedes recargar la página o eliminar la tarjeta del cliente eliminado de la vista actual
                    // Aquí solo se recarga la página como ejemplo
                    location.reload();
                },
                error: function (error) {
                    console.error('Error al eliminar el cliente:', error);
                }
            });
        }

        // Controlador de eventos para el botón de eliminación
        $('.btn-delete-customer').click(function () {
            var customerId = $(this).data('customer-id');

            // Mostrar un mensaje de confirmación antes de eliminar
            if (confirm('¿Seguro que deseas eliminar este cliente?')) {
                deleteCustomer(customerId);
            }
        });
    });
   */ 
});
