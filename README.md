# Back-End Groupomania

## Installation :

1. Clone this repo.
2. Install NodeJS + Npm.
3. npm init (terminal)
4. install all dependencies specified in "package.json" (terminal)

### Launch server :

To launch the server use "nodemon server" (terminal)

#### DataBase (SQL) :

To connect to the databade : ....

##### Securisation elements :

Helmet --> securise requests headers.
Email-validator --> force users to create strong passwords
password-validator --> verify if Emails are valids
Bcrypt --> crypt password in DataBase

###### API URI

** USER **
http://localhost:3000/api/user/

/signup -> (post)
Request content : { "username":..., "email":..., "password":...}

/login -> (post)
Request content : {"username":..., "email":..., "password":...}

/update/:id -> (put)
Request content : {"username":..., "email":..., "password":...}

/delete:userId -> (delete)

** POSTS **
http://localhost:3000/api/post/

/ -> (get)
Return all posts in order of date time.

/:id -> (get)
Return one particular post

/ -> (post)
Request content : {"title":..., "content":..., "image":..., "userId":...}

/update/:id -> (put)
Request content : {"title":..., "content":..., "image":...}

/delete -> (delete)
Request content : {"id":...}

** COMMENTS **
http://localhost:3000/api/comment/

/ -> (get)
Return all posts in order of date time.

/:id -> (get)
Return one particular post

/ -> (post)
Request content : {"content":..., "image":..., "userId":..., "postId":...}

/update/:id -> (put)
Request content : {"content":...}

/delete -> (delete)
Request content : {"id":...}
