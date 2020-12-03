import Express from "express"
import Helmet from "helmet"
import Morgan from "morgan"
import BodyParser from "body-parser"
import Middlewares from "./src/middlewares/middlewares.js"
import Configurations from "./configurations/configurations.js"
import UserRoutes from "./src/routes/user.routes.js"

import Cors from "cors"

const App = Express()
App.use( BodyParser.urlencoded({ extended: true }))
App.use( BodyParser.json() )
App.use( Helmet() )
App.use( Morgan( "common" ))

App.use( Cors() )

/*
App.use( ( req, res, next ) => {
    res.header( "Access-Control-Allow-Origin", "*" )
    res.header( "Access-Control-Allow-Headers", "*" )
    if ( req.method === "OPTIONS" ) {
        res.header( "Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE" )
        return res.status( 200 ).json({})
    }
    next()
})
*/

//const Port = process.env.PORT

// Run on server side only
App.get( "/report", ( req, res ) => {
    res.send( "Period: 01.01.2020-31.01.2020" )
})

// Run on server side only
App.get( "/data", Middlewares.IsAuthenticated, (req, res) => {})


UserRoutes.Routes( App )

/*App.use( Middlewares.NotFound )*/
App.use( Middlewares.ErrorHandler )

Configurations.ConnectToDatabase()

Configurations.ConnectToPort( App )


export default App
