import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { NoAuthGuard } from './noAuth.guard';

import { LandinpageComponent } from './home/landinpage/landinpage.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { RegisterComponent } from './home/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/landingmodule/landingmodule.module').then(
            (m) => m.LandingmoduleModule
          ),
      },
    ],
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
