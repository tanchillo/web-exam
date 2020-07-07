import {RENDER_DATA_SUCCESS} from '../actions/actionTypes'


const initialState = {
    goods: [],
    term: ''
}

export default function mainReducer(state = initialState, action) {
    switch (action.type) {

        case RENDER_DATA_SUCCESS:
            return {
                ...state,
                goods: action.goods
            };

        default: return state
    }
}