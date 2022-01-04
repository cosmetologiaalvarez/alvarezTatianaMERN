import Contenedor from "../../contenedores/FileSystemContainer.js";

export default class ProductsFileSystem extends Contenedor {
    constructor() {
        super('productos.json');
    }
}