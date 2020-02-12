
import {Observable, of} from 'rxjs';

import {Task} from '../../model/Task';
import {Category} from '../../model/Category';
import {Priority} from '../../model/Priority';
import {TestData} from '../../data/TestData';
import {TaskDAO} from '../interface/task-dao';


export class TaskDAOArrayImpl implements TaskDAO {


  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
    // return of(TestData.tasks);
  }



  add(T): Observable<Task> {
    return undefined;
  }

  delete(id: number): Observable<Task> {

    const taskTmp = TestData.tasks.find(t => t.id === id); // удаляем по id
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);

    return of(taskTmp);

  }

  get(id: number): Observable<Task> {
    return undefined;
  }

  getTasksByCategory(category:Category): Observable<Task[]>{
    return of(TestData.tasks.filter(task => task.category === category));
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCount(): Observable<number> {
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }
  // поиск задач по параметрам
  // если значение null - параметр не нужно учитывать при поиске
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    console.log("------")
    console.log(TestData.tasks)
    return of(this.searchTodos(category, searchText, status, priority));

  }

  private searchTodos(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {

    let allTasks = TestData.tasks;


    if (category != null) {
      allTasks = allTasks.filter(todo => todo.category === category);
    }

    return allTasks; // отфильтрованный массив
  }

  update(T): Observable<Task> {

    const taskTmp = TestData.tasks.find(t => t.id === T.id); // обновляем по id
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, T);
    return of(T);

  }


}
