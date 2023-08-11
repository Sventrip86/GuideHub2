import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PostDetailsDialogComponent } from 'src/app/post-details-dialog/post-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';








@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postForm: FormGroup;
  categories: any[] = [];

  displayedColumns: string[] = ['postId', 'title', 'category', 'date', 'actions'];
  //////////////////////////////////////////////////////// TESTING FORM QUILL
  testForm: FormGroup;

///////////////////////////////////////////////////////
  // Form for creating a new post
  newPost = { title: '', body: '' };

  // Form for editing an existing post
  editedPost = { title: '', body: '' };

  posts: any[] = [];

  constructor(
    private http: HttpClient, 
    private formBuilder: FormBuilder, 
    private sanitizer: DomSanitizer,
    private dialog: MatDialog ) { 
    // Initializing the postForm
    this.postForm = this.formBuilder.group({
      title: '',
      body: '',
      categoryId: ''
    });

    // Initializing the testForm for Quill
    this.testForm = this.formBuilder.group({
      editorContent: ['', Validators.required]
    });

    
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  openPostDetails(post: any) {
    const dialogRef = this.dialog.open(PostDetailsDialogComponent, {
      width: '80%',
      data: { post: post }
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
