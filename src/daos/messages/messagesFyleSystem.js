import Contenedor from "../../contenedores/FileSystemContainer.js";

export default class MessagesFileSystem extends Contenedor {
    constructor() {
        super('messages.json');
    }
}