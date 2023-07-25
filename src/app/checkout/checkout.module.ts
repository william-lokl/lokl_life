import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { LandingmoduleModule } from '../home/landingmodule/landingmodule.module';
import { CheckoutRoutingModule } from './checkout-routing.module';

import { AutentificacionComponent } from './pages/autentificacion/autentificacion.component';
import { InversionComponent } from './pages/inversion/inversion.component';
import { CardComponent } from './components/card/card.component';
import { CardPaymentComponent } from './components/card-payment/card-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    InversionComponent,
    AutentificacionComponent,
    CardComponent,
    CardPaymentComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    CheckoutRoutingModule,
    LandingmoduleModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  providers: [
    // Opcional: Si necesitas ajustar el idioma
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
})
export class CheckoutModule {}
