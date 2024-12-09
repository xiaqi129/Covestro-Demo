import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DynamicFormComponent } from './my-form/dynamic-form/dynamic-form.component';
import { SelectFormComponent } from './select-form/select-form.component';
import { MaterialFormComponent } from './my-form/form/material/material-form.component';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [AppComponent, SelectFormComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DynamicFormComponent,
    MaterialFormComponent,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
