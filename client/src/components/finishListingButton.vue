/**
 * @component finishListingButton
 * @description 在庫情報，チャット情報，オーダー情報を全て削除するボタン
 *
 * @since 2024-07-15
 * @author 小島佑太
 */
<template>
    <button @click="finishListing">商品の受け渡し完了</button>
</template>

<script>
import axios from 'axios';
export default {
    methods: {
        async finishListing() {
            if (!confirm('商品の受け渡しは完了しましたか？')) {
                return;
            }
            try {
                const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
                const url = express + '/cancelListing';
                await axios.get(url, {
                    params: {
                        stockId: this.$route.query.stockId,
                    }
                });
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        }
    }
};
</script>

<style scoped>

</style>