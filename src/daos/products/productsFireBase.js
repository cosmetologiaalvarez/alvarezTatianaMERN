import FireBaseContainer from "../../contenedores/FireBaseContainer.js";

export default class ProductFireBase extends FireBaseContainer {
    constructor() {
        super('products')
    }
}