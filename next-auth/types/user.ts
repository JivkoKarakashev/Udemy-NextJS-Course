interface RegisterUser {
    email: string,
    hash: string
}

interface AuthUser extends Omit<RegisterUser, 'hash'> {
    id: number,
    password: string
}

export {
    type AuthUser,
    type RegisterUser
}