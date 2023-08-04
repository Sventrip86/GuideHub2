import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  // An array to store the categories retrieved from the API
  categories: any[] = [];
  
  // A variable to store the name of a new category to be created
  newCategory = '';

  constructor(private http: HttpClient) { }

  // This method is called when the component is initialized
  ngOnInit() {
    // Send an HTTP GET request to fetch all categories from the API
    this.http.get<any[]>('http://localhost:8080/api/categories').subscribe((categories: any[]) => {
      // Update the 'categories' array with the fetched data
      this.categories = categories;
    });
  }

  // Method to create a new category
  createCategory() {
    // Send an HTTP POST request to create a new category with the provided name
    this.http.post('http://localhost:8080/api/categories', { name: this.newCategory }).subscribe(response => {
      // Handle the response here, probably by refreshing the list of categories
      this.newCategory = ''; // Clear the newCategory variable after creating the category
      this.ngOnInit(); // Refresh the list of categories by calling ngOnInit again
    });
  }
  
  // Method to delete a category by its ID
  deleteCategory(categoryId: number) {
    // Send an HTTP DELETE request to delete the category with the given ID
    this.http.delete('http://localhost:8080/api/categories/' + categoryId).subscribe(
      response => {
        // Handle the response here, probably by refreshing the list of categories
        this.ngOnInit(); // Refresh the list of categories by calling ngOnInit again
      },
      error => {
        console.error('There was an error during the deletion of the category', error);
      }
    );
  }
}
