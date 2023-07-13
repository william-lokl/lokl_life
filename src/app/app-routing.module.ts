import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { NoAuthGuard } from './noAuth.guard';
import { RecargasComponent } from './components/recargas/recargas.component';
import { CambiarpassComponent } from './components/cambiarpass/cambiarpass.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { PermissionGuard } from './permission.guard';
import { VentaremotaComponent } from './components/ventaremota/ventaremota.component';
import { ProductosComponent } from './utilities/productos/productos.component';
import { PinesComponent } from './components/pines/pines.component';
import { RecaudoclaroComponent } from './components/recaudoclaro/recaudoclaro.component';
import { LandinpageComponent } from './landinpage/landinpage.component';

const routes: Routes = [
  {
    path: '',
    component: LandinpageComponent,
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
