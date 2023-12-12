document.addEventListener("DOMContentLoaded", () => {
    loadDataFromAPI()
});

var listSeats = []
function onInit() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";
    loadDataFromAPI();
}

function loadDataFromAPI() {

    var customer_id = localStorage.getItem("currentCustomerID");
    
    fetch(base_url + '/Seat')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('tableBody');

            data.forEach(item => {
                if (item.customeR_ID == customer_id) {
                    listSeats.push(item)
                }
            })

            listSeats.forEach(item => {

                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                                            <td>${item.id}</td>
                                            <td>${item.datE_SEAT.slice(0, 10)}</td>
                                            <td>${item.reference}</td>                                          
                                            <td>
                                                <div class="dropdown">
                                                    <a class="dropdown-toggle icon-burger-mini" href="#" role="button" id="dropdownMenuLink"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                                    </a>
                                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                                        <a class="dropdown-item" onclick='goToEdit(${item.id})'>Editar</a>
                                                        <a class="dropdown-item" onclick='deleteSeat(${item.id})'>Eliminar</a>
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
}

function goToEdit(id) {
    window.location.href = 'Details/' + id;
}

function deleteSeat(id) {

    Swal.fire({
        title: `&#191;Desea eliminar el Asiento seleccionado?`,
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
                url: base_url + '/Seat/' + id,
                dataType: "json",
                success: function (data) {
                    alertSuccess("Asiento eliminado con exito.")
                    location.reload();
                },
                error: function (error) {
                    console.error(error);
                }
            });
        }
    });
}