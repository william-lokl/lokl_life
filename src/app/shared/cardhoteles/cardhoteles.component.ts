import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardhoteles',
  templateUrl: './cardhoteles.component.html',
  styleUrls: ['./cardhoteles.component.scss'],
})
export class CardhotelesComponent implements OnInit {
  @Input() src: string = '';
  @Input() titulo: string = '';
  @Input() retorno: string = '';
  @Input() inversionistas: string = '';
  @Input() unidades: string = '';
  @Input() total_invertido: string = '';
  @Input() precio_unitario: string = '';
  constructor() {}

  ngOnInit(): void {}
}
