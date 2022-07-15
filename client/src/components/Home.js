import React, { useEffect } from "react";
import Cards from "./cards";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCharacters, getEpisodes} from "../redux/actions"
import Navbar from "./navbar";

function Home ({getCharacters, characters, getEpisodes,charactersShown}) {

useEffect(()=>{
    getCharacters()
    getEpisodes()
},[getCharacters,getEpisodes])

    return(
        <div>
            <Link to="/form">Form</Link>
            <div>Home
            </div>
            <Navbar/>
            {characters.length>0? (<Cards characters={charactersShown}/>) : (<h1>Loading...</h1>)}
        </div>
    )
}

function mapStateToProps(state) {
    return { characters: state.characters, episodes: state.episodes, charactersShown: state.charactersShown}
}

export default connect(mapStateToProps, {getEpisodes, getCharacters})(Home)