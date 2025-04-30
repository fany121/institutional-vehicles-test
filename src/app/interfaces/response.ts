/**
 * 
 * Interfaz que servirá como modelo para las respuestas de la API REST.
 * 
 */
export interface Response {
    code: number,
    data?: any,
    message?: string,
    amount?: number,
}