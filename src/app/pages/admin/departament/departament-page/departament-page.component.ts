import { Component, OnInit, inject } from '@angular/core';
import { IDepartment } from '../../../../core/models/types';
import { DepartamentCardComponent } from '../departament-card/departament-card.component';
import { DepartamentAddComponent } from '../departament-add/departament-add.component';
import { ButtonModule } from 'primeng/button';
import { DepartamentService } from '../../../../core/services/admin/departament.service';
import { Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-departament-page',
  standalone: true,
  imports: [DepartamentCardComponent,
    DepartamentAddComponent,ButtonModule,TooltipModule
  ],
  templateUrl: './departament-page.component.html',
  styleUrl: './departament-page.component.css'
})
export class DepartamentPageComponent implements OnInit{

  departaments: IDepartment [] = []
  departamentService = inject(DepartamentService)
  dialogService = inject(DialogService)
  messageService = inject(MessageService)

  ref: DynamicDialogRef | undefined;


  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.loadData()
    this.setupSubscriptions();
  }

  loadData(){
    this.departamentService.getDepartmentsByCompany().subscribe((response) => {
      this.departaments = response as IDepartment[]
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  setupSubscriptions(): void {
    const createdSubscription = this.departamentService.departamentCreated$.subscribe((newDepartament) => {
      if(newDepartament){
        this.departaments.push(newDepartament);
      }
    });
    
    const updatedSubscription = this.departamentService.departamentUpdated$.subscribe((updatedDepartament) => {
      const index = this.departaments.findIndex(d => d.id_departamento === updatedDepartament.id_departamento);
      if (index !== -1) {
        this.departaments[index] = updatedDepartament;
      }
    });

    const deletedSubscription = this.departamentService.departamentDeleted$.subscribe((deletedDepartamentId) => {
      this.departaments = this.departaments.filter(d => d.id_departamento !== deletedDepartamentId);
    });

    this.subscriptions.add(createdSubscription);
    this.subscriptions.add(updatedSubscription);
    this.subscriptions.add(deletedSubscription);
  }


  showCreateDepartament(){
    this.ref = this.dialogService.open(DepartamentAddComponent, {
      header: 'Crear Departamento',
      width: 'auto',
      height: 'auto',
      contentStyle: { overflow: 'auto', 'padding':'0'},
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
     
    });

    this.ref.onClose.subscribe((data: any) => {});

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Maximized',
        detail: `maximized: ${value.maximized}`,
      });
    });
  }
}
