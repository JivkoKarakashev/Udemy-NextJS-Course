interface RegisterUser {
    email: string,
    hash: string
}

interface AuthUser extends RegisterUser {
    id: number
}

export {
    type AuthUser,
    type RegisterUser
}