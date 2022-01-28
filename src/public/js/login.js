let form = document.getElementById('logIn');

function initLogIn() {
    let info = new FormData(form);
    let logInObj = {
        email: info.get('email'),
        password: info.get('password')
    }
    fetch('/login',{
        method:"POST",
        body:JSON.stringify(logInObj),
        headers: {
            'Content-Type':'application/json'
        }
    }).then(result => result.json()).then(json => {
        if (json.status == 200) {
            location.replace('../index.html')
        } else {
            alert("No hay un usuario registrado con los datos ingresados")
        }
    })
}

function  initLogInFacebook() {
    location = 'http://localhost:8080/auth/facebook';
    console.log('hola')
}