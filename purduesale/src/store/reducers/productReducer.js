const initState = {
    products: [
        {
            id: 1,
            title: "Couch",
            description: "White Fluffy Couch",
            category: "Furniture",
            price: 70,
            isFreeDelivery: true
        },
        {
            id: 2,
            title: "MA165 Textbook",
            description: "Textbook for Class MA165",
            category: "Textbook",
            price: 20,
            isFreeDelivery: true
        },
        {
            id: 3,
            title: "Table",
            description: "White Minimalist Table",
            category: "Furniture",
            price: 25,
            isFreeDelivery: false
        }
    ]
}

const productReducer = (state = initState, action) => {
    return state
}

export default productReducer