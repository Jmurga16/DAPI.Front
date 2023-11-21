document.addEventListener("DOMContentLoaded", () => {
    loadDataFromAPI()
});

function loadDataFromAPI() {

    fetch(base_url + '/Seat')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('tableBody');

            data.forEach(item => {

                date_seat = new Date(item.datE_SEAT)

                let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date_seat);
                let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date_seat);
                let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date_seat);

                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                                            <td>${item.id}</td>
                                            <td>${day}/${month}/${year}</td>
                                            <td>${item.reference}</td>                                          
                                            <td>
                                                <div class="dropdown">
                                                    <a class="dropdown-toggle icon-burger-mini" href="#" role="button" id="dropdownMenuLink"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                                    </a>
                                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                                        <a class="dropdown-item" data-toggle="modal" data-target="#modal-edit-contact" href="#">Editar</a>
                                                        <a class="dropdown-item" href="#">Eliminar</a>
                                                    </div>
                                                </div>
                                            </td>
                                        `;

                tableBody.appendChild(newRow);
            });
        })
        .catch(error => {
            console.error('Error al cargar datos desde la API:', error);
        });

    //let table = new DataTable('#productsTable');
    //console.log(table)
}


function addAccount() {
    // Obtener los valores de los campos
    var AccountId = $("#accountId").val();
    var AccountCode = $("#accountCode").val();
    var NameAccount = $("#nameAccount").val();
    var TypeAccount = $("#typeAccount").val();
    var conversionValue = $("#conversion").val();

    // Verificar si algún campo está vacío
    if (AccountCode === "" || NameAccount === "" || TypeAccount === "" || conversionValue === "") {
        alert("Todos los campos son obligatorios. Por favor, complete todos los campos.");
        return; // Detener la ejecución si hay campos vacíos
    }

    // Si todas las validaciones pasan, enviar los datos al servidor
    var formData = {
        accountId: AccountId,
        accountName: NameAccount,
        accountCode: AccountCode,
        accountType: TypeAccount,
        conversion: conversionValue
    };


    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: base_url + '/Account',
        data: JSON.stringify(formData),
        dataType: "json",
        success: function (data) {
            // Procesar la respuesta si es necesario
            // Puedes mostrar un mensaje de éxito o actualizar la lista de clientes, por ejemplo
            $("#accountId").val("");
            $("#nameAccount").val("");
            $("#accountCode").val("");
            $("#typeAccount").val("");
            $("#conversion").val("");
            location.reload();
        },
        error: function (error) {
            // Manejar errores si es necesario
            console.log(error);
        }
    });
}
