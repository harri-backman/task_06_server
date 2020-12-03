import Dotenv from "dotenv"


Dotenv.config()

const NotFound = ( req, res, next ) => {
    
    const error = new Error( "Not found! " + req.originalUrl )
    next( error )
}

const ErrorHandler = ( error, req, res, next ) => {

    const StatusCode = res.statusCode === 200 ? 500 : res.statusCode

    res.status( StatusCode )
    res.json({
        statuscode: StatusCode,
        message: error.message,
        stacktrace: process.env.ENVIRONMENT === "PRODUCTION" ? "Not available" : error.stack
    })
}

const IsAuthenticated = ( req ,res, next ) => {

    req.query.admin === "true"
        ? res.send( "Please, continue" )
        : res.send( "You are not allowed to do changes here" )    
    next()
}


export default {
    NotFound,
    ErrorHandler,
    IsAuthenticated
}
