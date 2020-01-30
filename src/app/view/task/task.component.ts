import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from  '../../model/task';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['color', 'id', 'name', 'date', 'priority', 'category'];
  dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;


  @Input()
  private tasks: Task[];

  constructor(private dataHandler: DataHandlerService ) { }
/*

  ngOnInit() {
    this.tasks = this.dataHandler.getTasks()
  }
*/
  ngOnInit() {
    //  this.tasks = this.dataHandler.getTasks();
  //  this.dataHandler.taskSubject.subscribe(tasks => this.tasks = tasks);
  // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataSource = new MatTableDataSource();
    this.refreshTable();

  }

  ngAfterViewInit(): void {
    this.addTableObjects();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }

  private getPriorityColor(task: Task) {

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff';
  }





  private refreshTable() {

    this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)

    this.addTableObjects();


    // когда получаем новые данные..
    // чтобы можно было сортировать по столбцам "категория" и "приоритет", т.к. там не примитивные типы, а объекты
    // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
    this.dataSource.sortingDataAccessor = (task, colName) => {

      // по каким полям выполнять сортировку для каждого столбца
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.name : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }

        case 'name': {
          return task.name;
        }
      }
    };

  }


  private addTableObjects() {
    this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
   this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
  }

}
