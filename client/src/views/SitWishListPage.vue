/**
* @component SitWishListPage
* @description 購入希望リストを表示するコンポーネントです。
*
* @since 2024-06-28
* @author S.R
*/
<template>
  <div>
    <ShibauraHeader />
    <div class="logout">
      <button @click="logout">ログアウト</button>
    </div>
    <h1>購入希望</h1>
    <router-link :to="{ name: 'ProfilePage', query: {studentId: this.$route.query.studentId } } ">
      <button>マイページ</button>
    </router-link>
    <p>こちらがあなたの購入希望リストです。</p>
    <div v-if="WishListings.length === 0" class="no-listing">
      購入希望リストは空です。
    </div>
    <div v-else class="wish-list">
      <div v-for="listing in WishListings" :key="listing.id" class="listing-item">
        <div class="product-image">
          <img :src="listing.image" :alt="listing.name" />
        </div>
        <div class="product-details">
          <p>価格：{{ listing.price }}円</p>
          <p>説明：{{ listing.explanation }}</p>
          <button @click="moveItemPage(listing)">商品画面</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ShibauraHeader from '../components/shibauraHeader.vue'; 
//import { query } from 'express';

export default {
  name: 'SitWishListPage',
  components: {
    ShibauraHeader
  },
  data() {
    return {
      WishListings: []
    };
  },
  methods: {
    async fetchWishList() {
      try {
        const studentId = this.$route.query.studentId;

        if (!studentId) {
          throw new Error('studentId is undefined');
        } 

        const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
        const url = express + '/myPageWish'

        const response = await axios.get(url, {
          params: { studentId }
        });
        this.WishListings = response.data;
        console.log(this.WishListings);
        } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error.response ? error.response.data : error.message);
        alert("データの取得中にエラーが発生しました。詳細：" + (error.response ? error.response.data : error.message));
      }
    },
    logout() {
      console.log('ログアウトしました');
      this.$router.push('/login');
    },
    async moveItemPage(listing) {
      console.log(listing)
      this.$router.push({ name: 'ItemPage', query: { studentId: this.$route.query.studentId, stockId: listing.id } });
    }
  },
  created() {
    this.fetchWishList();
  }
};
</script>

<style scoped>
h1 {
  color: red;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #204C3B;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #358a5b;
}

.logout {
  position: absolute;
  top: 10px;
  right: 10px;
}

.no-listing {
  text-align: center;
  margin-top: 20px;
  font-style: italic;
  color: #888;
}

.wish-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
}

.listing-item {
  width: 300px;
  margin-bottom: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image {
  text-align: center;
  padding: 10px;
}

.product-image img {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 5px;
}

.product-details {
  padding: 10px;
}

.product-details button {
  margin-top: 10px;
  background-color: #007BFF; /* チャットボタンの色 */
}

.product-details button:hover {
  background-color: #0056b3;
}
</style>
