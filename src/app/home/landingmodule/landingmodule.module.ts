import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingmoduleRoutingModule } from './landingmodule-routing.module';
import { SteperComponent } from 'src/app/shared/steper/steper.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { RegisterComponent } from '../register/register.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PreguntasComponent } from 'src/app/shared/preguntas/preguntas.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { LandinpageComponent } from '../landinpage/landinpage.component';
import { MinuteroComponent } from 'src/app/shared/minutero/minutero.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { LoginComponent } from 'src/app/home/login/login.component';
import { SidenavComponent } from 'src/app/shared/sidenav/sidenav.component';
import { CardhotelesComponent } from 'src/app/shared/cardhoteles/cardhoteles.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FiledropComponent } from 'src/app/shared/filedrop/filedrop.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    SteperComponent,
    NavbarComponent,
    SidenavComponent,
    PreguntasComponent,
    FooterComponent,
    LandinpageComponent,
    MinuteroComponent,
    RegisterComponent,
    LoginComponent,
    CardhotelesComponent,
    FiledropComponent
  ],
  exports:[
    MinuteroComponent,
    FooterComponent,
    FiledropComponent,
  ],
  imports: [
    CommonModule,
    LandingmoduleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    YouTubePlayerModule,
    NgxFileDropModule,
  ],
})
export class LandingmoduleModule {}
