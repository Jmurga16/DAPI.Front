//Funcion para el inicio de sesion
// Suponiendo que tienes un formulario con id "loginForm" y campos para nombre de usuario y contraseña
function login() {

    const username = document.getElementById('Username').value;
    const password = document.getElementById('Userpassword').value;

    if (username == "" || password == "") {
        alertWarning(`Digite sus credenciales`)
    }
    else {
        fetch(base_url + '/Login/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    localStorage.setItem("username", username);
                    localStorage.setItem("employeeId", data.employeeId);
                    window.location.href = '/Home/Privacy'; // Redirigir a la página de dashboard después del inicio de sesión
                } else {
                    alertError(`Credenciales incorrectas`)
                }
            })

            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function recoverPassword() {
    const email = document.getElementById('email2').value;

    fetch(base_url + '/Login/recover/' + email, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.result) {
                alertSuccess("Your password is: " + data.password)
            }
            else {
                alertError(`No existe el correo`)
            }
        })

        .catch(error => {
            console.error('Error:', error);
        });
}

function changePassword() {

}