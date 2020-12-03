import UserModel from "../models/user.model.js"
import StatusCodes from "../../configurations/StatusCodes.js"


const CreateUser = async ( req, res ) => {

    const User = new UserModel ({
        username: req.body.username,
        password: req.body.password
    })

    try {
        const Response = await User.save()
        res.status( StatusCodes.CREATED ).send( Response )
    } catch ( error ) {
        res.status( StatusCodes.INTERNAL_SERVER_ERROR ).send({ 
            message: error.message 
        })
    }
}

const GetAllUsers = async ( req, res ) => {

    try {
        const Response = await UserModel.find()
        res.status( StatusCodes.OK ).send( Response )
    } catch ( error ) {
        res.status( StatusCodes.INTERNAL_SERVER_ERROR ).send({ 
            message: error.message 
        })
    }
}

const GetUserById = async ( req, res ) => {

    try {
        const Response = await UserModel.findById( req.params.userId )
        res.status( StatusCodes.OK ).send( Response )
    } catch ( error ) {
        res.status( StatusCodes.INTERNAL_SERVER_ERROR ).send ({
            message: "Error GetUserById: " + req.params.userId,
            error: error.message
        })
    }
}

const GetUserByUsername = async ( req, res )=> {

    try {
        const Response = await UserModel.find({ username: req.query.username })
        Response.length !== 0
        ? res.status( StatusCodes.OK ).send( Response )
        : res.status( StatusCodes.NOT_FOUND ).send({
            message: "Missing user: " + req.query.username
        })

    } catch ( error ) {
        res.status( StatusCodes.INTERNAL_SERVER_ERROR ).send({
            message: "Error GetUserByUsernameQuery: " + req.query.username,
            error: error.message
        })
    }
}

const UpdateUser = async ( req, res ) => {
    try {
        if ( !req.body ) {
            return res.status( StatusCodes.BAD_REQUEST ).send({ 
                    message: "Missing update value"
                })
        }
        const Response = await UserModel.findByIdAndUpdate( req.params.userId, {
            username: req.body.username,
            password: req.body.password
        }, { new: true })
        res.status( StatusCodes.OK ).send( Response )
    } catch ( error ) {
        res.stastus( StatusCodes.INTERNAL_SERVER_ERROR ).send({
            message: "Error UpdateUser: " + req.param.userId,
            error: error.message
        })
    }
}

const DeleteUser = async ( req, res ) => {
    
    try {
        const Response = await UserModel.findByIdAndDelete( req.params.userId )
        res.status( StatusCodes.OK ).send({
            message: "Successfully deleted user: " + ( Response.username ) 
                + " and ID: " + req.params.userId
        })
    } catch ( error ) {
        res.status( StatusCodes.INTERNAL_SERVER_ERROR ).send({
            message: "Error deleting user ID: " + req.params.userId,
            error: error.message
        })
    }
}
export default {
    CreateUser,
    GetAllUsers,
    GetUserById,
    GetUserByUsername,
    UpdateUser,
    DeleteUser
}
