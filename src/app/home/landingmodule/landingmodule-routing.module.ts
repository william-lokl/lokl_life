import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LandinpageComponent } from '../landinpage/landinpage.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingmoduleRoutingModule {}
