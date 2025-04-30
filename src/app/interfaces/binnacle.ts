/**
 * 
 * Interfaz que servirá como modelo para los registros de bitácora.
 * 
 */
export interface Binnacle {
    id_binnacle: number,
    element: string,
    table_name: string,
    action: string,
    datetime: string,
    ip_user: string,
    hostname: string,
    id_user: number
}
