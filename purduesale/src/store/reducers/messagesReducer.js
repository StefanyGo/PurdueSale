const initState = {
    messages: [
        {
            id: 0,
            senderID: "gheskett@purdue.edu",
            text: "Hello world!"
        },
        {
            id: 1,
            senderID: "gheskett@purdue.edu",
            text: "How much money do you want for that textbook?"
        },
        {
            id: 2,
            senderID: "gheskett@purdue.edu",
            text: "Thank you!"
        }
    ]
}

const messagesReducer = (state = initState, action) => {
    return state
}

export default messagesReducer
