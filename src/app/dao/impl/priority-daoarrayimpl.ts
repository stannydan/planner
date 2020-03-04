import {PriorityDAO} from '../interface/priority-dao';
import {Priority} from '../../model/priority';
import {Observable, of} from 'rxjs';
import {TestData} from "../../data/TestData";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

//@Injectable
export class PriorityDAOArrayImpl implements PriorityDAO {

  constructor(private http: HttpClient) { }

  get(id: number): Observable<Priority> {

    return of(TestData.priorities.find(priority => priority.id === id));
  }

  getAll(): Observable<Priority[]> {

    /*return of(this.http.get('http://localhost:8080/api/priority/list'));*/
    return of(TestData.priorities);
  }

  add(priority: Priority): Observable<Priority> {


    // если id пустой - генерируем его
    if (priority.id === null || priority.id === 0) {
      priority.id = this.getLastIdPriority();
    }
    TestData.priorities.push(priority);

    return of(priority);
  }

  delete(id: number): Observable<Priority> {

    // перед удалением - нужно в задачах занулить все ссылки на удаленное значение
    // в реальной БД сама обновляет все ссылки (cascade update) - здесь нам приходится делать это вручную (т.к. вместо БД - массив)
    TestData.tasks.forEach(task => {
      if (task.priority && task.priority.id === id) {
        task.priority = null;
      }
    });

    const tmpPriority = TestData.priorities.find(t => t.id === id); // удаляем по id
    TestData.priorities.splice(TestData.priorities.indexOf(tmpPriority), 1);

    return of(tmpPriority);
  }

  update(priority: Priority): Observable<Priority> {

    const tmp = TestData.priorities.find(t => t.id === priority.id); // обновляем по id
    TestData.priorities.splice(TestData.priorities.indexOf(tmp), 1, priority);

    return of(priority);
  }

  // нужно только для реализации данных из массивов (т.к. в БД id создается автоматически)
  // генерирует id для нового значения
  private getLastIdPriority(): number {
    return Math.max.apply(Math, TestData.priorities.map(c => c.id)) + 1;
  }


}
