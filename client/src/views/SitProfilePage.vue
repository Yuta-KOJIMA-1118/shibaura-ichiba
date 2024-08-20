/**
* @component SitProfilePage
* @description ホームページコンポーネント，このコンポーネントは，App.vueにルーティングされ，最初に表示される．テスト用のコンポーネントのため，実際のアプリケーションでは，このコンポーネントは削除される．
*
* @since 2024-06-30
* author 下地涼太
*
* @modified 2024-07-15 小島佑太 - ActiveListingとPastListingを統合，PurchasePastPageとWishListPageを統合
*/
<template>
  <div>
    <ShibauraHeader />
    <div class="logout">
      <button @click="logout">ログアウト</button>
    </div>
    <h1>マイページ</h1>
    <p>This is the profile page.</p>
    <router-link :to="{path: 'HomePage', query: { studentId: this.$route.query.studentId }}">
      <button>ホームページ</button>
    </router-link>
    <br>
    <div class="button-grid">
      <router-link :to="{path: 'PurchasePastPage', query: { studentId: this.$route.query.studentId }}">
        <button class="luxury-button">購入希望中の商品</button>
      </router-link>
      <router-link :to="{path: 'ActiveListingPage', query: { studentId: this.$route.query.studentId }}">
        <button class="luxury-button">出品中の商品</button>
      </router-link>
    </div>
    <router-link :to="{path: 'UploadPage', query: { studentId: this.$route.query.studentId }}">
        <button class="luxury-button">出品する</button>
    </router-link>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
import ShibauraHeader from '../components/shibauraHeader.vue';

export default {
  name: 'SitProfilePage',
  components: {
    ShibauraHeader
  },
  methods: {
    logout() {
      console.log('ログアウトしました');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
/* General Page Styles */
.profile-page {
  background-color: #f0f0f0; /* シンプルな背景色 */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
  font-family: 'Arial', sans-serif;
  width: 100%; /* 全幅をカバー */
}

.content {
  text-align: center;
  margin-top: 50px;
  width: 100%; /* 全幅をカバー */
}

h1 {
  color: red;
}

.logout {
  position: absolute;
  top: 10px;
  right: 10px;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2列のグリッド */
  gap: 20px; /* ボタン間の間隔 */
}

button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #204C3B;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: #358a5b;
  transform: scale(1.05);
}

.home-button {
  background-color: #007BFF;
  margin-bottom: 20px;
}

.home-button:hover {
  background-color: #0056b3;
}

/* Luxurious Button Styles */
.luxury-button {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  border: none;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  padding: 10px 20px;
  transition: all 0.3s ease;
}

.luxury-button:hover {
  transform: scale(1.15); /* Increase size on hover */

}

.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center; /* Center the items */
}

.product-image {
  margin-right: 20px;
}

.product-image img {
  max-width: 150px; /* Adjust image size */
}

.product-details {
  max-width: 600px;
  text-align: center; /* Center the text */
}
</style>
