const { Router } = require("express");
// const { Character, Episode } = require("../db");
// const axios = require ("axios")
const charactersRouter= require ("./charactersRouter")
const episodesRouter= require ("./episodesRouter")

const router = Router();

// Configurar los routers
router.use("/characters", charactersRouter)
router.use("/episodes", episodesRouter)


module.exports = router;



// //prueba para ver si podia traer tambien los nombres de los episodios al traer los caracters
// router.get("/charepis", async function (req, res, next) {
//     try{
//         const appi= (await axios ("https://rickandmortyapi.com/api/character")).data.results[0].episode
//         console.log(appi)
//         // const episodes= (await axios("https://rickandmortyapi.com/api/episode/1")).data.name
//         // const episodes=(await axios (appi)).data.name
//         const episodesPromise= await Promise.all(appi.map(el=>((axios(el)).then((rta)=>rta.data.name)))) //.data.name
//         // const episodesPromise3= await Promise.all(appi.map(async (el)=>await ((axios(el)).then((rta)=>rta.data.name)))) //.data.name
//         // const episodesPromise4= appi.map(async (el)=>await ((axios(el)).data.name)) //.data.name
//         // const episodesPromise2=  appi.map( async (el)=> {return (await axios(el)).data.name})//.data.name
//         // const episodes= await Promise.all(episodesPromise)
//         res.send(episodesPromise) //episodes //appi

//     } catch(error) {
//         res.send(error.message)
//     }
// })

// router.get("/episodes", async function (req, res, next) {
    
// }
// )

// router.post("/character", async function (req, res, next) {
//     try {
//     } catch (error) {
//         console.log(error.message)
//         res.send(error.message)
//     }
// }
// )
