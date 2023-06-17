import { legacy_createStore as createStore} from 'redux'

const initialState = {
    poll_dict: false,
};

export function update (key, value) {
    return {
        type: "UPDATE",
        key: key,
        value: value
    }
}

function global_reducer (state = initialState, action) {
    let new_state = Object.assign({}, state);
    console.log('')
    console.log('global_reducer.js')
    console.log(state)
    console.log(action)
    switch (action.type) {
        case "UPDATE":            
            new_state[action.key] = action.value;
            console.log(new_state)
            return new_state;
        default:
            return new_state;
    }
};

export const store = createStore(global_reducer);
