import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { LandingmoduleModule } from '../home/landingmodule/landingmodule.module';
import { CheckoutRoutingModule } from './checkout-routing.module';

import { AutentificacionComponent } from './pages/autentificacion/autentificacion.component';
import { InversionComponent } from './pages/inversion/inversion.component';


@NgModule({
  declarations: [
    InversionComponent,
    AutentificacionComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    LandingmoduleModule,
    MaterialModule
  ]
})
export class CheckoutModule { }
