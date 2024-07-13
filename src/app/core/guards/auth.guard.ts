import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { TokenService } from "../services/auth/token.service";
import { MessageService } from "primeng/api";


export const loginGuard = () => {
   const tokenService = inject(TokenService);
   const router = inject(Router);
   const messageService = inject(MessageService);

   
   const token = tokenService.getToken();
   if (!token) {

      messageService.add({ severity: 'error', summary: 'Error', detail: 'No tienes acceso a esta pagina'});
      console.log('No tienes acceso a esta pagina');
     return router.navigate(['/auth/login']); 
   }

   return true;
}