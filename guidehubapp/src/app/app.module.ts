import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import  { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './components/home/home.component';
import {MatSelectModule} from '@angular/material/select';
import { QuillModule } from 'ngx-quill';
import { PostDetailsDialogComponent } from './post-details-dialog/post-details-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserdashComponent } from './components/userdash/userdash.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { TagListComponent } from './components/tag-list/tag-list.component';







@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    CategoriesComponent,
    LoginComponent,
    HomeComponent,
    PostDetailsDialogComponent,
    UserdashComponent,
    TagListComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    QuillModule.forRoot(),
    MatDialogModule,
    MatChipsModule,
    MatAutocompleteModule
    
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
