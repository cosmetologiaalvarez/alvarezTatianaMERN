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
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(result => {
        return result.json();
    }).then( json => {
        console.log(json)
    })
})

