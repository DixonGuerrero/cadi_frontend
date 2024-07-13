export interface ILicense {
   id_Licencia?: number;
   tipo?: LicenseType;
   fecha_Inicio: string | Date;
   fecha_Fin: string | Date;
   empleado_Id: number;
 }

 export type LicenseType = 'Maternidad' | 'Paternidad' | 'Luto' | 'Enfermedad' | 'Otro';