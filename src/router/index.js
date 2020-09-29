import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: ()=>import('@/components/CommonLayout.vue'),
    children:[
      {
        path:'/',
        component:()=>import ('@/views/Home.vue')
      },
      {
        path:'/detail/:id',
        component:()=>import ('@/views/Detail.vue')
      },
      {
        path:'/personal',
        component:()=>import ('@/views/Personal.vue'),
        meta:{
          requireAuth:true
        }
      },
      {
        path:'/article',
        component:()=>import ('@/views/Article.vue'),
        meta:{
          requireAuth:true
        }
      },
      {
        path:'/article/edit',
        component:()=>import ('@/views/ArticleEdit.vue'),
        meta:{
          requireAuth:true
        }
      },
      {
        path:'/article/edit/:id',
        component:()=>import ('@/views/ArticleEdit.vue'),
        meta:{
          requireAuth:true
        }
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: ()=>import('@/views/Login.vue'),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
