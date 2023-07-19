import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './error.interceptor';
import { JwtInterceptor } from './jwt.interceptor';
import { LoadingService } from './services/loading.service';

import { ReplacePipe } from '../app/pipes/replace-pipe';
import { FilterPipe } from '../app/pipes/filter-pipe';
import { ClickOutsideDirective } from './click-outside.directive';

import { HotToastModule } from '@ngneat/hot-toast';
import { SwiperModule } from 'swiper/angular';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BnNgIdleService } from 'bn-ng-idle';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatDividerModule } from '@angular/material/divider';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, ReplacePipe, FilterPipe, ClickOutsideDirective],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    // NgxPrintModule,
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
    YouTubePlayerModule,
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
