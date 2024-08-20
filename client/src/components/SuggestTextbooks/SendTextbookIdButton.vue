

<template>
    <button @click="sendSubjectName">教科書を検索する</button>
</template>

<script>
    export default {
        props: {
            selectedSubjectName: {
                type: String,
                required: true
            }
        },
        methods: {
            sendSubjectName() {
                this.$emit('sendSubjectName', this.selectedSubjectName);
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
