export class SuccessResponse {
    constructor(message: string) {
        this.message = message
    }
    public readonly statusCode: number = 200;
    public readonly message: string;
}