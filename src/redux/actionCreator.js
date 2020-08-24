import axios from 'axios';

export function getList() {
    return (dispatch) => {
        axios({
            url: 'https://to-do-app-trial.herokuapp.com/todo',
            method: 'GET'
        })
            .then(res => {
                dispatch({
                    type: 'GET_LIST', payload: res.data
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}