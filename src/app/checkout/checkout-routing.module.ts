import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InversionComponent } from './pages/inversion/inversion.component';
import { AutentificacionComponent } from './pages/autentificacion/autentificacion.component';

const routes: Routes = [
  {path: 'invest', component: InversionComponent},
  {path: 'personal-data', component: AutentificacionComponent},
  {path: '', redirectTo: 'invest', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CheckoutRoutingModule { }
