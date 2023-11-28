//Funcion para el inicio de sesion
// Suponiendo que tienes un formulario con id "loginForm" y campos para nombre de usuario y contraseña
function login() {

    const username = document.getElementById('Username').value;
    const password = document.getElementById('Userpassword').value;

    if (username == "" || password == "") {
        Swal.fire(
            'Digite sus credenciales',
            '',
            'warning'
        )
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

                    Swal.fire(
                        'Credenciales incorrectas',
                        '',
                        'error'
                    )
                }
            })
            
            .catch(error => {
                console.error('Error:', error);
            });
    }
}