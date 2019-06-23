export default function times(state = [], action) {
    switch (action.type) {
        case "ADD_TIME":
        return [...state, { id: Date.now(), times: action.payload.times }];
        case "DELETE_TIME":
        return state.filter(time => time.id !== action.id);
        default:
        return state;
    }
}