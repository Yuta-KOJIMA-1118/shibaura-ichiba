// src/services/authService.js
export default {
    logout() {
      // ローカルストレージやセッションストレージから認証情報を削除
      localStorage.removeItem('authToken');
      // 必要に応じて他のクリーンアップ処理を追加
    }
  }
  