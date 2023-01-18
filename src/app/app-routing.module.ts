import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { NoAuthGuard } from './noAuth.guard';
import { RecargasComponent } from './components/recargas/recargas.component';
import { RecargabalanceComponent } from './components/recargabalance/recargabalance.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: 'productos/:id',
    canActivate: [AuthGuard],
    component: RecargasComponent,
  },
  {
    path: 'recarga-balance',
    canActivate: [AuthGuard],
    component: RecargabalanceComponent,
  },
  {
    path: '',
    canActivate: [NoAuthGuard],
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
