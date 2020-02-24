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
      category.id = this.getLastIdCategory();
    }

    TestData.categories.push(category);

    return of(category);
  }

  // находит последний id (чтобы потом вставить новую запись с id, увеличенным на 1) - в реальной БД это происходит автоматически
  private getLastIdCategory(): number {
    return Math.max.apply(Math, TestData.categories.map(c => c.id)) + 1;
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

  // поиск категорий по названию
  search(title: string): Observable<Category[]> {

    return of(TestData.categories.filter(
      cat => cat.name.toUpperCase().includes(title.toUpperCase()))
      .sort((c1, c2) => c1.name.localeCompare(c2.name)));
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
