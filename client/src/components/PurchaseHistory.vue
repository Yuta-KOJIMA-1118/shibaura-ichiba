<template>
    <div>
      <h1>購入履歴</h1>
      <table border="1">
        <tr>
          <th>商品名</th>
          <th>価格</th>
          <th>日付</th>
        </tr>
        <tr v-for="purchase in purchases" :key="purchase.id">
          <td>{{ purchase.item_name }}</td>
          <td>{{ purchase.price }}</td>
          <td>{{ purchase.date }}</td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        purchases: []
      };
    },
    mounted() {
      this.fetchPurchases();
    },
    methods: {
      async fetchPurchases() {
        try {
          const response = await axios.get('http://localhost:5000/api/purchases');
          this.purchases = response.data;
        } catch (error) {
          console.error('Error fetching purchases:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  </style>
  