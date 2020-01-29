import {CommonDAO} from '../interface/CommonDAO';
import {Category} from '../../model/category';
import {CategoryDAO} from '../interface/category-dao';
import {Observable, of} from 'rxjs';

export class CategoryDAOArrayImpl implements CategoryDAO{
  add(T): Observable<Category> {
    return undefined;
  }

  delete(id: number): Observable<Category> {
    return undefined;
  }

  get(id: number): Observable<Category> {
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return of();
  }

  search(title: string): Observable<Category[]> {
    return undefined;
  }

  update(T): Observable<Category> {
    return undefined;
  }


}
