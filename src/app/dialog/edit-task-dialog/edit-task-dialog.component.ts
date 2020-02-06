import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DataHandlerService} from '../../service/data-handler.service';
import { Task } from 'src/app/model/task';
import {Category} from '../../model/category';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {


  private dialogTitle: string; // заголовок окна
  private task: Task; // задача для редактирования/создания
  // чтобы изменения не сказывались на самой задаче и можно было отменить изменения
  private tmpTitle: string;

  private categories: Category[];
  private tmpCategory: Category;


  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // // для возможности работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [Task, string], // данные, которые передали в диалоговое окно
    private dataHandler: DataHandlerService // ссылка на сервис для работы с данными
  ) {
  }





  ngOnInit() {
    this.task = this.data[0]; // задача для редактирования/создания
    this.dialogTitle = this.data[1]; // текст для диалогового окна

    // инициализация начальных значений (записывам в отдельные переменные
    // чтобы можно было отменить изменения, а то будут сразу записываться в задачу)
    this.tmpTitle = this.task.name;

    this.tmpCategory = this.task.category;

    this.dataHandler.getAllCategories().subscribe(items => this.categories = items);


    console.log(this.task);
    console.log(this.dialogTitle);

  }

// нажали ОК
  private onConfirm(): void {

    // считываем все значения для сохранения в поля задачи
    this.task.name = this.tmpTitle;
    this.task.category = this.tmpCategory;


    // передаем добавленную/измененную задачу в обработчик
    // что с ним будут делать - уже на задача этого компонента
    this.dialogRef.close(this.task);

  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  private onCancel(): void {
    this.dialogRef.close(null);
  }



}
