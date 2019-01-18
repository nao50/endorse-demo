import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// guard
import { AuthGuard } from './guards/auth.guard';

// Component
import { TopComponent } from './top/top.component';
import { LoginTokenComponent } from './login-token/login-token.component';
import { LoginBasicComponent } from './login-basic/login-basic.component';
import { BasicTopComponent } from './basic-top/basic-top.component';
import { TokenTopComponent } from './token-top/token-top.component';

const routes: Routes = [
  {
    path: 'logintoken',
    component: LoginTokenComponent,
  },
  {
    path: 'loginbasic',
    component: LoginBasicComponent,
  },
  {
    path: 'top',
    component: TopComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-token-top',
    component: TokenTopComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-basic-top',
    component: BasicTopComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: LoginBasicComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
