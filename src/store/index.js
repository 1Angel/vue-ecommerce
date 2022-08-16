import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart:{
      items:[]
    },
    user:null
  },
  getters: {
    loggedIn(state){
      return !!state.user
    }
  },
  mutations: {
    carroinitial(state){
      if(localStorage.getItem('cart')){
       state.cart = JSON.parse(localStorage.getItem('cart'))
      }else{
       localStorage.setItem('cart', JSON.stringify(state.cart))
      }
   },
   AgregarCarro(state,item){
       const exists = state.cart.items.filter(i=>i.product.id===item.product.id);
       if(exists.length){
           exists[0].quantity = parseInt(exists[0].quantity)+parseInt(item.quantity)
       }
       else{
           state.cart.items.push(item);
       }

       localStorage.setItem('cart', JSON.stringify(state.cart))
   },
   ClearCart(state){
    state.cart = {items:[]}
    localStorage.setItem('cart', JSON.stringify(state.cart))
   },


   SET_USER_DATA(state,userData){
    state.user =userData
    localStorage.setItem('user', JSON.stringify(userData))
    axios.defaults.headers.common['Authorization'] =`Bearer ${userData.data.token.access}`
   },
   CLEAR_USER_DATA(){
    localStorage.removeItem('user')
    location.reload()
   }
  },
  actions: {
    register({commit},credentials){
      return axios.post('https://djangoapiyo.herokuapp.com/auth/register/',credentials).then(response=>{commit('SET_USER_DATA',response)}
)},
    login({commit}, credentials){
      return axios.post('https://djangoapiyo.herokuapp.com/auth/login/',credentials).then(response=>{commit('SET_USER_DATA',response)})
    },
    logout({commit}){
      commit('CLEAR_USER_DATA')
    }
    
  },
  modules: {
  }
})
