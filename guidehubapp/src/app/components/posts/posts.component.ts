import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postForm: FormGroup;
  categories: any[] = [];

  displayedColumns: string[] = ['postId', 'title', 'category', 'body', 'date', 'actions'];


  // Form for creating a new post
  newPost = { title: '', body: '' };

  // Form for editing an existing post
  editedPost = { title: '', body: '' };

  posts: any[] = [];

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { 
    // Initializing the postForm
    this.postForm = this.formBuilder.group({
      title: '',
      body: '',
      categoryId: ''
        });
  }

  // Fetch categories from API
  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/api/categories').subscribe((categories: any[]) => {
      this.categories = categories;
  
      // Fetch posts from API
      this.http.get<any[]>('http://localhost:8080/api/posts').subscribe((posts: any[]) => {
        // Associate each post with its category name
        this.posts = posts.map(post => ({
          ...post,
          categoryName: this.categories.find(category => category.categoryId === post.category)?.name
        }));
      });
    });
  }

  // Handler for form submission
  onSubmit(): void {
    // Create postData object
    const postData = {
      ...this.postForm.value,
          // Category is now an object with a name property

      category: {
        name: this.categories.find(category => category.categoryId === Number(this.postForm.value.categoryId))?.name
      }
    };
  
    console.log(postData);
  
    // Post the data to the server
    this.http.post('http://localhost:8080/api/posts', postData).subscribe(res => {
      console.log(res);
      // Reset the form
      this.postForm.reset();
    });
  }

  // Handler for deleting a post
  deletePost(postId: number) {
    this.http.delete('http://localhost:8080/api/posts/' + postId).subscribe(response => {
      // Handle response here
      // Reload posts from API to reflect changes
      this.http.get<any[]>('http://localhost:8080/api/posts').subscribe((posts: any[]) => {
        this.posts = posts;
      });
    });
  }

  // Handler for updating a post
  updatePost(postId: number, post: any) {
    this.http.put('http://localhost:8080/api/posts/' + postId, post).subscribe(response => {
      // Handle response here
      // Reload posts from API to reflect changes
      this.http.get<any[]>('http://localhost:8080/api/posts').subscribe((posts: any[]) => {
        this.posts = posts;
      });
    });
  }
}
