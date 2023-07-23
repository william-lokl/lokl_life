import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LandinpageComponent } from '../landinpage/landinpage.component';
import { LoginComponent } from 'src/app/login/login.component';
import { AutentificacionComponent } from 'src/app/autentificacion/autentificacion.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LandinpageComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'test',
        component: AutentificacionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingmoduleRoutingModule {}
