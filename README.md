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

Ajout d'un compteur de commentaire sur les posts
extention WCAG color contrast checker

Récursivité
Singleton
Closure

SELECT COUNT(CASE WHEN postId = '63' THEN 1 ELSE NULL END) AS totalLikes FROM likes;
SELECT LIKES.*, USER.username FROM LIKES JOIN USER ON LIKES.userId = USER.id WHERE postID = ${id}