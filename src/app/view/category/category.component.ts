import {Component, Input, OnInit} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input()
  private categories: Category[];

  selected: Category;

  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit() {
   //    this.dataHandlerService.getAllCategories().subscribe( categories => this.categories = categories);


    console.log(this.categories);
  }
/*

  getTasksByCategory(category: Category) {
    this.dataHandlerService.getTasks().filter(task => task.category === category );
  }
*/

  showTasksByCategory(category: Category) {
    this.selected = category;
  //  this.dataHandlerService.fetchTasksByCategory(category);
  }


}
