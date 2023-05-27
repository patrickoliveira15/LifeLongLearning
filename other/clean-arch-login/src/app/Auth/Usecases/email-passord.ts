import { AccountModel } from "../Models/account-model"

type AuthParams = {
    email: string
    passoword: string
}

export interface EmailAuthentication {
    auth (params: AuthParams): Promise<AccountModel>
}