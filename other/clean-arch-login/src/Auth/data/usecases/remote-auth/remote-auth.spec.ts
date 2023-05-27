import { RemoteAuthentication } from "./remote-auth"
import { HttpPostClientSpy } from "../../test/mock-http-client"
import { faker } from "@faker-js/faker"
import { mockAuthntication } from "@/Auth/domain/test/mock-authentication"

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
        const httpPostClientSpy = new HttpPostClientSpy()
        const sut = new RemoteAuthentication(url, httpPostClientSpy)
        return {
            sut,
            httpPostClientSpy
        }
}

describe('RemoteAuthentication', () => {
    test('Shoud call HttpClient With correct URL', async () => {
        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)
        await sut.auth(mockAuthntication())
        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Shoud call HttpClient With correct body', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authenticationParams = mockAuthntication()
        await sut.auth(authenticationParams)
        expect(httpPostClientSpy.body).toEqual(authenticationParams)
    })
})