import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardDataElement } from '../../interfaces/cardDataElement.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  inputCursor: boolean = false

  @Output() onNextStep: EventEmitter<number> = new EventEmitter<number>();

  @Input() resolucion_movil: boolean = false;

  @Input() data: CardDataElement = {
    dues: 0,
    pay: 0,
    units: 0,
    value: 0,
    annualReturn: 0,
  }

  duesMap = {
    '=1': 'Un pago de:',
    'other': 'Cuotas mensuales de:'
  }

  monthsMap = {
    '=1': '1 mes',
    'other': '# meses'
  }

  nextStep(){
    this.onNextStep.emit(this.data.dues)
  }

}
