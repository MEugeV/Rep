const axios = require ("axios")
const {Episode} = require ("../db")

const getEpisodes = async () => {
    //no uso promise.all y demora un monton, debe ser mejor el del profe
    let appi="https://rickandmortyapi.com/api/episode"
        let data= (await axios.get(appi)).data
        let episodesList=data.results
        while( data.info.next !== null) {
            appi=data.info.next
            data= (await axios.get(appi)).data
            episodesList= [...episodesList,...data.results]
        }
        //no es necesaria esta parte, porque el bulkCreate encuentra los campos que necesita y los agrega a la base de datos al coincidir 
        //el nombre y descarta el resto, pero si falta algun id y lo tiene que dejar null y no puede ser null.. llora
        let episodesArr= episodesList.map(el=> ({
            id: el.id,
            name: el.name
        }))
        await Episode.bulkCreate(episodesArr) 
}

const sendEpisodes = async function () {
    const episodes= await Episode.findAll()
    return episodes    
}

const getEpisodesProfe = async () => {
    if(!(await Episode.findAll()).length) {

        const nPages= (await axios.get("https://rickandmortyapi.com/api/episode")).data.info.pages
        const links=[]
    
        for(let i=1; i<=nPages; i++) {
            links.push(`https://rickandmortyapi.com/api/episode?page=${i}`)
        }
    
        const data= await Promise.all(links.map(link=> axios.get(link)))
        
        const episodes = data.map((el)=> el.data.results).flat()
        
        
        await Episode.bulkCreate(episodes) 
    }
}


module.exports= {
    getEpisodes,
    getEpisodesProfe,
    sendEpisodes
}