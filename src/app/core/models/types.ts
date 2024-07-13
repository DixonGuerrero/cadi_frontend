//Interface

export interface ILogin {
  Nombre_usuario: string;
  contrasena: string;
}

export interface IEmployee {
   id_Empleado?: number;
   nombre: string;
   apellido: string;
   fecha_Nacimiento: string;
   direccion: string;
   telefono: string;
   email: string;
   fecha_Contratacion: string;
   puesto: string;
   vacaciones: boolean;
   licencia: boolean;
   salario: number;
   estado: boolean;
   departamento_Id: number;
 }

 


  export interface ICompany {
    id_Empresa?:    number;
    nombreEmpresa: string;
    direccion:     string;
    telefono:      string;
    email:         string;
}

  export interface IDepartment{
    id_departamento?: number;
    nombreDepartamento: string;
    descripcion: string;
    empresa_Id: number;
  }

  export interface ILicense {
    id_Licencia?: number;
    tipo?: LicenseType;
    fecha_Inicio: string | Date;
    fecha_Fin: string | Date;
    empleado_Id: number;
  }

  export interface IVacation {
    id_Vacaciones?: number;
    fecha_inicio: string | Date;
    fecha_fin: string | Date;
    empleado_Id: number;
  }

  export interface IHours {
    id_Horas?: number;
    fecha: string;
    horas_trabajadas: number;
    empleado_Id: number;
  }

  export interface IResponse {
    isExitoso: boolean;
    resultado?: ICompany[] | ICompany  | IEmployee[] | IEmployee | IDepartment[] | IDepartment | ILicense[] | ILicense | IVacation[] | IVacation | IHours[] | IHours ;
    token?: string;
    mensaje: string;
  }

  export interface IUsuario {
    id_Usuario?: number;
    nombre_usuario: string;
    contrasena: string;
    rol: Rol;
    empleado_Id: number;
  }


 //Types

 export type LicenseType = 'Maternidad' | 'Paternidad' | 'Luto' | 'Enfermedad' ;
 
 export type Rol = 'SuperAdmin' | 'Administrador' ;