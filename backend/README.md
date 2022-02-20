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

/delete -> (delete)
Request content : {"userId":...}

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

exports.updatePost = (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const content = req.body.content;
  console.log(req.file);
  // if (req.file) {
    db.query(`SELECT * FROM post WHERE id= ?`, id, (err, result, fields) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json({result});

      if (result[0].imageUrl == null) {
        console.log('No image in this post...');
      } else {
        const filename = result[0].imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('image deleted...');
          }
        });
      }
    });
  };
}