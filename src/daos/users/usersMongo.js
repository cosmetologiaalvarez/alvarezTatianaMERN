import MongoContainer from "../../contenedores/MongoContainer.js";

export default class UserMongo extends MongoContainer {
    constructor() {
        super(
            'users',
            {
                first_name: {
                    type: String,
                    required: true,
                },
                last_name: {
                    type: String,
                    required: true,
                },
                age: {
                    type: Number
                },
                username: {
                    type: String,
                    default: "anonymus",
                    unique: true
                },
                email: {
                    type: String,
                    required: true,
                    unique: true
                },
                password: {
                    type: String,
                    required: true
                }
            },
            {timestamps: true}
        )
    }
}