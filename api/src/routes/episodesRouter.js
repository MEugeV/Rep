const {Router} = require("express");
const { sendEpisodes } = require("../controllers/EpisodesControllers");

const episodesRouter=Router()

episodesRouter.get("/", async function (req,res,next) {

    //no necesitas llamarla, se ejecuta solo al levantarse el servidor, y tiene force true, por lo tanto cada vez qeu lo levantas limpia la 
    //base de datos y se encuentra vacía, por lo que no es necesario que sea findOrCreate
    //pero si paso una funcion de find all para recuperar de la base de datos y enviarlo al frotn

    try {
        const episodes= await sendEpisodes()
        res.send(episodes)
    } catch (error){
        res.send(error.message)
    }
})


module.exports=episodesRouter;