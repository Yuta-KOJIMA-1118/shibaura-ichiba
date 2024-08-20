import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import SamplePage from '@/views/SamplePage.vue';
import chatPage from '@/views/chatPage.vue';

import SitWishListPage from '@/views/SitWishListPage.vue';
import PurchasePastPage from '@/views/PurchasePastPage.vue';
import ActiveListingPage from '@/views/ActiveListingPage.vue';
import PastListingPage from '@/views/PastListingPage.vue';
import SitProfilePage from '@/views/SitProfilePage.vue';

import LoginPage from '@/views/LoginPage.vue';
import SignupPage from '@/views/SignupPage.vue';
import ItemPage from '@/views/ItemPage.vue';
import UploadPage from '@/views/UploadPage.vue';


/**
 * @module index
 * @description このファイルはVue Routerの設定を行うファイルです。
 * 
 * @since 2024-06-10
 * @author 小島佑太

 * @version 1.0
 */


const routes = [
    // ここに各自のページを追加していく
    {
        path: '/HomePage',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/SamplePage',
        name: 'SamplePage',
        component: SamplePage
    },
    {
        path: '/chatPage',
        name: 'chatPage',
        component: chatPage
    },
    {
        path: '/WishListPage',
        name: 'WishListPage',
        component: SitWishListPage
    },
    {
        path: '/ProfilePage',
        name: 'ProfilePage',
        component: SitProfilePage
    },
    {
        path: '/PurchasePastPage',
        name: 'PurchasePastPage',
        component: PurchasePastPage
    },
    {
        path: '/ActiveListingPage',
        name: 'ActiveListingPage',
        component: ActiveListingPage
    },
    {
        path: '/PastListingPage',
        name:  'PastListingPage',
        component: PastListingPage
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/SignupPage',
        name: 'SignupPage',
        component: SignupPage
    },
    // 須藤ItemPage追加
    {
        path: '/ItemPage',
        name: 'ItemPage',
        component: ItemPage

    },
    //
    {
        path: '/UploadPage',
        name: 'UploadPage',
        component: UploadPage

    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

// 須藤追加 - 画面遷移元のルート情報を保存
router.beforeEach((to, from, next) => {
    // すべての遷移に対して、遷移元のルートを保存
    if (from.name) {
      to.meta.previousRoute = from.name;
    }
    next();
  });
export default router;