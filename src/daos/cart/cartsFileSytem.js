import Contenedor from "../../contenedores/FileSystemContainer.js";

export default class CartsFileSystem extends Contenedor {
    constructor() {
        super('carrito.json');
    }
}