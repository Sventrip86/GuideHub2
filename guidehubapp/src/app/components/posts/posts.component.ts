import { Component, OnInit,  ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray  } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PostDetailsDialogComponent } from 'src/app/post-details-dialog/post-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { __values } from 'tslib';





@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, AfterViewInit  {

  postForm: FormGroup;
  categories: any[] = [];
  allTags: { tagId: number, name: string }[] = [];
  selectedTags: { tagId: number, name: string }[] = [];
  displayedColumns: string[] = ['postId', 'title', 'category', 'date', 'actions'];
  // Form for testing Quill
  testForm: FormGroup;
  // Form for creating a new post
  newPost = { title: '', body: '' };
  searchTerm: string = '';
  orderBy: 'asc' | 'desc' = 'asc'; // set default to ascending
  filteredTags: Observable<{ tagId: number, name: string }[]>;
  // Form for editing an existing post
  editedPost = { title: '', body: '' };
  posts: any[] = [];

  @ViewChild('tagInput') tagInput: any;


  constructor(
    private http: HttpClient, 
    private formBuilder: FormBuilder, 
    private sanitizer: DomSanitizer,
    private dialog: MatDialog ) { 
    // Initializing the postForm
    this.postForm = this.formBuilder.group({
      title: '',
      body: '',
      categoryId: '',
      tagInput: [''],
      tags: this.formBuilder.array([])
  });

  this.filteredTags = this.tagInputControl.valueChanges.pipe(
    startWith(null),
    map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));

    


    // Initializing the testForm for Quill
    this.testForm = this.formBuilder.group({
      editorContent: ['', Validators.required]
    });

    
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private _filter(value: string): { tagId: number, name: string }[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.name.toLowerCase().includes(filterValue));
  }

  addTagFromAutocomplete(event: MatAutocompleteSelectedEvent) {
    const selectedTag = event.option.value as { tagId: number, name: string };
    if (selectedTag) {
        this.tags.push(this.formBuilder.control(selectedTag.name));  
        this.selectedTags.push(selectedTag);
        this.tagInputControl.setValue('');
    }
}


addTagFromButton() {
  const newTagName = this.tagInputControl.value.trim();
  // Check if tag already exists in the local allTags array
  const existingTag = this.allTags.find(tag => tag.name.toLowerCase() === newTagName.toLowerCase());

  if (existingTag) {
      // The tag already exists, simply add it to the selectedTags and to the form
      this.tags.push(this.formBuilder.control(existingTag.name));
      this.selectedTags.push(existingTag);
      this.tagInputControl.setValue('');
  } else {
      // The tag doesn't exist in our local copy, so try to create it in the DB
      this.http.post<{ tagId: number, name: string }>('http://localhost:8080/api/tags', { name: newTagName })
          .subscribe(newTag => {
              this.allTags.push(newTag);  // add new tag to our local copy
              this.tags.push(this.formBuilder.control(newTag.name));
              this.selectedTags.push(newTag);
              this.tagInputControl.setValue('');
          }, error => {
              if (error && error.error && error.error.error.includes("Duplicate entry")) {
                  console.error('Tag already exists in the database. Handle accordingly.');
                  // You may choose to fetch all tags again here to sync local copy with DB, or handle in some other way.
              } else {
                  console.error('Error creating new tag:', error);
              }
          });
  }
}

  get tags(): FormArray {
    return this.postForm.get('tags') as FormArray;
}

get tagInputControl(): FormControl {
  return this.postForm.get('tagInput') as FormControl;
}


removeTag(index: number) {
  this.tags.removeAt(index);
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
        }}, error => {
          console.error('Error fetching posts:', error);
        
    });
}

ngAfterViewInit() {
  this.postForm.get('categoryId')?.valueChanges.subscribe(categoryId => {
      console.log('Category ID:', categoryId);
      this.fetchPosts();
  });
}

mapPosts(posts: any[]) {
    return posts.map(post => ({
        ...post,
        categoryName: this.categories.find(category => category.categoryId === post.category)?.name
    }));
}

  // Fetch categories from API
  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/api/categories').subscribe((categories: any[]) => {
      this.categories = categories;
      this.fetchPosts(); // Use fetchPosts method instead of direct http call 
    
    }, error => {
      console.error('Error fetching categories:', error);
    });

         // Fetch tags from API

         this.http.get<{ tagId: number, name: string }[]>('http://localhost:8080/api/tags').subscribe((tags) => {
          this.allTags = tags;
        }, error => {
          console.error('Error fetching tags:', error);
        });
  }
  


  
  // Handler for form submission
  onSubmit(): void {
    
    console.log(this.postForm.value);
    const { tagInput, tags, ...postData } = this.postForm.value;

    postData.tags = tags;

    // Add category name
    postData.category = {
        name: this.categories.find(category => category.categoryId === Number(postData.categoryId))?.name
    };
  
    console.log(postData);
    
    // Post the data to the server
    this.http.post('http://localhost:8080/api/posts', postData).subscribe(res => {
      console.log(res);
      // Reset the form
      this.postForm.reset();
      this.fetchPosts();  // After a new post is added, fetch the posts again
    });
  }

  // Handler for deleting a post
  deletePost(postId: number) {
    this.http.delete('http://localhost:8080/api/posts/' + postId).subscribe(response => {
      this.fetchPosts(); // After a post is deleted, fetch the posts again
    });
  }

}

  



