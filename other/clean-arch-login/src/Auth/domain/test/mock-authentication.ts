import { AccountModel } from "../models/account-model";
import { AuthParams } from "../usecases/email-passord";
import { faker } from "@faker-js/faker";

export const mockAuthentication = (): AuthParams => ({
    email: faker.internet.email(),
    passoword: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
    accessToken: faker.string.uuid(),
})