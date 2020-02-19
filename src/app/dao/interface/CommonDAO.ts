import {Observable} from 'rxjs';

// все методы возвращают Observable - для асинхронности и работы в реактивном стиле

export interface CommonDAO<T> {


  getAll(): Observable<T[]>;


  get(id: number): Observable<T>; // получение значения по уникальному id


    update(T): Observable<T>;


  delete(id: number): Observable<T>; // удаление по id


  add(T): Observable<T>;
}
