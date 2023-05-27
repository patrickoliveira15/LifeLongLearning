import { AccountModel } from "../models/account-model"

export type AuthParams = {
    email: string
    passoword: string
}

export interface EmailAuthentication {
    auth (params: AuthParams): Promise<AccountModel>
}