<template>
    <button @click="confirmCancel">取引をやめる</button>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CancelPurchaseButton',
    props: {
        orderId: {
            type: Number,
            required: true
        },
        studentId: {
            type: Number,
            required: true
        }
    },
    methods: {
        async cancelPurchase() {
            const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
            const url = express + '/cancelPurchase';
            const response = await axios.delete(url, {
                params: {
                    orderId: this.orderId,
                }
            });
            if (response.data.success) {
                console.log('Purchase cancelled successfully and stock state updated');
            } else {
                console.error('Failed to cancel purchase');
            }
            this.$router.push({ name: 'ProfilePage', query: { studentId: this.$route.query.senderStudentId } });
        },
        confirmCancel() {
            if (confirm('購入を取り消ししてもよろしいですか？')) {
                this.cancelPurchase();
            }
        }
    }
}
</script>
<style scoped>
button {
    background-color:#F47A4D ;
    color: white;
    border: none;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    cursor: pointer;
}
button:hover {
    opacity: 0.8;
}
</style>