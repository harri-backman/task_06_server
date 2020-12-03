import Mongoose from "mongoose"
import Dotenv from "dotenv"


Dotenv.config()

const ConnectToDatabase = async () => {

    const DB_URL = process.env.LOCAL_URL

    try {
        await Mongoose.connect( DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        console.log( "Successfully connected to dataBase" )
    } catch ( error ) {
        console.log( "Error connecting to DataBase: ", error )
        process.exit()
    }
}

/*
    Mongoose.connect( "mongodb://localhost:27017/tutorialdatabase", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log( "Successfully connected to dataBase" ))
        .catch(( error ) => {
            console.log( "Error connecting to DataBase: ", error )
            process.exit()
        })
    }
*/

const ConnectToPort = ( App ) => {

    const Port = process.env.LOCAL_PORT

    App.listen( Port, () => {
        console.log( "Server is running on port " + ( Port ) )
    })    
}


export default {
    ConnectToDatabase,
    ConnectToPort
}
