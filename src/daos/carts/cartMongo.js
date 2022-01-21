import Schema from "mongoose";
import MongoContainer from "../../contenedores/MongoContainer.js";

export default class CartMongo extends MongoContainer {
    constructor() {
        super(
            'carts',
            {
                usuario: {type: String, require: true},
                fecha: {type: String, require: true},
                products: {
                    type: [{
                        type: Schema.Types.ObjectId,
                        ref: 'products',
                    }],
                    default: null
                },
            },
            {timestamps:true}
        )
    }
}