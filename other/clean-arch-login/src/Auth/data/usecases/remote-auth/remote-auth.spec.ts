import { RemoteAuthentication } from "./remote-auth"
import { HttpPostClientSpy } from "../../test/mock-http-client"
import { faker } from "@faker-js/faker"
import { mockAuthentication } from "@/Auth/domain/test/mock-authentication"
import { InvalidCredentialsError } from "@/Auth/domain/erros/invalid-credentials-error"
import { HttpStatusCode } from "../../protocols/http/http-response"
import { UnexpectedError } from "@/Auth/domain/erros/unexpected-error"
import { AuthParams } from "@/Auth/domain/usecases/email-passord"
import { AccountModel } from "@/Auth/domain/models/account-model"

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy<AuthParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
        const httpPostClientSpy = new HttpPostClientSpy<AuthParams, AccountModel>()
        const sut = new RemoteAuthentication(url, httpPostClientSpy)
        return {
            sut,
            httpPostClientSpy
        }
}

describe('RemoteAuthentication', () => {
    test('Shoud call HttpPostClient With correct URL', async () => {
        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)
        await sut.auth(mockAuthentication())
        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Shoud call HttpPostClient With correct body', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authenticationParams = mockAuthentication()
        await sut.auth(authenticationParams)
        expect(httpPostClientSpy.body).toEqual(authenticationParams)
    })

    test('Shoud throw UnexpectedError if HttpPostClient returns 400', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.badRequest
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Shoud throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.unathorized
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })

    test('Shoud throw UnexpectedError if HttpPostClient returns 404', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Shoud throw UnexpectedError if HttpPostClient returns 500', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })
})