
# Flask backend

Uses flask, sqlalchemy and postgreSQL as the backend of the project.
All the apis created are RESTfull. 
 


## Tables

Contains 3 tables 

* User Table: will contain username and password
* Post Table: will contain post details and user id who posted
* Comments Table: will contain comment content, post id and user id



## APIS

*/login:* Method: POST, takes in username and password.

*/register:* Method: POST, takes in username and password.

*/create_post:* Method: POST, takes in id(user_id), title(post title) and content(post content).

*/get_all_posts:* Method: GET, will return all posts.

*/get_user_posts:* Method: POST, takes in id(post_id), will return all posts of a single user.

*/get_post:* Method: POST, takes in post_id, will return a single post with comments.

*/create_comment:* Method: POST, takes in user_id, post_id and content



    
