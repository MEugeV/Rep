const {Router} = require("express");
const {getAppiCharacters, postCharacter, getDBCharacters, detailCharacter}= require ("../controllers/CharactersControllers")

const charactersRouter=Router()



// charactersRouter.get("/:species", async function (req,res,next) {
//     const {species}= req.params
//     try {
//         const speciesFiltered= characters.filter(character=>character.species.includes(species))
//         console.log(speciesFiltered+" filtramos species")
//         res.send(speciesFiltered)
        
//     } catch (error) {

//         next(error)
//     }

//         //     try {
//     //     } catch (error){
//     //         res.send(error.message)
//     //     }



// })

charactersRouter.get("/:id", async function (req,res,next) {
    const {id}= req.params
    try {
        res.send(await detailCharacter(id))
        console.log(" Buscamos detail id")
        
    } catch (error) {

        next(error)
    }

        //     try {
    //         console.log(characters+"filtramos")
    //         characters.filter(character=>character.species.includes(species))
    //         res.send(characters)
    //     } catch (error){
    //         res.send(error.message)
    //     }



})

let appiCharacters =""
let characters=""
charactersRouter.get("/", async function (req, res, next) {
 //para que no me busque los personajes de la appi si ya los trajo, que actualice solo los de la base de datos
    
    const {species}=req.query
    if(!species) {
        if(!appiCharacters) {
            console.log("no hay" +characters)
            try {
            appiCharacters = await getAppiCharacters()
            const dBCharacters = await getDBCharacters()
            characters=[...appiCharacters,...dBCharacters]
            res.send(characters) //characters
    
        } catch(error) {
            res.send(error.message)
        }
    } else {
        console.log(characters+"si hay")
        try {
                const dBCharacters = await getDBCharacters()
                characters=[...appiCharacters,...dBCharacters]
                res.send(characters) //characters
        
            } catch(error) {
                res.send(error.message)
            }        
        }
    } else {
        try {
            console.log(characters+"filtramos")
            const characterSpecies= characters.filter(character=>character.species.toLowerCase().includes(species))
            res.send(characterSpecies)
        } catch (error){
            res.send(error.message)
        }

    }
})

charactersRouter.post("/", async function (req, res, next){
    const {name, species, origin, image, episodes} = req.body
    try {
        const character= await postCharacter(name, species, origin, image, episodes)
        res.send(character)
    } catch(error) {
        res.send(error.message)
    }
})


module.exports= charactersRouter;