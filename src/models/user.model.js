import Mongoose from "mongoose"


const UserSchema = Mongoose.Schema(
    {
        username: String,
        password: String
    }, { timestamps: true }
)

const UserModel = Mongoose.model( "user", UserSchema )


export default UserModel
