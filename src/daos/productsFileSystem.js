import Contenedor from '../contenedor/FileSystemContainer.js';

export default class ProductsFileSystem extends Contenedor {
    constructor() {
        super('productos.json');
    }
}