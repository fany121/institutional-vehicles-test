import { AfterViewInit, Component, ElementRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Mis clases.

// import { GlobalService } from './services/global/global.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'login-app';
}

/**
 * 
 * Componente principal de todo proyecto Angular.
 * 
 */