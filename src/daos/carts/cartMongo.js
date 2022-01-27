import Schema from "mongoose";
import MongoContainer from "../../contenedores/MongoContainer.js";

export default class CartMongo extends MongoContainer {
    constructor() {
        super(
            'carts',
            {
                usuario: {type: String, required: true},
                fecha: {type: String, required: true},
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