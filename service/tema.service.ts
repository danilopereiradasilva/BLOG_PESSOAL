import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token) //valor eh oq tiver em environment.token
  }

  getAllTema(): Observable<Tema[]> { //colocar [] pois trará um array de objetos tema
    return this.http.get<Tema[]>('http://localhost:8080/tema', this.token) //colocar o end point igual do back end
    //this.token é a validação
  }

  getByIdTema(id: number): Observable<Tema>{
    return this.http.get<Tema>(`http://localhost:8080/tema/${id}`, this.token)
  }

  getByNomeTema(nome: string): Observable<Tema[]>{
    return this.http.get<Tema[]>(`http://localhost:8080/tema/nome/${nome}`, this.token)
  }

  postTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>('http://localhost:8080/tema', tema, this.token)
    //CRIEI OBJETO NO TEMA REGISTRADO NO END POINT ACIMA
  }

  putTema(tema: Tema): Observable<Tema> {
    return this.http.put<Tema>('http://localhost:8080/tema', tema, this.token)
  }

  deleteTema(id: number) { 
  return this.http.delete(`http://localhost:8080/tema/${id}`, this.token) 
  
  }
}