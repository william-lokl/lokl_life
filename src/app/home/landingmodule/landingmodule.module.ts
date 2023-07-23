import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingmoduleRoutingModule } from './landingmodule-routing.module';
import { SteperComponent } from 'src/app/shared/steper/steper.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { RegisterComponent } from '../register/register.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import { PreguntasComponent } from 'src/app/shared/preguntas/preguntas.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { LandinpageComponent } from '../landinpage/landinpage.component';
import { MinuteroComponent } from 'src/app/shared/minutero/minutero.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { LoginComponent } from 'src/app/login/login.component';
import { SidenavComponent } from 'src/app/shared/sidenav/sidenav.component';
import { CardhotelesComponent } from 'src/app/shared/cardhoteles/cardhoteles.component';
import { AutentificacionComponent } from 'src/app/autentificacion/autentificacion.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FiledropComponent } from 'src/app/shared/filedrop/filedrop.component';

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
    AutentificacionComponent,
    FiledropComponent,
  ],
  imports: [
    CommonModule,
    LandingmoduleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatDatepickerModule,
    YouTubePlayerModule,
    NgxFileDropModule,
  ],
})
export class LandingmoduleModule {}
