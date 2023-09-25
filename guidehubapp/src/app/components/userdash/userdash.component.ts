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
  tags: any[] = [];

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

  fetchPosts() {
    console.log('Order By:', this.orderBy);

    let url = `http://localhost:8080/api/posts`;

    // If there's a searchTerm, add it to the URL
    if (this.searchTerm) {
      url += `/search?term=${this.searchTerm}`;
    }

    // If there's an orderBy, add it to the URL
    this.http.get<any[]>(url).subscribe((posts: any[]) => {
        this.posts = this.mapPosts(posts);

        if (this.orderBy === 'desc') {
            this.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else {
            this.posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }
    });
}

mapPosts(posts: any[]) {
  return posts.map(post => ({
      ...post,
      categoryName: this.categories.find(category => category.categoryId === post.category)?.name
  }));
}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/categories').subscribe(categories => {
      this.categories = categories;
    });

    this.fetchPosts();
  }

  searchTerm: string = '';

  onSearch() {
    this.fetchPosts();
  }

  orderBy: string = 'asc';

  onOrder() {
    this.fetchPosts();
  }

}