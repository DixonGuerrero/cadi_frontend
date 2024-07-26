import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//Conguracion Prime NG
import { PrimeNGConfig } from 'primeng/api';

// -> Modulos Basicos
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ThemeService } from './core/services/admin/theme.service';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    // -> Modulos Basicos Prime NG
    ToastModule,
    ButtonModule,
    MessageModule,
    ConfirmDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'cadiFront';
  darkModeService: ThemeService = inject(ThemeService);

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.primengConfig.zIndex = {
      modal: 1100, 
      overlay: 1000, 
      menu: 1000,
      tooltip: 1100,
    };

    //Translate
    this.primengConfig.setTranslation({
      accept: 'Aceptar',
      reject: 'Cancelar',
      cancel: 'Cancelar',
      choose: 'Elegir',
      upload: 'Subir',
      dayNames: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
      dayNamesShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
      dayNamesMin: [ 'Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa' ],
      monthNames: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
      monthNamesShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],

      // -> Mensajes de Input Password
      strong: 'Fuerte',
      weak: 'Débil',
      medium: 'Medio',
      passwordPrompt: 'Ingrese una contraseña',
    })
  }
}
