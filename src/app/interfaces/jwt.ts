/**
 * 
 * Interfaz que servirá como modelo para los payloads.
 * 
 */
export interface JWT {
    id_role: number
    id_user: number,
    hash_username: string,
    full_name: string,
    exp: number,
    jti: string,
}