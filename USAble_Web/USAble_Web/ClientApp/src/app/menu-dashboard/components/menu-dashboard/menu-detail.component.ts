import {Component, Input } from '@angular/core';

import { MenuItems } from '../../models/menu-items.interface';
import { MenuItemCategories } from '../../models/menu-item-categories.interface';

@Component({
  selector: 'app-menu-detail',
  styleUrls: ['menu-detail.component.css'],
  templateUrl: 'menu-detail.component.html'
})
export class MenuDetailComponent {
  @Input()
  detail: MenuItems;

  @Input()
  categories: MenuItemCategories[];

  constructor() {}

  getCategoryText(value: number) {
    const menuItemCategory = this.getCategoryById(value);

    return menuItemCategory !== undefined ? menuItemCategory.Name : 'No Category';
  }

  getCategoryById(value: number) {
    if (this.categories !== undefined) {
      return this.categories.find((category: MenuItemCategories) => {
        if (category.Id === value) {
          return category.Name;
        }
      });
    }
  }
}
