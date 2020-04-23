import Vuex from "vuex";
import axios from "axios";
import Cookie from 'js-cookie';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPist.id);
        state.loadedPosts[postIndex] = editedPost
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get('https://nuxt-blog-95373.firebaseio.com/posts.json')
          .then(res => {
            const postsArray = []
            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key })
            }
            vuexContext.commit('setPosts', postsArray)
          })
          .catch(e => context.error(e));
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post, 
          updatedDate: new Date()
        }
        return axios
        .post('https://nuxt-blog-95373.firebaseio.com/posts.json?auth=' + vuexContext.state.token, createdPost)
        .then(response => {
          vuexContext.commit('addPost', {...createdPost, id: response.data.name})
        })
        .catch(error => console.log(error));
      },
      editPost(vuexContext, editedPost) {
        return axios.put('https://nuxt-blog-95373.firebaseio.com/posts/' 
        + editedPost.id +
        '.json?auth=' + vuexContext.state.token, editedPost)
        .then(response => {
          vuexContext.commit('editPost', posts);
        })
        .catch(error => (console.log(error)))
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      authenticateUser(vuexContext, authData) {
        let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.fbAPIKey
        if (!authData.isLogin) {
          authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.fbAPIKey
        }
        return axios.post(authUrl, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(response => {
          // console.log(response.data.idToken)
          vuexContext.commit("setToken", response.data.idToken);

          localStorage.setItem('token', response.idToken);
          localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(response.expiresIn) * 1000);
          
          Cookie.set('jwt', response.idToken);
          Cookie.set('expirationDate', new Date().getTime() + Number.parseInt(response.expiresIn) * 1000);
        return axios.post('http://localhost:3000/api/track-data', {data: 'Authenticated!'})
        })
        //implement model or alert to show error on client
        .catch(error => console.log(error.message));
        },
        initAuth(vuexContext, req) {
          let token;
          let expirationDate;
          if (req) {
            if (!req.headers.cookie) {
              return;
            }
              const jwtCookie = req.headers.cookie
                .split(';')
                .find(c => c.trim().startsWith('jwt='));
            if (!jwtCookie) {
              return;
            } 
            token = jwtCookie.split('=')[1];
            expirationDate = req.headers.cookie
                .split(';')
                .find(c => c.trim().startsWith('expirationDate='))
                .split('=')[1];
          } else if (process.client) {
            const token = localStorage.getItem('token');
            const expirationDate = localStorage.getItem('tokenExpiration');
          }
           // + converts string to number ...
          if (new Date().getTime() > +expirationDate || !token) {
            console.log("No token or invalid token");
            vuexContext.dispatch('logout');
            return;
          }
          vuexContext.commit('setToken', token);
        },
        logout(vuexContext) {
          vuexContext.commit('clearToken');
          Cookie.remove('jwt');
          Cookie.remove('expirationDate');
          if (process.client) {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
          }
        }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return state.token != null;
      }
    }
  });
};

export default createStore;