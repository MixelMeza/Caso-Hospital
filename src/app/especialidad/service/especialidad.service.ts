import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidad } from '../model/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

    private apiUrl= 'http://localhost:8080/api/especialidad';
    constructor(private http:HttpClient) { }


    getEspecialidades(): Observable<Especialidad[]> {
      return this.http.get<Especialidad[]>(this.apiUrl);
    }

    getEspecialidadById(id:number):Observable<Especialidad>{
      return this.http.get<Especialidad>(`${this.apiUrl}/${id}`);
    }

    createEspecialidad(Especialidad: Especialidad): Observable<Especialidad> {
      return this.http.post<Especialidad>(this.apiUrl, Especialidad);
    }

    deleteEspecialidad(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
    updateEspecialidad(Especialidad:Especialidad, id:number): Observable<Especialidad>{
      return this.http.put<Especialidad>(`${this.apiUrl}/${id}`, Especialidad);
    }

}
