# 
# GuideHub2

## Project Description

This project is a note/blog application developed using Angular on the front end and Spring Boot on the back end. The main functionality of the application is managing blog posts and categories. Here are some of the key features of the application:

- **Creating a Post**: Users can create a new blog post with a title, body content, and associated category. The blog post form includes fields for each of these attributes, and the form validates user input to ensure that all fields are filled in.

- **Displaying Posts**: All created posts are displayed in a list on the main page. Each post displays its title, the content of the body, the date it was created, and the name of its associated category. 

- **Deleting and Updating Posts**: Next to each post in the list, there are buttons to delete the post or edit its details. The delete button removes the post permanently, while the edit button allows the user to modify the post's title, body, and category.

- **Managing Categories**: The application includes a separate page for managing categories. On this page, users can create new categories, view a list of all existing categories, and delete categories.

The application uses a MySQL database for persistence and Hibernate to interact with the database. It follows a RESTful architecture, with the Angular front end making HTTP requests to the Spring Boot back end to perform CRUD operations.


## License

This project is licensed under the MIT License.
