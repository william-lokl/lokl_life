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
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPrintModule,
    ToastrModule.forRoot({
      toastComponent: ToastsContainer, // added custom toast!
    }),
  ],
  providers: [
    LoadingService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  entryComponents: [ToastsContainer],
  bootstrap: [AppComponent],
})
export class AppModule {}
