import { GET_CHARACTERS, POST_CHARACTERS, GET_EPISODES, FILTER_NAME_CHARACTERS, RESET_CHARACTERS, GET_DETAIL , RESET_DETAIL, FILTER_SPECIES_CHARACTERS} from "./actions";

const initialState = {
    characters: [],
    episodes: [],
    charactersShown: [],
    detail: {}

};

export default function rootReducer(state=initialState, action) {
    switch (action.type) {
        case GET_CHARACTERS :
            return {
                ...state,
                characters: action.payload,
                charactersShown : action.payload
            };
        case GET_EPISODES : 
            return {
                ...state,
                episodes: action.payload
            };
        case POST_CHARACTERS:
            return {
                ...state,
            };
        case FILTER_NAME_CHARACTERS:
            return {
                ...state,
                charactersShown: state.characters.filter(character=> character.name.toLowerCase().includes(action.payload.toLowerCase()))
            };
        case RESET_CHARACTERS:
            return {
                ...state,
                charactersShown: state.characters
            };
        case FILTER_SPECIES_CHARACTERS:
            return {
                ...state,
                charactersShown: action.payload
            };
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            };
        case RESET_DETAIL:
            return {
                ...state,
                detail: {}
            };
        default : return {
            ...state}
    }

  
}

