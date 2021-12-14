const address = 'http://localhost:9000/api'
const limit = 8

export const state = () => ({
  posts: [],
  post: null,
  userPosts: [],
  postsByCategory: [],
  basket: [],
  enough: false
})

export const mutations = {
  pushPosts(state, posts) {
    state.posts = [...state.posts, ...posts]
  },
  clearPosts(state) {
    state.posts = []
  },

  setPost(state, post) {
    state.post = post
  },

  pushUserPosts(state, posts) {
    state.userPosts = [...state.userPosts, ...posts]
  },
  clearUserPosts(state) {
    state.userPosts = []
  },

  setPostsByCategory(state, posts) {
    state.postsByCategory = posts
  },
  pushPostsByCategory(state, posts) {
    state.postsByCategory = [...state.postsByCategory, ...posts]
  },
  clearPostsByCategoryName(state) {
    state.postsByCategory = []
  },

  removeUserPost(state, post_id) {
    state.userPosts = state.userPosts.filter(el => el._id !== post_id)
  },

  addPost(state, post) {
    state.posts.unshift(post)
    state.userPosts.unshift(post)
  },
  removePost(state, post_id) {
    state.posts = state.posts.filter(el => el._id !== post_id)
  },

  pushBasket(state, posts) {
    state.basket = [...state.basket, ...posts]
  },
  clearBasket(state) {
    state.basket = []
  },
  updateBasket(state, [post_id, value]) {
    state.posts = state.posts.map(post => {
      if (post._id == post_id) {
        return post = {
          ...post,
          in_basket: value
        }
      }

      return post
    })
  },
  removePostFromBasket(state, post_id) {
    state.basket = state.basket.filter(el => el._id !== post_id)
  },

  switchEnough(state, isEnough) {
    state.enough = isEnough
  }
}

export const actions = {
  async fetch({ commit }, page = 1) {
    try {
      const posts = await this.$axios.$get(`${address}/posts?limit=${limit}&page=${page}`, {
        withCredentials: true
      })

      if (posts) {
        commit('pushPosts', posts)
        posts.length < limit && commit('switchEnough', true)
      }
    } catch (e) {
      console.log(e.message)
    }
  },
  async fetchByUserId({ commit }, [id, page]) {
    try {
      if (!id) id = this.state.auth.userId
      if (!page) page = 1

      const posts = await this.$axios.$get(`${address}/posts/user/${id}?limit=${limit}&page=${page}`, {
        withCredentials: true
      })

      if (posts) {
        commit('pushUserPosts', posts)
        posts.length < limit && commit('switchEnough', true)
      }
    } catch (e) {
      console.log(e.message)
    }
  },
  async fetchById({ commit }, id) {
    try {
      const post = await this.$axios.$get(`${address}/posts/${id}`, {
        withCredentials: true
      })

      commit('setPost', post)
    } catch (e) {
      console.log(e.message)
    }
  },
  async fetchByCategoryName({ commit }, [name, page]) {
    try {
      if (!page) page = 1

      const posts = await this.$axios.$get(`${address}/posts/category/${name}?limit=${limit}&page=${page}`, {
        withCredentials: true
      })

      if (posts) {
        if (page == 1)
          return commit('setPostsByCategory', posts)

        commit('pushPostsByCategory', posts)
        posts.length < limit && commit('switchEnough', true)
      }
    } catch (e) {
      console.log(e.message)
    }
  },
  async addPost({ commit }, form) {
    try {
      const newPost = await this.$axios.$post(`${address}/posts/`, form, {
        withCredentials: true
      })
      const getUsername = async () => await this.$axios.$get(`${address}/auth/user/`, {
        withCredentials: true
      })
      const getCategoriesById = async id => await this.$axios.$get(`${address}/categories/${id}`)
      const getCharactersById = async id => await this.$axios.$get(`${address}/characters/${id}`)

      const { name } = await getUsername()
      newPost.user_name = name
      newPost.categories = await getCategoriesById(newPost._id)
      newPost.characters = await getCharactersById(newPost._id)

      commit('addPost', newPost)
    } catch (e) {
      console.log(e.message)
    }
  },
  async deletePost({ commit }, id) {
    try {
      await this.$axios.$delete(`${address}/posts/${id}`, {
        withCredentials: true
      })

      this.$router.push('/', () => {
        commit('removeUserPost', id)
        commit('removePost', id)
      })
    } catch (e) {
      console.log(e.message)
    }
  },
  async updatePost({ commit }, [id, form]) {
    try {
      await this.$axios.$patch(`${address}/posts/${id}`, form, {
        withCredentials: true
      })

      window.location.reload()
    } catch (e) {
      console.log(e.message)
    }
  },
  async fetchBasket({ commit }, page = 1) {
    try {
      const posts = await this.$axios.$get(`${address}/posts/basket?limit=${limit}&page=${page}`, {
        withCredentials: true
      })

      if (posts) {
        commit('pushBasket', posts)
        posts.length < limit && commit('switchEnough', true)
      }
    } catch (e) {
      console.log(e.message)
    }
  },
  async addToBasket({ commit }, [post_id, in_basket]) {
    try {
      await this.$axios.$post(`${address}/basket`, { post_id }, {
        withCredentials: true
      })

      if (in_basket === true) {
        commit('updateBasket', [post_id, false])
        commit('removePostFromBasket', post_id)
      } else commit('updateBasket', [post_id, true])
    } catch (e) {
      console.log(e.message)
    }
  }
}

export const getters = {
  posts: state => state.posts,
  postById: state => state.post,
  userPosts: state => state.userPosts,
  postsByCategory: state => state.postsByCategory,
  basket: state => state.basket,
  enough: state => state.enough
}
