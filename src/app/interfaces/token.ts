/**
 * 
 * Interfaz que servirá como modelo para las llaves de acceso.
 * 
 */
export interface Token {
    token: string,
    token_refresh: string,
}

export function isToken(object: Object | null): object is Token | null {
    return object !== null && 'token' in object && 'token_refresh' in object;
}