import Contenedor from "../contenedor/FileSystemContainer.js";

export default class MessagesFileSystem extends Contenedor {
    constructor() {
        super('messages.json');
    }
} 