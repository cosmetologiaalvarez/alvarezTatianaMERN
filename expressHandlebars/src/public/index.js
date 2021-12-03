const socket = io();

socket.on('updateProducts', data => {
    let products = data.payload;
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

