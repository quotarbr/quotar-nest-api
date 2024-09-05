export interface LojistaPayload {
    sub: number;
    login: string;
    name: string;
    iat?: number;
    exp?: number;
}