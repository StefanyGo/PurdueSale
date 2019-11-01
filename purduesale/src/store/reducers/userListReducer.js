const initState = {
    users: [
        {
            bio: '',
            email: 'sg@purdue.edu',
            firstName: 'Stefany',
            imagueUrl: '', initials: '',
            lastName: 'Go',
            sellingProducts: '',
            soldProducts: '',
            products: 
            [
                {
                    productReference: "products/someuser@purdue.edu_0"
                }
            ]
        },
        {
            bio: '',
            email: 'so@purdue.edu',
            firstName: 'Selin',
            imagueUrl: '',
            initials: '',
            lastName: 'Ovali',
            sellingProducts: '',
            soldProducts: '',
            products: 
            [
                {
                    productReference: "products/someuser@purdue.edu_0"
                }
            ]
        },
        {
            bio: '',
            email: 'sl@purdue.edu',
            firstName: 'Seunghyun',
            imagueUrl: '',
            initials: '',
            lastName: 'Lee',
            sellingProducts: '',
            soldProducts: '',
            products: 
            [
                {
                    productReference: "products/someuser@purdue.edu_0"
                }
            ]
        }
    ]
}

const userListReducer = (state = initState, action) => {
    return state
}

export default userListReducer