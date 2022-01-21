import Schema from "mongoose";
import MongoContainer from "../../contenedores/MongoContainer.js";

export default class MessageMongo extends MongoContainer {
    constructor() {
        super(
            'messages',
            {
                text: {type: String, require: true},
                user: {
                    type: [{
                        type: Schema.Types.ObjectId,
                        ref: 'users',
                    }],
                    default: null
                },
            },
            {timestamps:true}
        )
    }
}