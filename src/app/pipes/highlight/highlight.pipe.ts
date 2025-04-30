import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  /**
   * 
   * Resalta subcadena de un texto proporcionado.
   * 
   * @param value Cadena proporcionada.
   * @param args Argumentos.
   * @param type Tipo: 'full' para respetar textos completos, '' para resaltar cualquier coincidecia.
   * @returns Cadena resaltada.
   */
  public transform(value: string, args: any, type: string): unknown {
    if (!args) {
      return value;
    }

    if (type === 'full') {
      const replacement = new RegExp("\\b(" + args + "\\b)", 'igm');
      value = value.replace(replacement, '<span class="highlighted-text">$1</span>');
    } else {
      const replacement = new RegExp(args, 'igm');
      value = value.replace(replacement, '<span class="highlighted-text">$&</span>');
    }

    return value;
  }

}
