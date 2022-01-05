import FireBaseContainer from "../../contenedores/FireBaseContainer.js";

export default class CartFireBase extends FireBaseContainer {
    constructor() {
        super('carts')
    }
}