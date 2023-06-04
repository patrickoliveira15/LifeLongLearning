import { AuthParams } from "@/Auth/domain/usecases/email-passord"
import { HttpPostClient } from "../../protocols/http/http-post-client"
import { HttpStatusCode } from "../../protocols/http/http-response"
import { InvalidCredentialsError } from "@/Auth/domain/erros/invalid-credentials-error"
import { UnexpectedError } from "@/Auth/domain/erros/unexpected-error"
import { AccountModel } from "@/Auth/domain/models/account-model"

export class RemoteAuthentication {
    constructor (
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient<AuthParams, AccountModel>
        ) {}

    async auth (params: AuthParams): Promise<void> {
        const httpResponse = await this.httpPostClient.post({
            url: this.url,
            body: params
        })

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: break
            case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
            default: throw new UnexpectedError()
        }
    }
}