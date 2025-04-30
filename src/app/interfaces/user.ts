/**
 * 
 * Interfaz que servirá como modelo para los registros de usuarios.
 * 
 */
export interface User {
    id_user: number,
    full_name: string,
    username: string,
    password: string,
    password_old: string,
    email: string,
    date_created: string,
    hash_username: string,
    hash_password: string,
    state: string,
    role: string,
    created_by: string,
    id_state: number,
    id_role: number,
    id_created_by: number
}
