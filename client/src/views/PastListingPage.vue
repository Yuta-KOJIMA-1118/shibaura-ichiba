/**
* @component PastListingPage
* @description ホームページコンポーネント，このコンポーネントは，App.vueにルーティングされ，最初に表示される．テスト用のコンポーネントのため，実際のアプリケーションでは，このコンポーネントは削除される．
*
* @since 2024-06-14
* @author S.R
*/
<template>
  <div>
    <ShibauraHeader />
    <div class="logout">
      <button @click="logout">ログアウト</button>
    </div>
    <h1>出品履歴</h1>
    <router-link :to="{ name: 'ProfilePage', query: {studentId: this.$route.query.studentId } }">
      <button>マイページ</button>
    </router-link>
    <p>Here are your past listings.</p>
    <div v-if="PastListings.length === 0" class="no-listing">
      出品履歴リストは空です。
    </div>
    <div v-else class="past-list">
      <div v-for="PastListing in PastListings" :key="PastListing.id" class="product-item">
        <div class="product-image">
          <img :src="PastListing.image" :alt="PastListing.name" />
        </div>
        <div class="product-details">
          <!--stockId, studentId, myPage -->
          <p>価格：{{ PastListing.price }}円</p>
          <p>説明：{{ PastListing.explanation }}</p>
          <!-- チャットボタンの追加 -->
          <button @click="moveItemPage(PastListing)">商品画面</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ShibauraHeader from '../components/shibauraHeader.vue'; 

export default {
  name: 'PastListingPage',
  components: {
    ShibauraHeader 
  },
  data() {
    return {
      PastListings: []
    }
  },
  methods: {
    async fetchPastListings() {
      try {
        const studentId = this.$route.query.studentId;

        if (!studentId) {
          throw new Error('studentId is undefined');
        } 

        const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
        const url = express + '/myPagePast'

        const response = await axios.get(url, {
          params: { studentId }
        });
        this.PastListings = response.data;
        console.log(this.PastListings);
        } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error.response ? error.response.data : error.message);
        alert("データの取得中にエラーが発生しました。詳細：" + (error.response ? error.response.data : error.message));
      }
    },
    async moveItemPage(PastListing) {
      console.log(PastListing)
      this.$router.push({ name: 'ItemPage', query: { studentId: this.$route.query.studentId, stockId: PastListing.id } });
    },
    logout() {
      console.log('ログアウトしました');
      this.$router.push('/login');
    }
  },
  created() {
    this.fetchPastListings();
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

.past-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
}

.product-item {
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
