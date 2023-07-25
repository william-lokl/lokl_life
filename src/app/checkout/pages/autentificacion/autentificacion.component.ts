import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-autentificacion',
  templateUrl: './autentificacion.component.html',
  styleUrls: ['./autentificacion.component.scss'],
})
export class AutentificacionComponent implements OnInit {
  selectedDate: any;
  resolucion_movil: boolean = false;
  paso1: boolean = true;
  paso2: boolean = false;
  paso3: boolean = false;
  constructor() {}

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    const newWidth = (event.target as Window).innerWidth;
    const newHeight = (event.target as Window).innerHeight;

    // Tu lógica para manejar el cambio de resolución
    console.log(`Nueva resolución: ${newWidth}x${newHeight}`);

    if (newWidth < 992) {
      this.resolucion_movil = true;
      console.log(this.resolucion_movil);
    }

    if (newWidth > 992) {
      this.resolucion_movil = false;
      console.log(this.resolucion_movil);
    }
  }

  ngOnInit(): void {
    const initialWidth = window.innerWidth;
    const initialHeight = window.innerHeight;

    if (initialWidth < 992) {
      this.resolucion_movil = true;
      console.log(this.resolucion_movil);
    }

    if (initialWidth > 992) {
      this.resolucion_movil = false;
      console.log(this.resolucion_movil);
    }
  }

  public changeStep() {
    if (this.paso1) {
      this.paso1 = false;
      this.paso2 = true;
      return;
    }

    if (this.paso2) {
      this.paso2 = false;
      this.paso3 = true;
      return;
    }
  }
}
