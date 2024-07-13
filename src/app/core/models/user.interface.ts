
export interface IUser {
   id_Usuario?: number;
   nombre_usuario: string;
   contrasena: string;
   rol: Rol;
   empresa_Id: number;
 }

 export type Rol = 'ADMIN' | 'SUPERUSER';