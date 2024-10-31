import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Doctor } from './model/doctor';
import { DoctorService } from './service/doctor.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Especialidad } from '../especialidad/model/especialidad';
import { DropdownModule } from 'primeng/dropdown';
import { EspecialidadService } from '../especialidad/service/especialidad.service';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [MenuComponent,TableModule, TagModule, RatingModule, ButtonModule,  DialogModule,CommonModule,FormsModule,InputTextModule,DropdownModule],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
  export class DoctorComponent implements OnInit {
    doctores:Doctor[]=[];
    titulo:string='';
    opc:string='';
    doctor= new Doctor();
    op = 0;
    visible: boolean = false;
    isDeleteInProgress: boolean = false;
    especialidades:Especialidad[]=[]

    ngOnInit(): void {
     this.listarDoctores();
     this.listarEspecialidades();
    }

    constructor(
      private service: DoctorService,
      private service2: EspecialidadService,

     private messageService: MessageService
   ) {}

   listarDoctores(){
     this.service.getDoctores().subscribe((data) => {
       this.doctores = data;
   });

   }
   hola(id:number){
     console.log('button clicked '+id);
   }
   showDialogCreate() {
     this.limpiar();
     this.titulo="Crear Doctor"
     this.opc="Save";
     this.op=0;
     this.visible = true; // Cambia la visibilidad del diálogo
   }
   showDialogEdit(id:number) {
     this.limpiar();
     this.titulo="Editar Doctor"
     this.opc="Editar";
    this.service.getDoctorById(id).subscribe((data)=>{
       this.doctor=data;
       this.op=1;
    });
     this.visible = true; // Cambia la visibilidad del diálogo
   }
   deleteDoctor(id: number) {
     this.isDeleteInProgress = true;
     this.service.deleteDoctor(id).subscribe({
       next: () => {
         this.messageService.add({
           severity: 'error',
           summary: 'Correcto',
           detail: 'Doctor eliminada',
         });
         this.isDeleteInProgress = false;
         this.listarDoctores();
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
   addDoctor():void{
     this.service.createDoctor(this.doctor).subscribe({
       next: () => {
         this.messageService.add({
           severity: 'success',
           summary: 'Correcto',
           detail: 'Doctor Registrada',
         });
         this.listarDoctores();
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
   editDoctor(){
     this.service.updateDoctor(this.doctor,this.doctor.id).subscribe({
       next: () => {
         this.messageService.add({
           severity: 'success',
           summary: 'Correcto',
           detail: 'Doctor Editada',
         });
         this.listarDoctores();
         console.log(this.doctor.id+' '+this.doctor.nombres+' '+this.doctor.apellidos);
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
       this.addDoctor();
       this.limpiar();
     }else if(this.op==1){
       console.log("Editar");
       this.editDoctor();
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
   this.doctor.id=0;
   this.doctor.nombres='';
   this.doctor.apellidos='';
   this.doctor.especialidad=undefined;
  }
  listarEspecialidades(){
    this.service2.getEspecialidades().subscribe((data) => {
      this.especialidades = data;
  })}
}
