/**
* @component ActiveListingPage
* @description 出品中の商品を表示するコンポーネントです。
*
* @since 2024-06-30
* @author S.R
*
* @modified 2024-07-15 小島佑太 - ActiveListingとPastListingを統合
*/
<template>
  <div>
    <ShibauraHeader />
    <div class="logout">
      <button @click="logout">ログアウト</button>
    </div>
    <h1>出品中の商品</h1>
    <router-link :to="{ name: 'ProfilePage', query: {studentId: this.$route.query.studentId } } ">
      <button>マイページ</button>
    </router-link>
    <p>現在出品中の商品一覧です。</p>
    <div v-if="ActiveListings.length === 0 && PastListings.length === 0" class="no-listings">
      出品中の商品はありません。
    </div>
    <div v-else class="product-list">
      <div class="product-active-list">
        <p>交渉中でない出品中の商品一覧</p>
        <div v-for="listing in ActiveListings" :key="listing.id" class="product-item">
          <div class="product-details">
            <img :src=listing.picturePath alt="Loaded Image" class="item-thumbnail" />
            <p>{{ listing.stockName }}</p>
            <p>価格: {{ listing.price }}円</p>
            <button @click="moveItemPage(listing)">商品画面</button>
          </div>
        </div>
      </div>
      <div class="product-past-list">
        <p>交渉中の出品中の商品一覧</p>
        <div v-for="listing in PastListings" :key="listing.id" class="product-item">
          <div class="product-details">
            <img :src=listing.picturePath alt="Loaded Image" class="item-thumbnail" />
            <p>{{  listing.stockName }}</p>
            <p>価格: {{ listing.price }}円</p>
            <button @click="moveItemPage(listing)">商品画面</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ShibauraHeader from '../components/shibauraHeader.vue'; 

export default {
  name: 'ActiveListingPage',
  components: {
    ShibauraHeader
  },
  data() {
    return {
      ActiveListings: [],
      PastListings: []
    };
  },
  methods: {
    async fetchActiveListings() {
      try {
        //const studentId = 2;
        const studentId = this.$route.query.studentId;
        console.log('Student Id:', studentId);

        if (!studentId) {
          throw new Error('studentId is undefined');
        } 

        const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
        const url = express + '/myPageOrder';

        const response = await axios.get(url, {
          params: { studentId }
        });
        // !小島がActiveListingとPastListingを統合するために変更
        this.ActiveListings = response.data.active;
        this.PastListings = response.data.past;
        this.ActiveListings.forEach( async (listing) => {
          try{
            const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
            const url = express + '/getItemInfo/images';
            const response = await axios.get(url, {
              responseType: 'blob',
              params: {
                filename: JSON.parse(listing.picturePath)[0],
              }
            });
            listing.picturePath = URL.createObjectURL(response.data);
          }
          catch (error) {
            console.log(error);
          }
        });
        this.PastListings.forEach( async (listing) => {
          try{
            const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
            const url = express + '/getItemInfo/images';
            const response = await axios.get(url, {
              responseType: 'blob',
              params: {
                filename: JSON.parse(listing.picturePath)[0],
              }
            });
            listing.picturePath = URL.createObjectURL(response.data);
          }
          catch (error) {
            console.log(error);
          }
        });
        console.log(this.ActiveListings);
        } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error.response ? error.response.data : error.message);
        alert("データの取得中にエラーが発生しました。詳細：" + (error.response ? error.response.data : error.message));
      }
    },
    async moveItemPage(listing) {
      console.log(listing)

      this.$router.push({ name: 'ItemPage', query: { studentId: this.$route.query.studentId, stockId: listing.id, previousPage: this.$route.query.previousPage } });
    },
    logout() {
      console.log('ログアウトしました');
      this.$router.push('/login');
    }
  },
  created() {
    this.fetchActiveListings();
  }
};
</script>

<style scoped>
h1 {
  color: red;
}

.item-thumbnail {
    width: 100%;
    height: 70%;
    object-fit: cover;
}

.logout {
  position: absolute;
  top: 10px;
  right: 10px;
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

.product-list {
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
  background-color: #007BFF;
}

.product-details button:hover {
  background-color: #0056b3;
}

.no-listings {
  text-align: center;
  margin-top: 20px;
  font-style: italic;
  color: #888;
}
</style>
