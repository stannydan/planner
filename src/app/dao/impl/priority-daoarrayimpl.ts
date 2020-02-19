import {PriorityDAO} from '../interface/priority-dao';
import {Priority} from '../../model/priority';
import {Observable, of} from 'rxjs';
import {TestData} from "../../data/TestData";

export class PriorityDAOArrayImpl implements PriorityDAO {
  add(T): Observable<Priority> {
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    return undefined;
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    console.log(TestData.priorities);
    return of(TestData.priorities);
  }

    update(T): Observable<Priority> {
    return undefined;
  }



}
