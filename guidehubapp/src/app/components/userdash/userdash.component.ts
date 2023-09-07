import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { PostDetailsDialogComponent } from 'src/app/post-details-dialog/post-details-dialog.component';



@Component({
  selector: 'app-userdash',
  templateUrl: './userdash.component.html',
  styleUrls: ['./userdash.component.css']
})
export class UserdashComponent implements OnInit{

  categories: any[] = [];
  posts: any[] = [];

  constructor(
    private http: HttpClient, 
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) { }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  openPostDetails(post: any) {
    const dialogRef = this.dialog.open(PostDetailsDialogComponent, {
      width: '80%',
      data: { post: post }
    });
  }

  ngOnInit() {
    // Fetch categories from API
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

  // Handler for deleting a post
  deletePost(postId: number) {
    this.http.delete('http://localhost:8080/api/posts/' + postId).subscribe(response => {
      // Reload posts from API to reflect changes
      this.http.get<any[]>('http://localhost:8080/api/posts').subscribe((posts: any[]) => {
        this.posts = posts;
      });
    });
  }
}