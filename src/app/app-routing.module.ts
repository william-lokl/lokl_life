import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { NoAuthGuard } from './noAuth.guard';
import { RecargasComponent } from './components/recargas/recargas.component';
import { RecargabalanceComponent } from './components/recargabalance/recargabalance.component';
import { CambiarpassComponent } from './components/cambiarpass/cambiarpass.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { PermissionGuard } from './permission.guard';
import { VentaremotaComponent } from './components/ventaremota/ventaremota.component';
import { ProductosComponent } from './utilities/productos/productos.component';
import { PinesComponent } from './components/pines/pines.component';
import { RecaudoclaroComponent } from './components/recaudoclaro/recaudoclaro.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    resolve: [PermissionGuard],
    component: DashboardComponent,
  },
  {
    path: 'recargas',
    canActivate: [AuthGuard],
    resolve: [PermissionGuard],
    component: RecargasComponent,
  },
  {
    path: 'pines',
    canActivate: [AuthGuard],
    resolve: [PermissionGuard],
    component: PinesComponent,
  },
  {
    path: 'recaudo',
    canActivate: [AuthGuard],
    resolve: [PermissionGuard],
    component: RecaudoclaroComponent,
  },
  {
    path: 'recarga-balance',
    canActivate: [AuthGuard],
    resolve: [PermissionGuard],
    component: RecargabalanceComponent,
  },
  {
    path: 'cambiar-clave',
    canActivate: [AuthGuard],
    resolve: [PermissionGuard],
    component: CambiarpassComponent,
  },
  {
    path: 'reportes',
    canActivate: [AuthGuard],
    resolve: [PermissionGuard],
    component: ReportesComponent,
  },
  {
    path: 'ventaremota',
    canActivate: [AuthGuard],
    resolve: [PermissionGuard],
    component: VentaremotaComponent,
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
