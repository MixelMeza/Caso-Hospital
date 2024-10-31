import { Especialidad } from "../../especialidad/model/especialidad";

export class Doctor{
  id:number;
  nombres:string;
  apellidos:string;
  especialidad?:Especialidad;
  constructor(id:number=0,nombre:string='',apellido:string='',especialidad?:Especialidad){
    this.id=id;
    this.nombres=nombre;
    this.apellidos=apellido;
    this.especialidad=especialidad;
  }
}
