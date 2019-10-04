const initState = {
    users: [
        {bio: '', email: 'sg@purdue.edu', firstName: 'Stefany', imagueUrl: '', initials: '', lastName: 'Go', sellingProducts: '', soldProducts: ''},
        {bio: '', email: 'so@purdue.edu', firstName: 'Selin', imagueUrl: '', initials: '', lastName: 'Ovali', sellingProducts: '', soldProducts: ''},
        {bio: '', email: 'sl@purdue.edu', firstName: 'Seunghyun', imagueUrl: '', initials: '', lastName: 'Lee', sellingProducts: '', soldProducts: ''}
    ]
}

const userListReducer = (state = initState, action) => {
    return state
}

export default userListReducer