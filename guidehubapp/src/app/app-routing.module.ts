import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { UserdashComponent } from './components/userdash/userdash.component';

const routes: Routes = [

    { path: '', component: HomeComponent },

  { path: 'posts', component: PostsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'userdash', component: UserdashComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
