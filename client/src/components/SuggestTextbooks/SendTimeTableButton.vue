/**
 * @component SendTimeTableButton
 * @description 時間割を送信するボタン
 *
 * @since 2024-06-14
 * @author 小島佑太
 */
<template>
    <button @click="sendTimeTable">授業情報を保存する</button>
</template>

<script>
export default {
    methods: {
        sendTimeTable() {
            this.$emit('submit');
        }
    }
};
</script>

<style scoped>
    button {
        padding: 10px 20px;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        width:60%;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>