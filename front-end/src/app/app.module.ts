import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { AppGuard } from './app.guard';
import { CookieService } from 'ngx-cookie-service';
import { AppInterceptor } from './app.interceptor';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

//
import { LibrarianComponent } from './views/librarian/librarian.component';
import { SubjectComponent } from './views/subject/subject.component';
import { AuthorComponent } from './views/author/author.component';
import { ReaderTypeComponent } from './views/reader-type/reader-type.component';
import { ReaderComponent } from './views/reader/reader.component';
import { ModalModule, CollapseModule } from 'ngx-bootstrap';
import { BookTitleComponent } from './views/book-title/book-title.component';
@NgModule({
  imports: [
    BrowserModule,
    //
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    ChartsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    //
    LibrarianComponent,
    SubjectComponent,
    AuthorComponent,
    ReaderTypeComponent,
    ReaderComponent,
    BookTitleComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    CookieService,
    AppGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
