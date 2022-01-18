import Contenedor from '../contenedor/FileSystemContainer.js';

export default class CartsFileSystem extends Contenedor {
    constructor() {
        super('carrito.json');
    }
}