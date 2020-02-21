import {CommonDAO} from '../interface/CommonDAO';
import {Category} from '../../model/category';
import {CategoryDAO} from '../interface/category-dao';
import {Observable, of} from 'rxjs';
import {TestData} from '../../data/TestData';
import {Task} from "../../model/task";

export class CategoryDAOArrayImpl implements CategoryDAO{
  add(category: Category): Observable<Category> {

    // если id пустой - генерируем его
    if (category.id === null || category.id === 0) {
      category.id = this.getLastIdCat() + 1;
    }
    TestData.categories.push(category);

    return of(category);
  }

  private getLastIdCat(): number {
    return Math.max.apply(Math, TestData.categories.map(category => category.id));
  }

  get(id: number): Observable<Category> {
    return undefined;
  }

  getAll(): Observable<Category[]> {

    console.log(TestData.categories);
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    return undefined;
  }

  delete(id: number): Observable<Category> {

    // перед удалением - нужно в задачах занулить все ссылки на удаленное значение
    // в реальной БД сама обновляет все ссылки (cascade update) - здесь нам приходится делать это вручную (т.к. вместо БД - массив)
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = null;
      }
    });

    const tmpCategory = TestData.categories.find(t => t.id === id); // удаляем по id
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1);

    return of(tmpCategory);

  }

  update(T): Observable<Category> {

    const tmpCategory = TestData.categories.find(t => t.id === T.id); // обновляем по id
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, T);

    return of(tmpCategory);
  }

}
