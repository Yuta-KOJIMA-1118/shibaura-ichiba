/**
* @component ItemPage
* @description アイテムページコンポーネント，このコンポーネントは，商品の詳細が表示される。
*
* @since 2024-06-15
* @author 須藤綾太
*
* @modified 2024-07-08 須藤綾太 dataにstudentIdを追加。getItemState関数のparamにstudentIdを追加
* @modified 2024-07-09 須藤綾太 chatPageにstockId,studentIdを送る 
* @modified 2024-07-10 須藤綾太 画面遷移とデータの送信を行うgoBack,goToMyPage関数を作成
*                              dataにpreviousPage(どこからItemPageに遷移してきたのか)追加
*                              createdにpreviousPage取得を追加
* @modified 2024-07-13 須藤綾太 画面遷移を学校サーバようにURL変更
* @modified 2024-07-15 須藤綾太 orderIdを取得、chatPageに送る処理追加
*                              chatPageの戻るボタンが削除されたのでchatPageへのpushからpreviousPage削除
*                              必要ないstockIdも削除
*                              購入希望ボタンを表示するか,どのメッセージを表示するかの条件分岐処理追加
*/
<template>
  <div class="header">
    <button id="back" @click="goBack">＜</button>
    <button id="mypage" @click="goToMyPage">マイページ</button>
  </div>
  <div class="container">
    <div class="thumbnail-list">
      <img
      v-for="(path, index) in imageSrcs"
      :key="path"
      :src="path"
      :alt="'Thumbnail'"
      @click="selectThumbnail(index)"
    />
    </div>
    <div class="product-image">
      <img :src="imageSrcs[imageSrcsIndex]" alt="Loaded Image" />
    </div>
    <div class="product-details">
      <h1 id="stockName">{{ ItemData.stockName }}</h1>
      <h2 id="sellerName">出品者:{{ ItemData.name }}</h2>
      <div class="price">¥{{ ItemData.price }}</div>
      <div class="description">
        <h3 id="professorName">教員名:{{ ItemData.professorName }}</h3>
        <h3 id="subjectName">授業名:{{ ItemData.subjectName }}</h3>
        <p id="explanation">{{ ItemData.explanation }}</p>
        <div class="button">
        <button v-if="isBuVisBuyorChat" @click="getItemState">{{ this.buttonMessage }}</button>
        <cancelListingButton v-if="isBuVisCanLis" @click="goToMyPage"></cancelListingButton>
        <finishListingButton v-if="isBuVisDelCom" @click="goToMyPage"></finishListingButton>
        </div>
        <h1>{{ this.message }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import cancelListingButton from '@/components/cancelListingButton.vue';
import finishListingButton from '@/components/finishListingButton.vue';

export default {
  name: 'ItemPage',
  components: {
      cancelListingButton,
      finishListingButton
    },

  data() {
    return {
      stockId: '',
      studentId: '',
      previousPage: '',
      ItemData: {
        picturePaths: []
      },
      message: '',
      buttonMessage: '',
      selectedThumbnail: '',
      imageSrcsIndex: 0,
      imageSrcs: [],
      state: '',
      sellerId: '',
      buyerId: '',
    };
  },
  created() {
    this.stockId = this.$route.query.stockId;
    this.studentId = this.$route.query.studentId;
    this.previousPage = this.$route.query.previousPage;
    this.getItemInfo();
  },
  computed: {
    isBuVisBuyorChat() {
      return (this.state == true && this.sellerId != this.studentId) ||
             (this.state == false && (this.sellerId == this.studentId || this.buyerId == this.studentId));
    },
    isBuVisCanLis() {
      return this.studentId == this.sellerId;
    },
    isBuVisDelCom() {
      return this.studentId == this.sellerId && this.state == false;
    }
  },
  methods: {
    async getItemInfo() {
      console.log("-> getItemInfo start");

      try {
        const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
        const url = express+'/getItemInfo';
        const response = await axios.get(url, {
          params: {
            stockId: this.stockId
          }
        });

        this.ItemData = response.data;
        console.log("Picture Paths: ",this.ItemData.picturePaths);
        this.selectedThumbnail = this.ItemData.picturePaths[0];
        console.log(this.selectedThumbnail)
        this.ItemData.picturePaths.forEach((picturePath, index) => {
          this.fetchImage(picturePath, index);
        });

        this.sellerId = this.ItemData.sellerId;
        this.buyerId = this.ItemData.buyerId;
        this.state = this.ItemData.state;

        if(this.state == true && this.sellerId != this.studentId) {
          this.buttonMessage = '購入希望';
        }else if(this.state == false && (this.sellerId == this.studentId || this.buyerId == this.studentId)) {
          this.buttonMessage = 'チャット';
        }
        
    
      } catch (error) {
        console.error(error);
      }
      console.log(this.sellerId);
      console.log(this.buyerId);
      console.log(this.studentId);
      console.log(this.state);
      console.log("<- getItemInfo finish");

    },
    async getItemState() {
      console.log("-> getItemState start");

      try {
        const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
        const url = express+'/getItemState';
        const response = await axios.get(url, {
          params: {
            stockId: this.stockId,
            studentId: this.studentId
          }
        });

        const goToChatPageis = response.data.goToChatPageis;
        const orderId = response.data.orderId;

        console.log(orderId);

        if(goToChatPageis == true) {
          this.previousPage = this.$route.meta.previousRoute;
          this.$router.push({ name: 'chatPage', query: {senderStudentId: this.studentId, orderId: orderId }});
        }else{
          this.message = "購入不可です";
        }

      } catch (error) {

        console.log(error);

      }

      console.log("<- getItemState finish");

    },
    async goToMyPage() {
      this.$router.push({ name: 'ProfilePage', query: {studentId: this.studentId, orderId: this.stockId }});
    },
    async goBack() {

      console.log("prePage: ",this.previousPage);

      if(this.previousPage == null) {
        this.$router.go(-1);
      }else{
        this.$router.push({ name: this.previousPage, query: {studentId: this.studentId, orderId: this.stockId }});
      }
    },
    async fetchImage(selectedThumbnail, index) {
      try {
        const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
        const url = express+'/getItemInfo/images';
        const response = await axios.get(url,{
          responseType: 'blob',
          params: {
            filename: selectedThumbnail,
          }
        });
        this.imageSrcs[index] = URL.createObjectURL(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async selectThumbnail(path){
      this.imageSrcsIndex = path;
    }
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #ffffff;
}

.header {
  width: 100%;
  background-color: rgb(101, 145, 34);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  display: flex;
}

.header button {
  color: #fff;
  border: black;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.header #back {
  background-color: transparent;
}

.header #mypage {
  background-color: #6e6a6a;
}

.header #mypage:hover {
  background-color: #565253;
}

.container {
  display: flex;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.thumbnail-list {
  display: flex;
  flex-direction: column;
  width: 10%;
  padding: 10px;
  background-color: rgb(197, 236, 139);
  box-sizing: border-box;
}

.thumbnail-list img {
  width: 100%;
  height: auto;
  cursor: pointer;
  margin-bottom: 10px;
  border: 2px solid transparent;
}

.thumbnail-list img:hover,
.thumbnail-list img.selected {
  border: 2px solid #e60023;
}

.product-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(198, 235, 143);
}

.product-image img {
  width: 95%;
  height: 95%;
  display: block;
}

.product-details {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  background-color: rgb(255, 246, 217)
}

.product-details h1 {
  margin-top: 0;
  font-size: 24px;
  color: #333;
}

.product-details .price {
  font-size: 20px;
  color: #e60023;
  margin: 10px 0;
}

.product-details .description {
  font-size: 16px;
  color: #666;
}

<styl scoped>
/* .button クラスを追加してボタンを縦に並べ、デザインを整えました */
.button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
}

.button button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid transparent;
  background-color: #4CAF50;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, border 0.3s ease;
}

.button button:hover {
  background-color: #45a049;
  border: 1px solid #3e8e41;
}

.button button.cancel {
  background-color: #f44336;
}

.button button.cancel:hover {
  background-color: #e53935;
  border: 1px solid #d32f2f;
}

.button button.finish {
  background-color: #2196F3;
}

.button button.finish:hover {
  background-color: #1976D2;
  border: 1px solid #1565C0;
}

/* 他のスタイルの調整（必要に応じて追加） */
.product-details h1,
.product-details .price,
.product-details .description {
  margin-bottom: 10px;
}
</style>
