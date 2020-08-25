
const initialState = {
    0: [],
    1: [],
    2: [],
    3: [],
    statuses: ['todo', 'progress', 'review', 'done']
};

const todo = (state = initialState, action) => {
    const update = (obj) => {
        for (let i = 0; i < 4; ++i) {
            // eslint-disable-next-line array-callback-return
            obj[i].map(function (el, index) {
                el.index = index
                el.column = i
            })
        }
    }
    switch (action.type) {
        case 'GET_LIST_FROM_SERVER':

            for (let column = 0; column < 4; ++column) {
                let columnArr = action.payload.filter(el => el.column === column)

                columnArr.sort(function (a, b) {
                    if (a.index > b.index) {
                        return 1
                    } else {
                        return -1
                    }
                })
                state[column] = columnArr

            }

            update(state)
            console.log("Final State", state)
            return {
                ...state,
                0: [...state["0"]],
                1: [...state["1"]],
                2: [...state["2"]],
                3: [...state["3"]],
                statuses: [...state.statuses]
            }


        default:
            return state

    }

}
export default todo