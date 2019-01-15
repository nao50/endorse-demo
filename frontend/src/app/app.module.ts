import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopComponent } from './top/top.component';
import { LoginTokenComponent } from './login-token/login-token.component';
import { LoginBasicComponent } from './login-basic/login-basic.component';

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    LoginTokenComponent,
    LoginBasicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
