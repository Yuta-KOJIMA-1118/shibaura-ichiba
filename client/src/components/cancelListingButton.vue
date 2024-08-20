/**
 * @component cancelListingButton
 * @description 在庫情報，チャット情報，オーダー情報を全て削除するボタン
 *
 * @since 2024-07-15
 * @author 小島佑太
 */
<template>
    <button @click="cancelListing">出品をキャンセルする</button>
</template>

<script>
import axios from 'axios';
export default {
    methods: {
        async cancelListing() {
            if (!confirm('出品をを取り消ししてもよろしいですか？')) {
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