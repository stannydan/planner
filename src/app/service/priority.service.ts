import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {Priority} from '../model/priority';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  constructor(private http:HttpClient) {
  }



  getAllPriorities():Observable<any>{
    return this.http.get('http://localhost:8080/api/priority/list');

  }

  /*Priorities-dialog*/

  addPriority(priority: Priority): Observable<any> {
    return this.http.post('http://localhost:8080/api/priority/create',priority);
  }

  deletePriority(id: number): Observable<any> {
    return this.http.get('http://localhost:8080/api/priority/delete/'+id);
  }

  updatePriority(priority: Priority): Observable<any> {
    return this.http.post('http://localhost:8080/api/priority/update',priority);
  }

  getPriority(id: number): Observable<any> {
    return this.http.get('http://localhost:8080/api/priority/get'+id);
  }


}
