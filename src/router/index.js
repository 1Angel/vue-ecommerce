import Vue from 'vue'
import VueRouter from 'vue-router'


import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ProductoPage from '../views/ProductoPage.vue'
import CarroPage from '../views/CarroPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import CheckOut from '../views/CheckOut.vue'
import MensajeFinal from '../views/MensajeFinal.vue'
import AdminPage from '../views/AdminPage.vue'
import AdminDetail from '../views/AdminDetail.vue'
import Error404Page from '../views/Error404Page.vue'
import AdminCreate from '../views/AdminCreate.vue'
import ChatPage from '../views/ChatPage.vue'

Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage

    },
    {
        path: '/producto/:id',
        name: 'details',
        component: ProductoPage
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage
    },
    {
        path: '/cart',
        name: 'cart',
        component: CarroPage,
        meta: { transition: 'slide-left' }
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfilePage,
        meta:{requiresAuth:true}
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: CheckOut,
        meta: {requiresAuth:true}
    },
    {
        path: '/success',
        name: 'success',
        component: MensajeFinal,
        meta:{requiresAuth:true}
    },
    {
        path: '/chat',
        name: 'chat',
        component: ChatPage
    },
    {
        path: '/admin/create',
        name: 'AdminCreate',
        component: AdminCreate,
        meta:{requiresAuth:true}
    },
    {
        path: '/admin',
        name: 'admin', 
        component: AdminPage,
        meta:{requiresAuth:true}
    },
    {
        path: '/admin/:id',
        name: 'admindetail',
        component: AdminDetail
    },
    {
        path: '/:pathMatch(.*)',
        name: 'error404',
        component:Error404Page
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from,next)=>{
    const loggedIn = localStorage.getItem('user')
  if(to.matched.some(record=>record.meta.requiresAuth)&&!loggedIn){
    next('/')
  }
  next()
  
  })





export default router;
