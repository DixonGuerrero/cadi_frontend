import { ICompany } from "./company.interface";
import { IDepartment } from "./departament.interface";
import { IEmployee } from "./employee.interface";
import { IHours } from "./hours.interface";
import { ILicense } from "./license.interface";
import { IVacation } from "./vacation.interface";

export interface IResponse {
   isExitoso: boolean;
   resultado?: ICompany[] | ICompany  | IEmployee[] | IEmployee | IDepartment[] | IDepartment | ILicense[] | ILicense | IVacation[] | IVacation | IHours[] | IHours ;
   token?: string;
   mensaje: string;
 }