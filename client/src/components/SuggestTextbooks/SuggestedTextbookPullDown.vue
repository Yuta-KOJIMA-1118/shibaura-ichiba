/**
 * @component SuggestedTextbookDropdown 
 * @description 提案された教科書をプルダウンメニューで表示するコンポーネント
 *
 * @since 2024-06-14
 * @author 小島佑太
 */

<template>
    <div class="dropdown">
        <select ref="suggestionSelect" @change="selectSuggestion">
            <option value="" disabled>Select an option...</option>
            <option v-for="(suggestion, index) in internalSuggestions.data" :key="index" :value="index">
                {{ suggestion.textbookName }}
            </option>
        </select>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['suggestions'],
    data() {
        return {
            selectedTextbook: null,
            internalSuggestions: []
        };
    },
    watch: {
        suggestions: {
            handler(newSuggestions) {
                this.internalSuggestions = newSuggestions;

                this.$nextTick(() => {
                    this.$refs.suggestionSelect.value = ''; // 更新後に選択状態をリセット
                });
            },
            immediate: true,
            deep: true
        }
    },
    mounted() {
        this.fetchInitialSuggestions();
    },
    methods: {
        async fetchInitialSuggestions() {
            try {
                const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
                const url = express + '/initSuggestedTextbookPullDown';
                const response = await axios.post(url,{
                    studentId: this.$route.query.studentId //queryからうけとる
                });
                this.internalSuggestions = response.data;
            }
            catch (error) {
                console.error(error);
            }
        },
        selectSuggestion(event) {
            const selectedIndex = event.target.value;
            this.selectedTextbook = this.internalSuggestions.data[selectedIndex];
            this.$emit('select', this.selectedTextbook);
        }
    }
};
</script>

<style scoped>
    .dropdown {
        display: inline-block;
        width: 100%;
    }

    select {
        width:70%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: white;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        cursor: pointer;
    }
</style>