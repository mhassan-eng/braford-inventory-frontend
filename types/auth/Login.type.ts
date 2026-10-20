export type LoginBody ={
    email: string,
    password: string
}

export type LoginResponse = {
    access_token: string,
    user: {
        id: string | number,
        name: string,
        role: string,
        email: string
    }
}