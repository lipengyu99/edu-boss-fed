import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import layout from '../layout/index.vue'
import store from '@/store'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: layout,
    meta: {
      title: '首页',
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: "home" */ '../views/home/Home.vue'),
        meta: {
          title: '控制台'
        }
      },
      {
        path: '/advert',
        name: 'advert',
        component: () =>
          import(/* webpackChunkName: "advert" */ '../views/advert/index.vue'),
        meta: {
          title: '广告'
        }
      },
      {
        path: '/advertspace',
        name: 'advertspace',
        component: () =>
          import(
            /* webpackChunkName: "advertspace" */ '../views/advert-space/index.vue'
          ),
        meta: {
          title: '广告位'
        }
      },
      {
        path: '/course',
        name: 'course',
        component: () =>
          import(/* webpackChunkName: "course" */ '../views/course/index.vue'),
        meta: {
          title: '课程'
        }
      },
      {
        path: '/menu',
        name: 'menu',
        component: () =>
          import(/* webpackChunkName: "menu" */ '../views/menu/index.vue'),

        meta: {
          title: '菜单'
        }
      },
      {
        path: '/resource',
        name: 'resource',
        component: () =>
          import(
            /* webpackChunkName: "resource" */ '../views/resource/index.vue'
          ),
        meta: {
          title: '资源'
        }
      },
      {
        path: '/role',
        name: 'role',
        component: () =>
          import(/* webpackChunkName: "role" */ '../views/role/index.vue'),
        meta: {
          title: '角色'
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () =>
          import(/* webpackChunkName: "user" */ '../views/user/index.vue'),
        meta: {
          title: '用户'
        }
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () =>
          import(
            /* webpackChunkName: 'menu-create-edit' */ '@/views/menu/create.vue'
          ),
        meta: {
          title: '创建菜单'
        }
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () =>
          import(
            /* webpackChunkName: 'menu-create-edit' */ '@/views/menu/edit.vue'
          ),
        meta: {
          title: '编辑菜单'
        }
      },
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        meta: { title: '分配菜单' },
        component: () =>
          import(
            /* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-menu.vue'
          ),
        props: true // 将路由路径参数映射到组件的 props 数据中
      },
      {
        path: '/role/:roleId/alloc-resource',
        name: 'alloc-resource',
        meta: { title: '分配资源' },
        component: () =>
          import(
            /* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-resource.vue'
          ),
        props: true // 将路由路径参数映射到组件的 props 数据中
      },
      {
        path: '/course/create',
        name: 'course-create',
        meta: { title: '创建课程' },
        component: () =>
          import(
            /* webpackChunkName: 'course-create' */ '@/views/course/create.vue'
          )
      },
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        meta: { title: '编辑课程' },
        component: () =>
          import(
            /* webpackChunkName: 'course-edit' */ '@/views/course/edit.vue'
          ),
        props: true
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        meta: { title: '课程课时' },
        component: () =>
          import(
            /* webpackChunkName: 'course-section' */ '@/views/course/section.vue'
          ),
        props: true
      },
      {
        path: '/course/:courseId/video',
        name: 'course-video',
        meta: { title: '上传视频' },
        component: () =>
          import(
            /* webpackChunkName: 'course-video' */ '@/views/course/video.vue'
          ),
        props: true
      },
      {
        path: '/resourceCategory',
        name: 'resourceCategory',
        meta: { title: '资源分类' },
        component: () =>
          import(
            /* webpackChunkName: 'resourceCategory' */ '@/views/resource/resourceCategory.vue'
          )
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () =>
      import(/* webpackChunkName: "404" */ '../views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
