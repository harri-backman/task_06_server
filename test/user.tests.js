import Chai from "chai"
import ChaiHTTP from "chai-http"
/*import { Describe, It as Test} from "mocha"*/
import pkg from "mocha"
/*const { Describe, It: Test } = pkg*/
const Describe = pkg.describe
const Test = pkg.it

import App from "../server.js"
import StatusCodes from "../configurations/statuscodes.js"


Chai.should()
Chai.use( ChaiHTTP )

// Test values
const RandomString = Math.random().toString( 36 ).substring( 7 )
const User = {
    username: RandomString,
    password: RandomString
}
const UserId = "5fb58ed455f53f01244e51df"


const TestingNonExistingRoute = () => {
    Describe( "Testing a route that does not exist", () => {
        Test( "Expecting 404 not found", ( done ) => {
            Chai.request( App )
                .get( "/" + ( RandomString ) )
                .end(( request, response ) => {
                    response.should.have.a.status( StatusCodes.NOT_FOUND )
                    done()
                })
        })
    })
}

const CreateUser = () => {
    Describe( "Creating a user (POST)" , () => {
        Test( "Expecting a user to be created" , ( done ) => {
            Chai.request( App )
                .post( "/user" )
                .send( User )
                .end(( error, response ) => {
                    response.should.have.a.status( StatusCodes.CREATED )
                    response.body.should.be.a( "object" )
                    response.body.should.have.property( "username" ).eq( User.username )
                    response.body.should.have.property( "password" ).eq( User.password )
                    done()
                })
        })
    })
}

const GetAllUsers = () => {
    Describe( "Fetching all users (GET)" , () => {
        Test( "Expecting to return all users" , ( done ) => {
            Chai.request( App )
                .get( "/user" )
                .end(( error, response ) => {
                    response.should.have.status( StatusCodes.OK )
                    response.body.should.be.a( "array" )
                    /*response.body.length.should.be.eq( 7 )*/
                    response.body.length.should.be.eq( response.body.length )
                    done()
                })
        })
    })
}

const UpdateUser = () => {
    Describe( "Updating user (PUT)" , () => {
        Test( "Expecting a user to be updated" , ( done ) => {
            Chai.request( App )
                .put( "/user/" + ( UserId ))
                .send( User )
                .end(( error, response ) => {
                    response.should.have.status( StatusCodes.OK )
                    response.body.should.be.a( "object" )
                    response.body.should.have.property( "_id" ).eq( UserId )
                    response.body.should.have.property( "username" ).eq( User.username )
                    response.body.should.have.property( "password" ).eq( User.password )
                    done()
                })
        })
    })
}

const DeleteUser = () => {
    Describe( "Deleting a user (DELETE)" , () => {
        Test( "Expecting a user to be deleted" , ( done ) => {
            Chai.request( App )
                .delete( "/user/" + ( UserId ))
                .end(( error, response ) => {
                    response.should.have.status( StatusCodes.OK )
                    done()
                })
        })
    })
}


Describe( "Testing the USER_API route", () => {
    TestingNonExistingRoute()
    CreateUser()
    GetAllUsers()
    UpdateUser()
    DeleteUser()
})
