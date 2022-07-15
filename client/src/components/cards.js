import React, { useEffect, useState } from "react";
import Card from "./card";
import styles from "../styles/cards.module.css"
import {connect} from "react-redux"

function Cards ({characters,charactersShown}) {

let charactersPPage= 80
let numbersArray=[]
    
const [pages, setPage] = useState({
    numberPages: charactersShown/charactersPPage,
    page:0
})    


function elegirPagina(e) {
    setPage((pages)=>({...pages, page: e.target.name}))    
}

useEffect (()=>{
    console.log(pages.numberPages)
    setPage((pages)=>({...pages, numberPages: Math.ceil(charactersShown.length/charactersPPage)}))    
    for (let i=1; i<=pages.numberPages+1;i++) {
        numbersArray.push(i)
    }
    console.log(numbersArray)

},[charactersShown]) //,charactersPPage,numbersArray,pages.numberPages


// let id=0
    return(
        <div className={styles.cards}>
            {characters.length> 0 ? (characters.map(el=><Card 
                key={el.id}
                id={el.id}
                image={el.image}
                name={el.name}
                origin={el.origin}
                species={el.species}
                episodes={el.episodes} //.map(el=><div key={id++}>{el.name}</div>)
                />))
                :
                (<h1>No encontramos ese personaje</h1>)}
                {/* <div>
                {(numbersArray.map(pagina=><button onClick={elegirPagina} name={pagina} key={pagina}>{pagina}</button>))}
                </div> */}

        </div>
    )
}

function mapStateToProps (state) {
    return {charactersShown: state.charactersShown}
}

export default connect (mapStateToProps,{})(Cards)

// arra2.map(numero=> (numero.num)).filter(num=>num>3)

// {for(let i=1;i<numberPages;i++) {
//     (<p>{i}</p>)
// } }

// .slice(pages.page-1*10,pages.page*10)