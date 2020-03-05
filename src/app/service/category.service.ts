import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {Priority} from '../model/priority';
import {HttpClient} from "@angular/common/http";
import {Category} from "../model/category";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) {
  }



  getAllCategory():Observable<any>{
    return this.http.get('http://localhost:8080/api/category/list');

  }

  /*Priorities-dialog*/

  addCategory(category: Category): Observable<any> {
    return this.http.post('http://localhost:8080/api/category/create',category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.get('http://localhost:8080/api/category/delete/'+id);
  }

  updateCategory(category: Category): Observable<any> {
    return this.http.post('http://localhost:8080/api/category/update',category);
  }

  getCategory(id: number): Observable<any> {
    return this.http.get('http://localhost:8080/api/category/get'+id);
  }


}
