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


@NgModule({
  declarations: [
    InversionComponent,
    AutentificacionComponent,
    CardComponent,
    CardPaymentComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    LandingmoduleModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CheckoutModule { }
