import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { NoAuthGuard } from './noAuth.guard';

import { LandinpageComponent } from './landinpage/landinpage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LandinpageComponent,
    /* children: [
      { path: 'registro', component: RegisterComponent }, // Ruta para el componente de registro dentro de LandingPageComponent
      // Otras rutas hijas de LandingPageComponent...
    ], */
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
