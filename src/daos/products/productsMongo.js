import MongoContainer from "../../contenedores/MongoContainer.js";

export default class ProductMongo extends MongoContainer {
    constructor() {
        super(
            'products',
            {
                title: {type: String, require: true},
                code: {type: String, require: true},
                price: {type: Number, require: true},
                thumbnail: {type: String, require: true},
            }
        )
    }
}