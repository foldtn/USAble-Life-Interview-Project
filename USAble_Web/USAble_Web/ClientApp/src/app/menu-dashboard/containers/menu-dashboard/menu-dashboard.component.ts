import {Component, OnInit } from '@angular/core';
import {MenuItems} from '../../models/menu-items.interface';
import {MenuItemCategories} from '../../models/menu-item-categories.interface';
import {MenuItemsService} from '../../services/menu-items.service';
import {MenuItemCategoriesService} from '../../services/menu-item-categories.service';
import {ApiResponse} from '../../../models/api-response.interface';

@Component({
  selector: 'app-menu-dashboard',
  styleUrls: ['menu-dashboard.component.css'],
  template: `
    <div class="text-center">
      <h1>Menu</h1>
    </div>
    <div class="col-md-10 offset-md-1 mt-4">
      <div class="row">
        <div class="col-sm-3 mt-4" *ngFor="let menuItem of menuItems;">
          <app-menu-detail
            [detail]="menuItem"
            [categories]="categories"
          >
          </app-menu-detail>
        </div>
      </div>
    </div>
  `
})
export class MenuDashboardComponent implements OnInit {
  menuItems: MenuItems[];
  categories: MenuItemCategories[];

  constructor(
    private menuItemService: MenuItemsService,
    private categoryService: MenuItemCategoriesService
  ) {}

  ngOnInit() {
    this.categoryService
      .getCategories()
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          this.categories = data.payload;
        }
        else {
          console.log(data.error);
        }
      });

    this.menuItemService
      .getMenuItems()
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          this.menuItems = data.payload;
        }
        else {
          console.log(data.error);
        }
      });
  }
}
