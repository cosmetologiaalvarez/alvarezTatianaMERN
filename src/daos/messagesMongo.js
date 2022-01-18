import MongoContainer from "../contenedor/MongoContainer.js";

export default class MessagesMongo extends MongoContainer {
    constructor() {
        super(
            'messages',
            {
                user: {type: String, require: true},
                email: {type: String, require: true},
                message: {type: String, require: true},
                timestamps: {type: Date, require: true},
            }
        )
    }
} 