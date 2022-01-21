let form = document.getElementById('logIn');

function initLogIn() {debugger;
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
        location.replace('./index.html')
    })
}