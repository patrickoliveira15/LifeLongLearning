import { AuthParams } from "../usecases/email-passord";
import { faker } from "@faker-js/faker";

export const mockAuthentication = (): AuthParams => ({
    email: faker.internet.email(),
    passoword: faker.internet.password()
})