<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//Conguracion Prime NG
import { PrimeNGConfig } from 'primeng/api';

// -> Modulos Basicos
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    // -> Modulos Basicos Prime NG
    ToastModule,
    ButtonModule,
    MessageModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'cadiFront';

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
=======
// src/app/app.component.ts
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cadi';

  ngOnInit(): void {
    initFlowbite();
   
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b
  }
}
