/**
* @component PurchasePastPage
* @description ホームページコンポーネント，このコンポーネントは，App.vueにルーティングされ，最初に表示される．テスト用のコンポーネントのため，実際のアプリケーションでは，このコンポーネントは削除される．
*
* @since 2024-06-30
* @author 下地涼太
*/
<template>
  <div>
    <ShibauraHeader />
    <div class="logout">
      <button @click="logout">ログアウト</button>
    </div>
    <h1>購入希望中の商品</h1>
    <router-link :to="{ name: 'ProfilePage', query: {studentId: this.$route.query.studentId } } ">
      <button>マイページ</button>
    </router-link>
    <p>こちらがあなたの購入履歴です。</p>
    <div v-if="PurchasePasts && PurchasePasts.length === 0" class="no-purchase">
      購入履歴はありません。
    </div>
    <div v-else class="purchase-list">
      <div v-for="purchase in PurchasePasts" :key="purchase.id" class="purchase-item">
        <div class="product-details">
          <img :src=purchase.picturePath alt="Loaded Image" class="item-thumbnail" />
          <p>{{  purchase.stockName }}</p>
          <p>価格: {{ purchase.price }}円</p>
          <button @click="moveItemPage(purchase)">商品画面</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ShibauraHeader from '../components/shibauraHeader.vue'; // ヘッダーコンポーネントのインポート

export default {
  name: 'PurchasePastPage',
  components: {
    ShibauraHeader // ヘッダーコンポーネントの登録
  },
  data() {
    return {
      PurchasePasts: [] 
    };
  },
  methods: {
    async fetchPurchaseHistory() {
      try {
        const studentId = this.$route.query.studentId;

        if (!studentId) {
          throw new Error('studentId is undefined');
        } 

        const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
        const url = express + '/myPagePurchasePast'

        const response = await axios.get(url, {
          params: { studentId }
        });
        this.PurchasePasts = response.data;
        this.PurchasePasts.forEach( async (purchase) => {
          try{
            const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
            const url = express + '/getItemInfo/images';
            const response = await axios.get(url, {
              responseType: 'blob',
              params: {
                filename: JSON.parse(purchase.picturePath)[0],
              }
            });
            purchase.picturePath = URL.createObjectURL(response.data);
          }
          catch (error) {
            console.log(error);
          }
        });
        console.log(this.PurchasePasts);
        } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error.response ? error.response.data : error.message);
        alert("データの取得中にエラーが発生しました。詳細：" + (error.response ? error.response.data : error.message));
      }
    },
    logout() {
      console.log('ログアウトしました');
      this.$router.push('/login');
    },
    async moveItemPage(purchase) {
      console.log(purchase)
      this.$router.push({name : 'ItemPage', query: { studentId: this.$route.query.studentId, stockId: purchase.id }});
    }
  },
  created() {
    this.fetchPurchaseHistory();
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

.no-purchase {
  text-align: center;
  margin-top: 20px;
  font-style: italic;
  color: #888;
}

.purchase-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
}

.purchase-item {
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


