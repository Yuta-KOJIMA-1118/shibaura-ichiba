<template>
  <div class="login-container">
    <h1>芝浦市場</h1>
    <h2>ログイン</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="name">名前:</label>
        <input type="text" v-model="name" maxlength="20" required />
      </div>
      
      <div class="form-group">
        <label for="password">パスワード:</label>
        <input type="password" v-model="password" maxlength="20" required />
      </div>
      
      <button type="submit" class="next-button">次へ</button>
    </form>
    <p>アカウントをお持ちでないですか？</p>
    <button @click="goToSignup" class="signup-button">サインアップ</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      name: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
        const url = express + '/authenticateUser';
        const response = await axios.get(url, {
          params: {
            name: this.name,
            password: this.password,
          },
        });
        const isAuthenticated = response.data;

        if (isAuthenticated.data) {
          this.$router.push({ name: 'HomePage', query: { studentId: isAuthenticated.data } });
        } else {
          alert('ログインに失敗しました');
        }
      } catch (error) {
        console.error('ログインエラー:', error);
        alert('ログイン中にエラーが発生しました');
      }
    },
    goToSignup() {
      this.$router.push('/SignupPage');
    },
  },
};
</script>

<style scoped>
.login-container {
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

button.next-button {
  width: 100%;
  padding: 10px;
  background-color: #007BFF; /* 青色のまま */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.next-button:hover {
  background-color: #0056b3;
}

button.signup-button {
  width: 100%;
  padding: 10px;
  background-color: #FFA500; /* オレンジ色に設定 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button.signup-button:hover {
  background-color: #cc8400;
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
