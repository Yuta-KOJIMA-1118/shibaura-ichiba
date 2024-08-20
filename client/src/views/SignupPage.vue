<template>
  <div class="signup-container">
    <h1>芝浦市場</h1>
    <h2>サインアップ</h2>
    <form @submit.prevent="signup">
      <div class="form-group">
        <label for="name">名前:</label>
        <input type="text" v-model="name" maxlength="20" required />
      </div>

      <div class="form-group">
        <label for="password">パスワード:</label>
        <input type="password" v-model="password" maxlength="20" required />
      </div>

      <div class="form-group checkbox-group">
        <label>
          <input type="checkbox" v-model="omiya" /> 大宮
        </label>
        <label>
          <input type="checkbox" v-model="toyosu" /> 豊洲
        </label>
      </div>

      <button type="submit" class="signup-button">次へ</button>
    </form>
    <p>既にアカウントをお持ちですか？</p>
    <button @click="goToLogin" class="login-button">ログイン</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignupPage',
  data() {
    return {
      name: '',
      password: '',
      omiya: false,
      toyosu: false,
    };
  },
  methods: {
    async signup() {
      if (!this.omiya && !this.toyosu) {
        alert('大宮または豊洲のいずれかを選択してください');
        return;
      }
      try {
        const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
        const url = express + '/registerUser';
        const response = await axios.get(url, {
          params: {
            name: this.name,
            password: this.password,
            omiya: this.omiya ? 1 : 0,
            toyosu: this.toyosu ? 1 : 0,
          },
        });
        const isRegistered = response.data;
        if (isRegistered.data === true) {
          this.$router.push('/');
        } else {
          alert('サインアップに失敗しました');
        }
      } catch (error) {
        console.error('サインアップエラー:', error);
        alert('サインアップ中にエラーが発生しました');
      }
    },
    goToLogin() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #e6ffe6; /* 背景を淡い緑色に設定 */
}


h1, h2 {
  margin-bottom: 20px;
  color: #004d00; /* タイトルを濃い緑色に設定 */
}

.form-group {
  text-align: left;
  margin-bottom: 20px;
}

.checkbox-group {
  text-align: center;
}

.form-group label {
  display: inline-block;
  margin-right: 10px;
  color: #004d00; /* ラベルを濃い緑色に設定 */
}

label {
  display: block;
  margin-bottom: 5px;
  color: #004d00; /* ラベルを濃い緑色に設定 */
}

input {
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid #004d00; /* 境界線を濃い緑色に設定 */
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #f0fff0; /* 入力フィールドの背景を薄い緑色に設定 */
}

button.signup-button {
  width: 100%;
  padding: 10px;
  background-color: #28a745; /* 緑色のサインアップボタン */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.signup-button:hover {
  background-color: #218838; /* ホバー時の色を濃い緑色に設定 */
}

button.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007BFF; /* 青色のログインボタン */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button.login-button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 20px;
  color: #004d00; /* テキストを濃い緑色に設定 */
}

a {
  color: #004d00; /* リンクを濃い緑色に設定 */
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}
</style>
