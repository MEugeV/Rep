const {Character, Episode}= require ("../db")
const axios = require ("axios")

const getAppiCharacters = async function () {

    const links=[]
    const nPages= (await axios.get("https://rickandmortyapi.com/api/character")).data.info.pages
    for(let i=1; i<=nPages; i++) {
        links.push(`https://rickandmortyapi.com/api/character?page=${i}`)
    }
    const data= await Promise.all(links.map(link=> axios.get(link)))
    const list = data.map((el)=> el.data.results).flat()

    
    const promisePersonajes= list.map( async (character)=>  {  ///ESTE ASYNC ES EL QUE ME HACE RETORNAR UN ARRAY DE OBJETOS VACIOS... porque toda funcion async devuelve una promesa y me faltaba resolverlas...

        // //CAMINO PROFE
        // const episodeNameId= await character.episode.map(async episode=> {
        //     let idEpisode= episode.split("/").pop()
        //     let episodeNameIds= (await Episode.findByPk(idEpisode)).toJSON() //.dataValues /undefined/ //JSON.parse() /null/ 
        //     return episodeNameIds
        // })
        // const episodesI= await Promise.all(episodeNameId)

        const episodesName = await Promise.all(character.episode.map(episode=>((axios(episode)).then((rta)=>({id:rta.data.id,name:rta.data.name})))))
       
        return {
            id: character.id,
            name: character.name,
            species: character.species,
            origin: character.origin.name,
            image: character.image,
            created: character.created,
            episodes: episodesName,
            // //también funciona...
            // episodes: await Promise.all(character.episode.map(episode=>((axios(episode)).then((rta)=>({id:rta.data.id,name:rta.data.name}))))),   
        }
        }
    )
    let characters= await Promise.all(promisePersonajes) //este era el tema que faltaba en ambos caminos, la funcion async retorna una promesa
    
    return characters

}



const getDBCharacters = async function () {
    const characters=await Character.findAll({
        include: [{
        model:Episode,
        attributes: ["name","id"],
        through: {attributes:[]} //ESTA LINEA MANEJA LA TABLA INTERMEDIA...si lo saco y dejo atributos name solo elimina el id, pero no la info de la tabla de relaciones
    }],
        attributes: {exclude: ["created"]}}) //si no pongo atributes me trae todo desde antes de data value, si hago raw true me hace un txt.
    return characters
}

  
const postCharacter = async function (name, species, origin, image,episodes) {


    const character= await Character.create({name, species, origin, image})

    await character.setEpisodes(episodes)  

    return character
}

const detailCharacter= async function (id) {

   if(isNaN(id)) {
    const character=await Character.findByPk(
        id, {
            include: [{
                model: Episode, 
                attributes: ["name","id"], 
                through:{attributes:[]}}]
        }
        ) 
        return character
   } else {
        const character = (await (axios.get(`https://rickandmortyapi.com/api/character/${id}`))).data
        const episodes= await Promise.all(character.episode.map((episode)=> ((axios.get(episode)).then((rta)=>({id:rta.data.id,name:rta.data.name})))))
        // // const episodesName = await Promise.all(character.episode.map(episode=>((axios(episode)).then((rta)=>({id:rta.data.id,name:rta.data.name})))))

        const characterFound=  {
            id: character.id,
            name: character.name,
            species: character.species,
            origin: character.origin.name,
            image: character.image,
            created: character.created,
            episodes: episodes,                
        }
        console.log(characterFound)
        return characterFound
   } 


}

module.exports={
    getAppiCharacters,
    getDBCharacters,
    postCharacter,
    detailCharacter
}

