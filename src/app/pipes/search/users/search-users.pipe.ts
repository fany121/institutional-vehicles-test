import { Pipe, PipeTransform } from '@angular/core';

// Mis clases.

import { User } from '../../../interfaces/user';

@Pipe({
  name: 'searchUsers'
})

/**
 * 
 * Pipe que servirá para filtrar listas de usuarios.
 * 
 */
export class SearchUsersPipe implements PipeTransform {

  public transform(items: Array<User>, search: string): Array<User> {
    let elements: Array<User> = items;

    if (!elements) return [];
    if (!search) return elements;
    return this._searchText(elements, search);

  }

  private _searchText(items: Array<User>, search: string): Array<User> {
    return items.filter((element: User) => {
      return element.full_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      element.username.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      element.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      element.date_created.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    });
  }

}
