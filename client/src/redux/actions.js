import axios from "axios"

export const GET_CHARACTERS = "GET_CHARACTERS"
export const RESET_CHARACTERS = "RESET_CHARACTERS"
export const GET_EPISODES = "GET_EPISODES"
export const POST_CHARACTERS = "POST_CHARACTERS"
export const FILTER_NAME_CHARACTERS = "FILTER_NAME_CHARACTERS"
export const GET_DETAIL = "GET_DETAIL"
export const RESET_DETAIL = "RESET_DETAIL"
export const FILTER_SPECIES_CHARACTERS = "FILTER_SPECIES_CHARACTERS"


//con async await..
export function getCharacters () {

    return async (dispatch) =>{   //esta funcion es la que va a resolver thunk, pasandole el argumento dispatch
    const data=  await axios.get("http://localhost:3001/characters")

    // return(dispatch)=>{dispatch({type: GET_CHARACTERS, payload: data})} 
    dispatch({type: GET_CHARACTERS, payload: data.data}) 
    }
    // con promesa.....
    //retorna callback que recibe el dispatch, que retorna el axios.then dispatch..
    //en asyn/await, retorna la callback async, data=await axios,,, dispatch data
    // return (dispatch) => {
    //     return axios("http://localhost:3001/characters")
    //     .then(rta=> dispatch({type: GET_CHARACTERS, payload: rta.data}))

    // } 
}
//we just returned the request object  //Actions must be plain objects
//This is all because of the async/await syntax that you are using.
//So how do we properly make use of this middleware called Redux-Thunk?
//A middleware is a plain JavaScript function that will be called with every single action that we dispatch.
//Redux-Thunk is the most popular middleware, because it helps us work with asynchronous action creators.
//Once we have Redux-Thunk involved in our action creator it can return plain objects OR it can return functions.
//So our action creator returns an "action" in the form of an object or function. That "action" will be sent to the dispatch function and eventually it will end up inside of Redux-Thunk.
//IF IT IS A FUNCTION Redux-Thunk will then invoke your function and it passes the dispatch, getState functions as arguments (en ese orden).
//Through dispatch we can change any data we want and through getState we can read any data we want.
//En el store: import thunk from 'redux-thunk';
//import { createStore, applyMiddleware } from "redux";
//Notice I also imported the applyMiddleware. This function is how we connect a middleware to Redux.
//To hook up Redux-Thunk, as a second argument I will call applyMiddleware and pass in thunk like so:
/*const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);*/
//So rather than returning an action I can call dispatch and pass in my action object like so:
//dispatch({type: 'FETCH_POSTS', payload: response })
//With Redux-Thunk we can use async/await syntax, because this syntax is only going to modify the return value of the inner function.
/*export const fetchPosts = () => {
      return async (dispatch) => {
        const response  = await jsonPlaceholder.get('/posts');
    
        dispatch({type: 'FETCH_POSTS', payload: })
      }
    };*/
    /*  export const fetchPosts = () => async dispatch => {
        const response  = await jsonPlaceholder.get('/posts');
        
        dispatch({type: 'FETCH_POSTS', payload: response })
    }*/

export function getDetail (id) {
    return async function (dispatch) {
        const data= await axios.get(`http://localhost:3001/characters/${id}`)

        dispatch({type:GET_DETAIL, payload:data.data})


    }


}

export function resetDetail () {
    return {type:RESET_DETAIL}
}


export function postCharacter (data) {

        axios.post("http://localhost:3001/characters",data)

        return (dispatch) =>{
            dispatch({type: POST_CHARACTERS})} //no voy a usar el payload


    } 

export function getEpisodes () {
    return (dispatch) => {
        return axios("http://localhost:3001/episodes")
        .then(rta=> dispatch({type: GET_EPISODES, payload: rta.data}))

    } 
}

export function filterNameCharacters (payload) {
    return {type: FILTER_NAME_CHARACTERS, payload}
    } 




export function resetCharacters (payload) {
    return {type: RESET_CHARACTERS, payload}
    } 

export function filterSpeciesCharacters (species) {
    return async (dispatch) =>{   
    const data=  await axios.get("http://localhost:3001/characters",{params:{species:species}})

    dispatch({type: FILTER_SPECIES_CHARACTERS, payload: data.data}) 
    }
    }
    
        ////No me hacia el dispatch......................................................................
    // return (dispatch) => {
        // return axios.post("http://localhost:3001/characters",data)
        // .then(rta=> dispatch({type: POST_CHARACTERS, payload: rta.data})) //no voy a usar el payload
