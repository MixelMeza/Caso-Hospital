import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Especialidad } from './model/especialidad';
import { EspecialidadService } from './service/especialidad.service';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [MenuComponent,TableModule, TagModule, RatingModule, ButtonModule, CommonModule,DialogModule,FormsModule,InputTextModule],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.css'
})
export class EspecialidadComponent implements OnInit {
   especialidades:Especialidad[]=[];
   titulo:string='';
   opc:string='';
   especialidad= new Especialidad();
   op = 0;
   visible: boolean = false;
   isDeleteInProgress: boolean = false;

   ngOnInit(): void {
    this.listarEspecialidades();
   }

   constructor(private especialidadService: EspecialidadService,

    private messageService: MessageService
  ) {}
  listarEspecialidades(){
    this.especialidadService.getEspecialidades().subscribe((data) => {
      this.especialidades = data;
  });
  }
  hola(id:number){
    console.log('button clicked '+id);
  }
  showDialogCreate() {
    this.limpiar();
    this.titulo="Crear Especialidad"
    this.opc="Save";
    this.op=0;
    this.visible = true; // Cambia la visibilidad del diálogo
  }
  showDialogEdit(id:number) {
    this.limpiar();
    this.titulo="Editar Especialidad"
    this.opc="Editar";
   this.especialidadService.getEspecialidadById(id).subscribe((data)=>{
      this.especialidad=data;
      this.op=1;
   });
    this.visible = true; // Cambia la visibilidad del diálogo
  }
  deleteEspecialidad(id: number) {
    this.isDeleteInProgress = true;
    this.especialidadService.deleteEspecialidad(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Correcto',
          detail: 'Especialidad eliminada',
        });
        this.isDeleteInProgress = false;
        this.listarEspecialidades();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la categoría',
        });
      },
    });
  }
  addEspecialidad():void{
    this.especialidadService.createEspecialidad(this.especialidad).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Especialidad Registrada',
        });
        this.listarEspecialidades();
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Agregar la categoría',
        });
      },
    });
    this.visible = false;
  }
  editEspecialidad(){
    this.especialidadService.updateEspecialidad(this.especialidad,this.especialidad.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Especialidad Editada',
        });
        this.listarEspecialidades();
        console.log(this.especialidad.id+' '+this.especialidad.nombre+' '+this.especialidad.estado);
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Editar la categoría',
        });
      },
    });
    this.visible = false;
  }
  opcion():void{
    if(this.op==0){
      this.addEspecialidad();
      this.limpiar();
    }else if(this.op==1){
      console.log("Editar");
      this.editEspecialidad();
      this.limpiar();
    }else{
      console.log("No se hace nada");
      this.limpiar();
    }

  }
 limpiar(){
  this.titulo='';
  this.opc='';
  this.op = 0;
  this.especialidad.id=0;
  this.especialidad.nombre='';
  this.especialidad.estado='';
 }
   getSeverity(status: string):any {
    switch (status) {
        case 'A':
            return 'success';
        case 'I':
            return 'warning';
    }
}
}
