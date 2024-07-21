// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/components/LoginPage.vue';
import TablePage from '@/components/TablePage.vue';
import CheckPage from '@/components/CheckPage.vue';
import HomeView from '@/components/HomeView.vue';

const routes = [
  // 测试设置home为首页面，应该LOGIn为首页面
  {
    path: '/Login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/Table',
    name: 'Table',
    component: TablePage
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/check',
    name: 'Check',
    component: CheckPage,
    props: route => ({
      // title: route.params.title,
      // answer: route.params.answer,
      // imagePath: route.params.imagePath
      title: decodeURIComponent(route.params.title),
      answer: decodeURIComponent(route.params.answer),
      imagePath: decodeURIComponent(route.params.imagePath)
    })
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
