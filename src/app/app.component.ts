import { Component } from '@angular/core';
import {Task} from './model/task';
import {Category} from './model/category';
import {DataHandlerService} from './service/data-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {   //Root-app
  title = 'planner';

  tasks: Task[];
  categories: Category[];

  private selectedCategory: Category = null;

  constructor(
    private dataHandler: DataHandlerService // фасад для работы с данными
  ) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
   //        this.onSelectCategory(null); // показать все задачи
  }


  private onSelectCategory(category: Category) {

    this.selectedCategory = category;

    this.dataHandler.searchTasks(
      this.selectedCategory,
      null,
      null,
      null
    ).subscribe(tasks => {
      this.tasks = tasks;
    });

  }


 /* onUpdateTask(task: any) {
    console.log(task)
  }*/
  onUpdateTask(task: Task) {
    console.log(task.name);
    this.dataHandler.updateTask(task).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });

  }

  private onDeleteTask(task: Task) {

    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });


  }
}
