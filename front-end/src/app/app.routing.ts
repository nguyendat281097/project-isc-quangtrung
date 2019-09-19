import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { LibrarianComponent } from './views/librarian/librarian.component';
import { AuthorComponent } from './views/author/author.component';
import { SubjectComponent } from './views/subject/subject.component';
import { ReaderTypeComponent } from './views/reader-type/reader-type.component';
import { BookTitleComponent } from './views/book-title/book-title.component';
import { AppGuard } from './app.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'book-title',
    component: DefaultLayoutComponent,
    canActivate: [AppGuard],
    data: {
      title: 'Book Title'
    },
    children: [
      //
      {
        path: '',
        component: BookTitleComponent,
      },
    ]
  },
  {
    path: 'librarian',
    component: DefaultLayoutComponent,
    canActivate: [AppGuard],
    data: {
      title: 'Librarian'
    },
    children: [
      //
      {
        path: '',
        component: LibrarianComponent,
      },
    ]
  },
  {
    path: 'author',
    component: DefaultLayoutComponent,
    canActivate: [AppGuard],
    data: {
      title: 'Author'
    },
    children: [
      //
      {
        path: '',
        component: AuthorComponent,
      },
    ]
  },
  {
    path: 'subject',
    component: DefaultLayoutComponent,
    canActivate: [AppGuard],
    data: {
      title: 'Subject'
    },
    children: [
      //
      {
        path: '',
        component: SubjectComponent,
      },
    ]
  },
  {
    path: 'reader-type',
    component: DefaultLayoutComponent,
    canActivate: [AppGuard],
    data: {
      title: 'Reader Type'
    },
    children: [
      //
      {
        path: '',
        component: ReaderTypeComponent,
      },
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AppGuard],
    data: {
      title: 'Home'
    },
    children: [
      //
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
