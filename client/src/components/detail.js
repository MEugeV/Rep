import React, { useEffect } from "react";
import { Link, useParams,  } from "react-router-dom";
import styles from "../styles/card.module.css"
import {getDetail,resetDetail} from "../redux/actions"
import {connect} from "react-redux"


function Detail ({detail, getDetail,resetDetail}) {

    let {id}=useParams()

    useEffect(()=>{
        getDetail(id)
        return ()=>{resetDetail()}
    },[])


    return (
        <div>
            <Link to="/">Return to home</Link>
            <br/>

            {detail.name? 
            <div className={styles.detail}>
                <img src={detail.image} alt="pers" className={styles.imgDetail}></img>
                <div className={styles.text}>
                    <p className={styles.name}>{detail.name}</p>
                    <p className={styles.origin}>Origin: {detail.origin}</p>
                    <p className={styles.origin}>Specie: {detail.species}</p>
                    <p className={styles.name}>Episodes:</p>
                    <div className={styles.episodes}>{detail.episodes?.map(el=>(<p key={el.id}>{el.name}</p>))}</div>
                </div>
            </div>
            : "Loading..."
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {detail: state.detail}
}

export default connect (mapStateToProps, {getDetail, resetDetail})(Detail)