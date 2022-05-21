# Groupomania

By Edouard Herrengt, Student at OpenClassrooms (October 2021 - June 2022).
Project n°7 : build an intern social network for 'Groupomania Inc'.

Technologies used :
Backend : `[NodeJs, Express, MySQL Workbench ]`
Fontend : `[Vue-cli.2, Axios, Vuex, vue-router, HTML5, CSS3 ]`
Assets and Svgs from : `[https://www.svgbackgrounds.com/, https://www.pexels.com/]`

## Installation :

### Backend : 
1. Clone this repo.
2. Install NodeJS + Npm.
3. Initialise project with : `npm init` (terminal)
4. install all dependencies with : `npm install` (terminal) 
5. run server with command : `nodemon server`

### Frontend : 
1. Clone this repo.
2. install all dependencies with `npm install` (terminal)
3. run server with command : `npm run serve`

#### DataBase (MySQL Workbench) :
To Enjoy all ADMIN features on the app Feel free to update your account with this command directly on DB: 
`UPDATE groupomania.user SET permission='admin' WHERE username='pu your username here';`
(For security purposes ranking an admin is not able directly on the app...)


    getComments() {
      const postId = this.postId;
      const offset = this.integer;
      const exclude = this.excludeList; // array /!\

      axios
        .get(
          `${url}comment/limited/`,
          { headers },
          { params: {
              postId,
              offset,
              exclude
            },
            paramsSerializer: function (params) {
              return qs.stringify(params, { arrayFormat: 'repeat' })
            },
          }
        )
        .then((res) => {

          if (res.status == 204) {
            this.errorMsg = 'No comments to display'
            setTimeout(() => { this.errorMsg = '' }, 1000)

          } else {
            this.integer += 3;
            res.data.map((n) => this.comments.push(n))
          }

        })
        .catch((err) => {
          console.error(err)
        });
    },