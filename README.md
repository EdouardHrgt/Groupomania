# Groupomania

By Edouard Herrengt, Student at OpenClassrooms (October 2021 - June 2022).
Project n°7 : build an intern social network for 'Groupomania Inc'.

Technologies used :
Backend : `[NodeJs, Express, MySQL Workbench ]`
Fontend : `[Vue-cli, Axios, Vuex, vue-router, HTML5, CSS3 ]`
Assets and Svgs from : `[https://www.svgbackgrounds.com/, https://www.pexels.com/]`

## Installation :

### Backend : 
1. Clone this repo.
2. Install NodeJS + Npm.
3. install all dependencies with : `npm install` 
5. rename ".env-copy" in ".env" and complete it with your infos
6. rename ".images" folder as "images"
7. run server with command : `nodemon server`
8. /!\ if the server stop running at first start with error "Database..." just reboot it once

### Frontend : 
1. Clone this repo.
2. install all dependencies with `npm install`
3. run server with command : `npm run serve`
4. connect to http://localhost:8080/

#### DataBase (MySQL Workbench) :
To Enjoy all ADMIN features on the app Feel free to update your account with this command directly on DB: 
Be sure to change values bu your database name and your username account !
`UPDATE Your-DB-Name.user SET permission='admin' WHERE username='Your-Username';`

(For security purposes ranking an admin is not able directly on the app...)
