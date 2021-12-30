# Nuxt Shop

[<sup>Go to page on Heroku</sup>](https://nuxt-shop0.herokuapp.com/)<sup>, </sup>[<sup>see project on Figma</sup>](https://www.figma.com/file/8iFDY0q7vOOdhPWl5tYo2Z/Shop-Project?node-id=0%3A1)

Shop with front-end on [Nuxt.js](https://nuxtjs.org), [SCSS](https://sass-lang.com) and back-end on [Express](https://expressjs.com), [MongoDB](https://www.mongodb.com) ([Mongoose](https://mongoosejs.com)). [GitHub of server side](https://github.com/Lothering0/nuxt-shop-server).

## Implemented on project

On back-end:

* Authorization system and capability to change nickname and email
* Creating and deleting goods (with title, price, description, image, characters and categories)
* Adding goods to basket
* Sort goods by nickname, categories
* Sending comments
* Set like/dislike to comments

On front-end:

* Switching light/dark mode
* Infinite scroll system (implemented with [Nuxt Infinite Scroll Module](nuxt-infinite-scroll-module))
* Adaptive design

## Technologies

On front-end:

* [Nuxt.js](https://nuxtjs.org)
* [SCSS](https://sass-lang.com)
* [Normalize.css](https://necolas.github.io/normalize.css/)
* [ScrollReveal](https://scrollrevealjs.org) ([VueScrollReveal](https://www.npmjs.com/package/vue-scroll-reveal))
* [Axios](https://axios-http.com) ([nuxt/axios](https://axios.nuxtjs.org))
* [Form-Data](https://www.npmjs.com/package/form-data)

On back-end:

* [Express 4](https://expressjs.com)
* [MongoDB](https://www.mongodb.com) ([Mongoose](https://mongoosejs.com))
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [cookie-parser](https://www.npmjs.com/package/bcrypt)
* [cors](https://www.npmjs.com/package/cors)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express-validator](https://express-validator.github.io/docs/)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [Multer](https://www.npmjs.com/package/multer)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```