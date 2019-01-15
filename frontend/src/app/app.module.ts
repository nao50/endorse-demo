import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Guard
import { AuthGuard } from './guards/auth.guard';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatSidenavModule,
  MatGridListModule,
  MatTableModule,
  MatDialogModule,
  MatSelectModule,
  MatBadgeModule,
} from '@angular/material';


// Componemt
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
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
     // material
     BrowserAnimationsModule,
     MatToolbarModule,
     MatIconModule,
     MatCardModule,
     MatButtonModule,
     MatMenuModule,
     MatInputModule,
     MatFormFieldModule,
     MatListModule,
     MatSidenavModule,
     MatGridListModule,
     MatTableModule,
     MatDialogModule,
     MatSelectModule,
     MatBadgeModule,
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
