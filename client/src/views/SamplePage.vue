/**
* @component HomePage
* @description サンプルページコンポーネント，このコンポーネントは，App.vueにルーティングされる．テスト用のコンポーネントのため，実際のアプリケーションでは，このコンポーネントは削除される．
* 
* @since 2024-06-10
* @author 小島佑太
*/

<template>
    <div>
        <h1>SamplePage</h1>
        <router-link to="/">Go to Home Page</router-link>
        <p>here is SamplePage</p>
        <SuggestTextbooks></SuggestTextbooks>
        <ChatSample></ChatSample>
    </div>
</template>

<script>
    import SuggestTextbooks from '../components/SuggestTextbooks.vue'
    import ChatSample from '../components/ChatSample.vue'

    export default {
        components: {
            SuggestTextbooks,
            ChatSample
        },
        name: 'SamplePage'
    };
</script>

<style scoped>
</style>