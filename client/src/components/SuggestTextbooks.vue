/**
 * @component SuggestTextbooks
 * @description 教科書の提案を行うコンポーネント．時間割の入力に対し，教科書を提案する．
 * 
 * @since 2024-06-14
 * @author 小島佑太
 */
<template>
    <div id="suggestTextbooks">
        <TimeTableField v-model="timeTable"></TimeTableField>
        <SendTimeTableButton @click="sendTimeTable"></SendTimeTableButton>
        <SuggestedTextbookPullDown :suggestions="suggestions" @select="handleSelectedTextbook"></SuggestedTextbookPullDown>
        <SendTextbookIdButton :selectedSubjectName="selectedSubjectName" @sendSubjectName="sendSubjectName"></SendTextbookIdButton>
    </div>
</template>

<script>
    import axios from 'axios';
    import TimeTableField from '@/components/SuggestTextbooks/TimeTableField.vue';
    import SendTimeTableButton from '@/components/SuggestTextbooks/SendTimeTableButton.vue';
    import SuggestedTextbookPullDown from './SuggestTextbooks/SuggestedTextbookPullDown.vue';
    import SendTextbookIdButton from './SuggestTextbooks/SendTextbookIdButton.vue';

    export default {
        components: {
            TimeTableField,
            SendTimeTableButton,
            SuggestedTextbookPullDown,
            SendTextbookIdButton
        },
        name: 'SuggestTextbooks',
        data() {
            return {
                timeTable: '',
                suggestions: [],
                selectedSubjectName: null
            }
        },
        methods: {
            async sendTimeTable() {
                try{
                    const express = process.env.VUE_APP_EXPRESS_URL  || 'http://localhost:3000';
                    const url = express+'/getSuggestedTextbooks';
                    const response = await axios.post(url, {
                        timeTable: this.timeTable,
                        studentId: this.$route.query.studentId //queryからうけとる
                    });
                    this.suggestions = response.data; // [{textbookId, subjectName, textbookName}, ...]
                } catch (error) {
                    console.error(error);
                }
            },

            handleSelectedTextbook(selectedTextbook) {
                if(selectedTextbook != null && selectedTextbook != undefined){
                    this.selectedSubjectName = selectedTextbook.subjectName;
                }

            },

            sendSubjectName(subjectName) {
                this.$emit('sendSubjectName', subjectName);
            }
        }
    };
</script>

<style scoped>
    #suggestTextbooks {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>