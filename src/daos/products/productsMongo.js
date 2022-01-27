import MongoContainer from "../../contenedores/MongoContainer.js";

export default class ProductMongo extends MongoContainer {
    constructor() {
        super(
            'products',
            {
                title: {type: String, required: true},
                code: {type: String, required: true},
                price: {type: Number, required: true},
                thumbnail: {type: String, required: true}
            }
        )
    }
}