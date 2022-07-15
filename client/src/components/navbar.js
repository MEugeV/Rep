import React, { useEffect } from "react";
import { connect } from "react-redux";
import {filterNameCharacters,resetCharacters,filterSpeciesCharacters} from "../redux/actions"


function Navbar ({charactersShown,filterNameCharacters,resetCharacters,filterSpeciesCharacters}) { //{filterNameCharacters}

    const [search, setSearch] = React.useState({
        character: "",
        species:""
    })

    function searchB(e) {
        setSearch((search)=> ({...search,[e.target.name]:e.target.value}) ) //(search)=> search=e.target.value
        console.log(search)
        //estoy una letra más atrás, incluso no vuelvo a cero... por eso me pase al boton submit y al reset, hay una clase de mork donde lo hizo diego o hernan pero no la encuentro...
        // function er(search){ filterNameCharacters(search)}
        // er()
        // // filterNameCharacters(search)
        //estoy una letra más atrás, incluso no vuelvo a cero...
    }
    ///se ejecuta despues de cada renderizado
    useEffect(()=>{
        filterNameCharacters(search.character)
    },[search.character])
    
    function submit(e) {
        e.preventDefault()
        console.log(search.species)
        filterSpeciesCharacters(search.species.toLocaleLowerCase())
        e.target.reset()  //limpia el boton
        // setSearch((search)=> search=e.target.value)  //(search)=> search=e.target.value
        document.querySelector("#character").value=""
    }
    function reset(e) {
        e.preventDefault()
        resetCharacters()
    }

    return (
        <div>
            <label htmlFor="character">Busca tu personaje: </label>
            <input onChange={searchB} id="character" name="character" type="text">
            </input>
            <br/>

            <form onSubmit={submit}>
            <label htmlFor="species">Filtra por especie: </label>
            <input onChange={searchB} name="species" type="text"></input>
            <input name="enviar" id="env" value="Submit"  type="submit"/>
            </form>
            <form onSubmit={reset}>
            <input name="resetear" id="reset" value="reset"  type="submit"/>
            </form>
        </div>
    )
}

function mapStateToProps (state) {
    return {charactersShown: state.charactersShown}

}

export default connect (mapStateToProps,{filterNameCharacters,resetCharacters, filterSpeciesCharacters})(Navbar)