export class UnexpectedError extends Error {
    constructor() {
        super('Sorry! Something wrong happened.')
        this.name = 'UnexpectedError'
    }
}