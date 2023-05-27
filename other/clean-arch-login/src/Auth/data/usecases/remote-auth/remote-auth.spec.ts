import { RemoteAuthentication } from "./remote-auth"
import { HttpPostClientSpy } from "../../test/mock-http-client"
import { faker } from "@faker-js/faker"

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
        await sut.auth()
        expect(httpPostClientSpy.url).toBe(url)
    })
})