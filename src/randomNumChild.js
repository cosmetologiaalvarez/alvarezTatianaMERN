function generateMap (numero=100000000) {
    let values = new Map()
    
    for (let i = 0; i < numero; i++) {
        let num = Math.floor((Math.random() * 1000) + 1)
        let exist = values.get(num)
        if (exist) {
            values.set(num, exist+1)
        } else {
            values.set(num, 1)
        }
    }
    return values
}

process.on('message', ({numero}) => {
    let response = generateMap(numero)
    let result =  Object.fromEntries(response)
    setInterval(() => {
        process.send(result) 
        process.exit()
    }, 2000)
})
