export const addTime = times => ({
    type: "ADD_TIME",
    payload: { times }
});

export const deleteTime = id => ({
    type: "DELETE_TIME",
    id
});