const socket = io();

socket.on('updateProducts', data => {
    let products = data;
    fetch('templates/productTable.handlebars').then(string=>string.text()).then(template => {
        const processedTemplate = Handlebars.compile(template);
        const productsObject = {
            products:products
        }
        const html = processedTemplate(productsObject);
        let table = document.getElementById('productTable');
        table.innerHTML = html;
    })
})

let input = document.getElementById('sendMessage');
let user = document.getElementById('username');
let email = document.getElementById('email');
input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        if (email.value == '' | input.value == '') {
            alert('Debe ingresar el mail y el mensaje que desea enviar');
        } else {
            let newDate = new Date();
            date = `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
            socket.emit('message', {user: user.value, emai: email.value, message: e.target.value, date});
            input.value = '';
        }
    }
})

socket.on('messageLog', data => {
    let msg = document.getElementById('messagesTable');
    let dataLog = data.map(message => {
        return `<span style="display:flex"><p style="color:blue">${message.emai}</p><p style="color:brown">[${message.date}] :</p><p style="color:green"> ${message.message}</p></span>`;
    }).join(' ');
    msg.innerHTML = dataLog;
})

document.addEventListener('submit', event => {
    event.preventDefault();
    let form = document.querySelector('#productForm');
    let data = {
        "title": document.getElementById("title").value,
        "price": document.getElementById("price").value,
        "thumbnail": document.getElementById("thumbnail").value
    };
    
    fetch('http://localhost:8080/api/productos', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(result => {
        return result.json();
    }).then( json => {
        console.log(json)
    }).then( result => {
        location.href = "/";
    })
})

