import { Injectable } from '@angular/core';
import {Category} from '../model/category';
import {Task} from '../model/task';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {TaskDAOArrayImpl} from '../dao/impl/task-daoarray-impl';
import {CategoryDAOArrayImpl} from '../dao/impl/category-daoarray-impl';
import {Priority} from '../model/priority';
import {PriorityDAOArrayImpl} from '../dao/impl/priority-daoarrayimpl';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  private taskDaoArray = new TaskDAOArrayImpl();
  private categoryDaoArray = new CategoryDAOArrayImpl();
  private priorityDaoArray = new PriorityDAOArrayImpl();


  constructor(private http:HttpClient) {
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll();
  }

  getAllCategories(): Observable<Category[]> {
    console.log(this.categoryDaoArray.getAll());
    return this.categoryDaoArray.getAll();
  }

  getAllPriorities():Observable<any>{
     return this.http.get('http://localhost:8080/api/priority/list');

    //return this.priorityDaoArray.getAll();
  }

  // поиск задач по параметрам
  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }


  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task);
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskDaoArray.delete(id);
  }

  deleteCategory(id: number): Observable<Category> {
return this.categoryDaoArray.delete(id);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.update(category);
  }

  addTask(task: Task): Observable<Task> {
    return this.taskDaoArray.add(task);
  }

  addCategory(category: string):Observable<Category>{
    return  this.categoryDaoArray.add(new Category(null,category));
  }

  searchCategories(title: string): Observable<Category[]> {
    return this.categoryDaoArray.search(title);
  }

  // статистика

  getCompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getCompletedCountInCategory(category);
  }

  getUncompletedTotalCount(): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(null);
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(category);
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getTotalCountInCategory(category);
  }

/*Priorities-dialog*/

  addPriority(priority: Priority): Observable<any> {
    return this.http.post('http://localhost:8080/api/priority/create',priority);
  }

  deletePriority(id: number): Observable<any> {
    return this.http.get('http://localhost:8080/api/priority/delete/'+id);
  }

  updatePriority(priority: Priority): Observable<any> {
    return this.http.post('http://localhost:8080/api/priority/create',priority);
  }


}
