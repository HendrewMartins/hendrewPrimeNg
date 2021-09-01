import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AdminComponent } from './pages/admin/admin.component';
import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { HeaderComponent } from './pages/admin/header/header.component';
import { MenuComponent } from './pages/admin/menu/menu.component';
import { FormularioModule } from './modules/formulario/formulario.module';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    ToolbarModule,
    ButtonModule,
    SidebarModule,
    FormularioModule
  ],
 

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
