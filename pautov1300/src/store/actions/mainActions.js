import axios from 'axios';
import {RENDER_DATA_SUCCESS} from './actionTypes'

export function renderData() {
    return async dispatch => {
        try {
            const response = await axios.get('https://scripts-exam-a217a.firebaseio.com/goods.json');

            const goods = Object.entries(response.data).map((good) => {
                return {
                    ...good[1],
                    id: good[0]
                }
            })

            dispatch(renderDataSuccess(goods))
        } catch(e) {
            console.log(e)
        }
    }
}

export function renderDataSuccess(goods) {
    return {
        type: RENDER_DATA_SUCCESS,
        goods
    }
}