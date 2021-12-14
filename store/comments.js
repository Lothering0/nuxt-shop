const address = 'http://localhost:9000/api'

export const state = () => ({
  comments: []
})

export const mutations = {
  setComments(state, comments) {
    state.comments = comments
  },
  addComment(state, comment) {
    state.comments.push(comment)
  },
  updateComment(state, updatedComment) {
    state.comments = state.comments.map(comment => {
      if (comment._id == updatedComment._id) {
        const {
          user_name,
          has_like,
          has_dislike,
          likes,
          dislikes
        } = comment

        return comment = {
          user_name,
          has_like,
          has_dislike,
          likes,
          dislikes,
          ...updatedComment
        }
      }

      return comment
    })
  },
  removeComment(state, comment_id) {
    state.comments = state.comments.filter(el => el._id !== comment_id)
  },
  updateMark(state, [id, mark]) {
    for (let comment of state.comments) {
      if (comment._id == id) {
        if (!comment.has_like && !comment.has_dislike) {
          if (mark === 'like') {
            ++comment.likes

            comment.has_like = true
          } else {
            ++comment.dislikes

            comment.has_dislike = true
          }
        } else if (comment.has_like && !comment.has_dislike) {
          if (mark === 'like') {
            --comment.likes

            comment.has_like = false
          } else {
            --comment.likes
            ++comment.dislikes

            comment.has_like = false
            comment.has_dislike = true
          }
        } else if (!comment.has_like && comment.has_dislike) {
          if (mark === 'like') {
            ++comment.likes
            --comment.dislikes

            comment.has_like = true
            comment.has_dislike = false
          } else {
            --comment.dislikes

            comment.has_dislike = false
          }
        }

        break
      }
    }
  }
}

export const actions = {
  async fetch({ commit }, id) {
    try {
      const comments = await this.$axios.$get(`${address}/comments/${id}`, {
        withCredentials: true
      })

      commit('setComments', comments)
    } catch (e) {
      console.log(e)
    }
  },
  async addComment({ commit }, [id, form]) {
    try {
      const newComment = await this.$axios.$post(`${address}/comments/${id}`, form, {
        withCredentials: true
      })

      const { name } = await this.$axios.$get(`${address}/auth/user/`, {
        withCredentials: true
      })

      commit('addComment', {
        ...newComment,
        user_name: name,
        likes: 0,
        dislikes: 0,
        has_like: false,
        has_dislike: false
      })
    } catch (e) {
      console.log(e.message)
    }
  },
  async updateComment({ commit }, [id, message]) {
    try {
      const updatedComment = await this.$axios.$patch(`${address}/comments/${id}`, message, {
        withCredentials: true
      })

      commit('updateComment', updatedComment)
    } catch (e) {
      console.log(e.message)
    }
  },
  async deleteComment({ commit }, id) {
    try {
      await this.$axios.$delete(`${address}/comments/${id}`, {
        withCredentials: true
      })

      commit('removeComment', id)
    } catch (e) {
      console.log(e.message)
    }
  },
  async setLike({ commit }, id) {
    try {
      await this.$axios.$post(`${address}/likes/${id}`, null, {
        withCredentials: true
      })

      commit('updateMark', [id, 'like'])
    } catch (e) {
      console.log(e.message)
    }
  },
  async setDislike({ commit }, id) {
    try {
      await this.$axios.$post(`${address}/dislikes/${id}`, null, {
        withCredentials: true
      })

      commit('updateMark', [id, 'dislike'])
    } catch (e) {
      console.log(e.message)
    }
  }
}

export const getters = {
  comments: state => state.comments
}
