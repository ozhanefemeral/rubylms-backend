import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('../views/Courses.vue')
  },
  {
    path: '/teachers',
    name: 'Teachers',
    component: () => import('../views/Teachers.vue')
  },
  {
    path: '/students',
    name: 'Students',
    component: () => import('../views/Students.vue')
  },
  {
    path: '/course/:courseId',
    name: 'CourseProfile',
    component: () => import('../views/CourseProfile.vue')
  },
  {
    path: '/teacher/:teacherId',
    name: 'TeacherProfile',
    component: () => import('../views/TeacherProfile.vue')
  },
  {
    path: '/student/:studentId',
    name: 'StudentProfile',
    component: () => import('../views/StudentProfile.vue')
  },
  {
    path: '/task/:taskId',
    name: 'TaskDetails',
    component: () => import('../views/TaskDetails.vue'),
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && store.state.token == '') next({ name: 'Login' })
  else next()
})

export default router
