import React from "react";
import {Link} from "react-router-dom"
import styles from "../styles/card.module.css"

export default function Card ({image,name,origin,species,episodes,id}) {
const [state,setState] = React.useState(false)
function click () {
    setState((state)=> !state)
    console.log(state)
}

    return(
            <div>
                <Link to="/home"></Link>
                <div className={styles.card}>
                <img src={image} alt="pers" className={styles.img}></img>
                <div className={styles.text}>
                <p className={styles.name}>{name}</p>
                <p className={styles.origin}>Origin: {origin}</p>
                <p className={styles.origin}>Specie: {species}</p>
                <Link to={`/${id}`}><p className={styles.name}>Ver detalle..</p></Link>
                </div>
                <button className={styles.button} onClick={click}>{state? "Close Episodes" : "See episodes"}</button>
                {state && <div className={styles.episodes}>{episodes?.map(el=>(<p key={el.id}>{el.name}</p>))}</div>}
                </div>

            </div>
    )
}