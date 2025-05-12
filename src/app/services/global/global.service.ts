import { ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Mis clases.

import { TypeToast } from '../../enums/typeToast';

import { Response } from '../../interfaces/response';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private toastElement!: HTMLElement;
  private toastProgressElement!: HTMLElement;
  private modalElement!: HTMLElement;
  private logoElement!: HTMLElement;
  private modalContentElement!: ViewContainerRef;

  public host: string = "http://localhost";
  public api: string = "institutional-vehicles-test-api";
  public url: string = `${this.host}/${this.api}`;
  public dateFormat: string = 'dd/MM/yyyy';
  public timeFormat: string = 'HH:mm:ss';
  public dateTimeFormat: string = `${this.dateFormat} ${this.timeFormat}`;

  // public optionsChartDonut: Options;
  // public optionsChartColumn: Options;
  // public optionsChartBar: Options;
  // public optionsChartLine: Options;

  /**
   * 
   * Configuración del servicio.
   * 
   * @param _http Inyecta el servicio de solicitudes HTTP de Angular.
   * 
   */
  public constructor(
    private _http: HttpClient
  ) {
    // this.optionsChartDonut = {
    //   credits: { enabled: false },
    //   colors: ['#fb4538', '#949b9c', '#22d3ee', '#fb453877', '#949b9c77','#22d3ee77','#fb453826','#949b9c26', '#22d3ee26'],
    //   chart: {
    //     type: 'pie'
    //   },
    //   accessibility: {
    //     point: {
    //       valueSuffix: '%'
    //     }
    //   },
    //   title: {
    //     text: ''
    //   },
    //   tooltip: {
    //     pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>',
    //     style: {
    //       fontSize: '14px',
    //       fontWeight: 'bold'
    //     }
    //   },
    //   plotOptions: {
    //     pie: {
    //       allowPointSelect: true,
    //       cursor: 'pointer',
    //       dataLabels: {
    //         enabled: false
    //       },
    //       showInLegend: true
    //     }
    //   },
    //   legend: {
    //     itemStyle: {
    //       fontSize: '14px',
    //       fontWeight: 'bold'
    //     }
    //   },
    //   series: [
    //     {
    //       type: 'pie',
    //       name: 'Porcentaje',
    //       innerSize: '55%',
    //       data: []
    //     }
    //   ]
    // };
    // this.optionsChartColumn = {
    //   credits: { enabled: false },
    //   colors: ['#fb4538', '#949b9c', '#22d3ee', '#fb453877', '#949b9c77','#22d3ee77','#fb453826','#949b9c26', '#22d3ee26'],
    //   chart: {
    //     type: 'column'
    //   },
    //   title: {
    //     text: ''
    //   },
    //   plotOptions: {
    //     column: {
    //       borderRadius: '5%'
    //     }
    //   },
    //   tooltip: {
    //     pointFormat: '',
    //     style: {
    //       fontSize: '14px',
    //       fontWeight: 'bold'
    //     }
    //   },
    //   yAxis: {
    //     title: {
    //       text: '',
    //       style: {
    //         fontSize: '14px',
    //         fontWeight: 'bold'
    //       }
    //     },
    //     labels: {
    //       style: {
    //         fontSize: '14px',
    //         fontWeight: 'bold'
    //       }
    //     },
    //   },
    //   legend: {
    //     itemStyle: {
    //       fontSize: '14px',
    //       fontWeight: 'bold'
    //     }
    //   }
    // };
    // this.optionsChartBar = {
    //   credits: { enabled: false },
    //   colors: ['#fb4538', '#949b9c', '#22d3ee', '#fb453877', '#949b9c77','#22d3ee77','#fb453826','#949b9c26', '#22d3ee26'],
    //   chart: {
    //     type: 'bar'
    //   },
    //   title: {
    //     text: ''
    //   },
    //   plotOptions: {
    //     column: {
    //       borderRadius: '5%'
    //     }
    //   },
    //   tooltip: {
    //     pointFormat: '',
    //     style: {
    //       fontSize: '14px',
    //       fontWeight: 'bold'
    //     }
    //   },
    //   yAxis: {
    //     title: {
    //       text: '',
    //       style: {
    //         fontSize: '14px',
    //         fontWeight: 'bold'
    //       }
    //     },
    //     labels: {
    //       style: {
    //         fontSize: '14px',
    //         fontWeight: 'bold'
    //       }
    //     },
    //   },
    //   legend: {
    //     itemStyle: {
    //       fontSize: '14px',
    //       fontWeight: 'bold'
    //     }
    //   }
    // };
    // this.optionsChartLine = {
    //   credits: { enabled: false },
    //   colors: ['#fb4538', '#949b9c', '#22d3ee', '#fb453877', '#949b9c77','#22d3ee77','#fb453826','#949b9c26', '#22d3ee26'],
    //   chart: {
    //     type: 'column'
    //   },
    //   title: {
    //     text: ''
    //   },
    //   plotOptions: {
    //     column: {
    //       borderRadius: '5%'
    //     }
    //   },
    //   tooltip: {
    //     pointFormat: '',
    //     style: {
    //       fontSize: '14px',
    //       fontWeight: 'bold'
    //     }
    //   },
    //   yAxis: {
    //     title: {
    //       text: '',
    //       style: {
    //         fontSize: '14px',
    //         fontWeight: 'bold'
    //       }
    //     },
    //     labels: {
    //       style: {
    //         fontSize: '14px',
    //         fontWeight: 'bold'
    //       }
    //     },
    //   },
    //   legend: {
    //     itemStyle: {
    //       fontSize: '14px',
    //       fontWeight: 'bold'
    //     }
    //   }
    // };
  }

  /**
   * 
   * Método que consulta a la API REST mediante petición HTTP, la lista de registros de tipo Estadística.
   * 
   * @returns Observable tipo Response, lista de registros tipo Estadística.
   * @param idUser Identificador del Usuario.
   * @param idManagement Identificador de la Dirección.
   * @param dateStart Fecha de inicio.
   * @param dateEnd Fecha de fin.
   * 
   */
  // public listStatistics(idUser: number, idManagement: number, dateStart?: string, dateEnd?:string): Observable<Response> {
  //   let url: string = `${this.url}/statistics`;
  //   let params: string = '';

  //   if (dateStart && dateEnd) {
  //     params = `${idUser}/${idManagement}/${dateStart}/${dateEnd}`;
  //   } else {
  //     params = `${idUser}/${idManagement}`;
  //   }

  //   return this._http.get<Response>(`${url}/${params}`, {responseType: 'json'});
  // }

  /**
   * 
   * Método que consulta a la API REST mediante petición HTTP, la lista de registros de tipo Dirección.
   * 
   * @returns Observable tipo Response, lista de registros tipo Dirección.
   * 
   */
  public listManagements(): Observable<Response> {
    let url: string = `${this.url}/dicc-managements/list`;

    return this._http.get<Response>(`${url}`, {responseType: 'json'});
  }

  /**
   * 
   * Método que consulta a la API REST mediante petición HTTP, la lista de registros de tipo Rol.
   * 
   * @returns Observable tipo Response, lista de registros tipo Rol.
   * 
   */
  public listRoles(): Observable<Response> {
    let url: string = `${this.url}/dicc-roles/list`;

    return this._http.get<Response>(`${url}`, {responseType: 'json'});
  }

  /**
   * 
   * Método que consulta a la API REST mediante petición HTTP, la lista de registros de tipo Estado de Ticket.
   * 
   * @returns Observable tipo Response, lista de registros tipo Estado de Ticket.
   * 
   */

  //esto no me sirve
  // public listStateTickets(): Observable<Response> {
  //   let url: string = `${this.url}/dicc-state-tickets/list`;

  //   return this._http.get<Response>(`${url}`, {responseType: 'json'});
  // }

  /**
   * 
   * Método que consulta a la API REST mediante petición HTTP, la lista de registros de tipo Estado de Usuarios.
   * 
   * @returns Observable tipo Response, lista de registros tipo Estado de Usuarios.
   * 
   */
  public listStateUsers(): Observable<Response> {
    let url: string = `${this.url}/dicc-states/list`;

    return this._http.get<Response>(`${url}`, {responseType: 'json'});
  }

  /**
   * 
   * Método que consulta a la API REST mediante petición HTTP, la lista de registros de tipo Asunto.
   * 
   * @returns Observable tipo Response, lista de registros tipo Asunto.
   * 
   */
  //esto no me sirve
  // public listSubjects(): Observable<Response> {
  //   let url: string = `${this.url}/dicc-subjects/list`;

  //   return this._http.get<Response>(`${url}`, {responseType: 'json'});
  // }

  /**
   * 
   * Método que consulta a la API REST mediante petición HTTP, la lista de registros de tipo Prioridad.
   * 
   * @returns Observable tipo Response, lista de registros tipo Prioridad.
   * 
   */
  //esto no me sirve
  // public listPriorities(): Observable<Response> {
  //   let url: string = `${this.url}/dicc-priorities/list`;

  //   return this._http.get<Response>(`${url}`, {responseType: 'json'});
  // }

  /**
   * 
   * Método que devuelve el año actual.
   * 
   * @returns Año actual. 
   * 
   */
  public getYear(): number {
    return new Date().getFullYear();
  }

  /**
   * 
   * Método que establece los elementos HTML que contienen el mensaje flotante.
   * 
   * @param element Elemento HTML que contiene el mensaje flotante.
   * @param progress Elemento HTML que contiene la barra de progreso del mensaje flotante.
   *  
   */
  public setToastElement(element: HTMLElement, progress: HTMLElement): void {
    this.toastElement = element;
    this.toastProgressElement = progress;
  }

  /**
   * 
   * Método que establece los elementos HTML que contienen el modal.
   * 
   * @param element Elemento HTML que contiene el modal.
   * @param content Elemento HTML que contiene el contenido del modal.
   * 
   */
  public setModalElement(element: HTMLElement, content: ViewContainerRef): void {
    this.modalElement = element;
    this.modalContentElement = content;
  }

  /**
   * 
   * Método que establece los elementos HTML que contienen el logo.
   * 
   * @param element Elemento HTML que contiene el modal.
   * 
   */
  public setLogoElement(element: HTMLElement): void {
    this.logoElement = element;
  }

  /**
   * 
   * Método que muestra un mensaje flotante en la parte superior derecha de la pantalla.
   * 
   * @param title Título del mensaje. 
   * @param message Mensaje.
   * @param type Tipo de mensaje.
   * @param icon Icono del mensaje.
   * 
   */
  public showToast(title: string, message: string, type: TypeToast, icon: string): void {
    if (!this.toastElement || !this.toastProgressElement) {
      console.error('Error, toast no definido.');
      return;
    }

    // Configurar texto del mensaje
    const titleElement = this.toastElement.querySelector('.text-1');
    const bodyElement = this.toastElement.querySelector('.text-2');
    const iconElement = this.toastElement.querySelector('ion-icon.icon');
    const checkElement = this.toastElement.querySelector('.check');

    if (titleElement && bodyElement && iconElement && checkElement) {
      titleElement.textContent = title;
      bodyElement.textContent = message;

      // Restablecer clases previas
      checkElement.classList.remove('nice', 'error');

      // Configurar color y clase de icono
      switch (type) {
        case TypeToast.SUCCESS:
          checkElement.classList.add('nice');
          break;
        case TypeToast.DANGER:
          checkElement.classList.add('error');
          break;
        case TypeToast.INFO:
          checkElement.classList.add('info');
          break;
        case TypeToast.WARNING:
          checkElement.classList.add('warning');
          break;
      }

      // Cambiar el icono
      iconElement.setAttribute('name', icon);
    }

    // Mostrar el toast
    this.toastElement.style.display = 'block';
    setTimeout(() => {
      this.toastElement.classList.add('active');
      this.toastProgressElement.classList.add('active');
    }, 100);

    // Ocultar el toast después de 5 segundos
    setTimeout(() => {
      this.toastElement.classList.remove('active');
    }, 5000);

    // Detener barra de progreso
    setTimeout(() => {
      this.toastProgressElement.classList.remove('active');
    }, 5300);

    // Ocultar completamente el toast
    setTimeout(() => {
      this.toastElement.style.display = 'none';
    }, 5900);
  }

  /**
   * 
   * Método que cierra el mensaje flotante.
   * 
   */
  public closeToast(): void {
    if (!this.toastElement || !this.toastProgressElement) {
      console.error('Error, toast no definido.');
      return;
    }
  
    // Remover la clase 'active' para ocultar el toast visualmente
    this.toastElement.classList.remove('active');
  
    // Detener la barra de progreso después de 300ms
    setTimeout(() => {
      this.toastProgressElement.classList.remove('active');
    }, 300);
  
    // Ocultar completamente el toast después de 900ms
    setTimeout(() => {
      this.toastElement.style.display = 'none';
    }, 900);
  }

  /**
   * 
   * Método que muestra un modal en la pantalla.
   * 
   * @param content Componente que se mostrará en el modal.
   * 
   */
  public showModal(content: Type<unknown>): unknown {
    this.modalContentElement.clear();
    this.modalElement.classList.add('show');
    const reference: ComponentRef<unknown> = this.modalContentElement.createComponent(content);
    reference.location.nativeElement.classList.add('model-content');

    return reference.instance;
  }

  /**
   * 
   * Método que cierra el modal.
   * 
   */
  public closeModal(): void {
    this.modalElement.classList.remove('show');
  }

  /**
   * 
   * Método que establece si el logo de la aplicación se muestra borroso o no.
   * 
   * @param isBlur Establece si el logo se muestra borroso o no.
   * 
   */
  public setLogoBlur(isBlur: boolean): void {
    if (this.logoElement) {
      if (isBlur) {
        this.logoElement.classList.add('blur');
      } else {
        this.logoElement.classList.remove('blur');
      }
    }
  }
}
