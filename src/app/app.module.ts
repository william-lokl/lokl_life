import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ToastsContainer } from './components/toast-container/toast-container.component';
import { ErrorInterceptor } from './error.interceptor';
import { JwtInterceptor } from './jwt.interceptor';
import { LoadingService } from './services/loading.service';
import { RecargasComponent } from './components/recargas/recargas.component';

import { ReplacePipe } from '../app/pipes/replace-pipe';
import { FilterPipe } from '../app/pipes/filter-pipe';
import { ClickOutsideDirective } from './click-outside.directive';
import { NgxPrintModule } from 'ngx-print';
//import { NgxPayPalModule } from 'ngx-paypal';
import { HotToastModule } from '@ngneat/hot-toast';
import { SwiperModule } from 'swiper/angular';
import { CambiarpassComponent } from './components/cambiarpass/cambiarpass.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { VentaremotaComponent } from './components/ventaremota/ventaremota.component';
import { VentarRedeslComponent } from './utilities/ventar-redesl/ventar-redesl.component';
import { ProductosComponent } from './utilities/productos/productos.component';
import { PinesComponent } from './components/pines/pines.component';
import { RecaudoclaroComponent } from './components/recaudoclaro/recaudoclaro.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BnNgIdleService } from 'bn-ng-idle';
import { LandinpageComponent } from './landinpage/landinpage.component';
import { MinuteroComponent } from './shared/minutero/minutero.component';
import { FooterComponent } from './shared/footer/footer.component';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SteperComponent } from './shared/steper/steper.component';
import { MatTabContent, MatTabGroup } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { PreguntasComponent } from './shared/preguntas/preguntas.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    ToastsContainer,
    RecargasComponent,
    ReplacePipe,
    FilterPipe,
    ClickOutsideDirective,
    CambiarpassComponent,
    ReportesComponent,
    VentaremotaComponent,
    VentarRedeslComponent,
    ProductosComponent,
    PinesComponent,
    RecaudoclaroComponent,
    LandinpageComponent,
    MinuteroComponent,
    FooterComponent,
    SteperComponent,
    PreguntasComponent,
    SidenavComponent,
    RegisterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    // NgxPrintModule,
    ToastrModule.forRoot({
      toastComponent: ToastsContainer, // added custom toast!
    }),
    //NgxPayPalModule,
    HotToastModule.forRoot({ duration: 5000 }),
    SwiperModule,
    NgbModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatSidenavModule,
  ],
  providers: [
    BnNgIdleService,
    LoadingService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
