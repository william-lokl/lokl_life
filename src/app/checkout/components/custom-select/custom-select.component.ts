import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomSelectElement } from '../../interfaces/customSelectElement.interface';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
})
export class CustomSelectComponent implements OnInit {
  @Input() selectSelected: boolean = false;
  @Input() data: CustomSelectElement[] = [];
  @Input() public ssColor: string = "#7c3aed";
  @Input() justIzquierda: boolean = false;

  desplegar = false;

  @Output('onOpcionSeleccionada') onOpcionSeleccionada: EventEmitter<CustomSelectElement> = new EventEmitter<CustomSelectElement>();


  dataLength?: number;

  elementSelected!: CustomSelectElement;



  constructor() {}

  ngOnInit(): void {
    this.dataLength = this.data.length - 1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].selected == true) {
        this.elementSelected = this.data[i];
        return;
      }
    }

    this.data[0].selected = true;
    this.elementSelected = this.data[0];
  }

  clickSelect() {
    this.selectSelected = true;
    this.desplegar = !this.desplegar;
  }

  onClickOption(element: CustomSelectElement) {
    const oldName = this.elementSelected.name;

    this.elementSelected = element;

    this.desplegar = false;

    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].name == oldName) this.data[i].selected = false;
    }

    this.onOpcionSeleccionada.emit(element);
  }
}
