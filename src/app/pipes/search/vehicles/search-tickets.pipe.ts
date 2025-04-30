import { Pipe, PipeTransform } from '@angular/core';

// Mis clases.

import { Ticket } from '../../../interfaces/ticket';

@Pipe({
  name: 'searchTickets'
})

/**
 * 
 * Pipe que servirá para filtrar listas de tickets.
 * 
 */
export class SearchTicketsPipe implements PipeTransform {

  public transform(items: Array<Ticket>, search: string): Array<Ticket> {
    let elements: Array<Ticket> = items;

    if (!elements) return [];
    if (!search) return elements;
    return this._searchText(elements, search);

  }

  private _searchText(items: Array<Ticket>, search: string): Array<Ticket> {
    return items.filter((element: Ticket) => {
      return element.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      element.sender.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      element.subject.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      element.priority.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      element.management.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      element.state.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    });
  }

}
