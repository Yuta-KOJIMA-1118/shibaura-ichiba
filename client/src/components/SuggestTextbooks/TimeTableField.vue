/**
 * @component TimeTableField
 * @description 時間割を入力するフィールド
 * 
 * @since 2024-06-14
 * @author 小島佑太
 */
<template>
    <textarea v-model="inputValue" placeholder="Scomb-Shibaura-Ichibaからペースト"></textarea>
</template>

<script>
export default {
    props: ['value'],
    data() {
        return {
            inputValue: this.value
        };
    },
    watch: {
        inputValue(newValue) {
            this.$emit('input', newValue);
        }
    }
};
</script>
<style scoped>
    textarea {
        width: 70%;
    }
</style>