import React from "react";
import { Link, useNavigate } from "react-router-dom"; //, useHistory ///VERSION 6!!!
import { useState } from "react";
import { connect } from "react-redux";
import {postCharacter} from "../redux/actions"

function Form ({episodes}) {

const [character, setCharacter] = useState({
    name:"",
    origin:"",
    species:"",
    image:"",
    episodes: []
})    


function handleChange (e) {
    setCharacter((character) => ({
        ...character,
        [e.target.name] : e.target.value
    })
    )
    console.log(character)
}


function handleChangeEpisodes (e) {
    const selected= Array.from(document.getElementsByName('episodes')).filter(input => input.checked).map(input => input.value)
    setCharacter((character) => ({
        ...character,
        [e.target.name] : selected
    })
    )
    console.log(character)
}

const navigate = useNavigate();
// let history= useHistory()  ///VERSION 6!!!
function handleSubmit (e) {
    e.preventDefault()
    // const episodesarr= Array.from(document.getElementsByName('epis')).filter(input => input.checked).map(input => input.value)
    // setCharacter((character) => ({
    //     ...character,
    //     [episodes] : Array.from(document.getElementsByName('epis')).filter(input => input.checked).map(input => input.value)
    // })
    // )
    postCharacter(character)
    // console.log(episodesarr)
    console.log({post:character})
    // history.push("/") ///VERSION 6!!!
    navigate("/")

}
    let id=0
    return(
        <React.Fragment>
            <Link to="/">Home</Link>
            <div>
                <h1>Create your character!!</h1>
                <form onSubmit={handleSubmit}>
                    <label  htmlFor="name">Character name: </label>
                    <input type="text" onChange={handleChange} name="name" value={character.name} ></input>
                    <br/>
                    <label  htmlFor="origin">Character origin: </label>
                    <input type="text" onChange={handleChange} name="origin" value={character.origin} ></input>
                    <br/>
                    <label  htmlFor="species">Character specie: </label>
                    <input type="text" onChange={handleChange} name="species" value={character.species} ></input>
                    <br/>
                    <label  htmlFor="image">Character image: </label>
                    <input type="text" onChange={handleChange} name="image" value={character.image} ></input>
                    <br/>
                    {/* <label  htmlFor="episodes">Character episodes: </label> */}
                    {/* <input type="select" onChange={handleChange} name="episodes" value={character.episodes} ></input> */}

                    {/* No me gusta porque tengo que apretar control
                    <p name="episodes">
                        <label htmlFor="episodes">Selecciona los episodios en los que actuó: </label>
                        <select multiple name="episodes" id="episodes">
                            {episodes.map(el=>(<option id={id++}>{el.name}</option>))}
                        </select>
                    </p> */}

                    <div name="episodes">
                        <label htmlFor="episodes">Selecciona los episodios en los que actuó: </label> 
                             {episodes.map(el=>(<p><input onChange={handleChangeEpisodes} key={el.id} type="checkbox" name="episodes" value={el.id}/>{el.name}</p>))}
                    </div>

                    <br/>
                    <input type="submit"></input>
                </form>            
            </div>
        </React.Fragment>
    )
}

function mapStateToProps (state) {
    return {episodes: state.episodes}
}

export default connect(mapStateToProps, {postCharacter})(Form)
/*
//una ya seleccionada
<select name="transporte">

<option>Coche</option>

<option>Avión</option>

<option selected>Tren</option>

</select>

//asignar un valor a cada una
<select name="transporte">

<option value="1">Coche</option>

<option value="2">Avión</option>

<option value="3">Tren</option>

</select>

//radio
<input type="radio" name="transporte" value="1">Coche

<br>

<input type="radio" name="transporte" value="2">Avión

<br>

<input type="radio" name="transporte" value="3">Tren

así como las listas de botones tipo “radio” sólo permitiían elegir una opción (siempre y cuando los nombres de las opciones fueran los mismos), las listas de cajas permiten seleccionar una o varias opciones.

<input type="checkbox" name="transporte" value="1">Coche

<br>

<input type="checkbox" name="transporte" value="2" checked>Avión

<br>

<input type="checkbox" name="transporte" value="3">Tren
*/