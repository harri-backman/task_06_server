import UserController from "../controllers/user.controller.js"


const Routes = ( App ) => {
    App.post( "/user", UserController.CreateUser )
    App.get( "/user", UserController.GetAllUsers )
    App.get( "/user/:userId", UserController.GetUserById )
    App.get( "/searchuser", UserController.GetUserByUsername )
    App.put( "/user/:userId", UserController.UpdateUser )
    App.delete( "/user/:userId", UserController.DeleteUser )
}


export default {
    Routes
}
