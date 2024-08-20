/**
 * @component ChatSample
 * @description 小島が作ったチャット関連のデバッグ用コンポーネント．結合テスト前に削除する．
 *
 * @since 2024-06-18
 * @author 小島 佑太
 */

<template>
    <div>
        <h1>ChatSample</h1>
        <input type="button" value="debug insertChatMessages" @click="debugInsertChatMessages">
        <p id="messages"></p>
    </div>
</template>


<script>
    import axios from 'axios';
    
    export default {
        name: 'ChatSample',
        methods: {
            async debugInsertChatMessages() {
                console.log("debugInsertChatMessages");
                try {
                    const express = process.env.EXPRESS_APP_API_URL || 'http://localhost:3000';
                    const url = express+'/debug';
                    await axios.get(url, {
                        params: {
                            action: 'insert'
                        }
                    });
                }
                catch (error) {
                    console.error(error);
                }
            },
            async debugLoadChatMessages() {
                console.log("debugLoadChatMessages");
                try {
                    const express = process.env.EXPRESS_APP_API_URL || 'http://localhost:3000';
                    const url = express+'/debug';
                    const response = await axios.get(url, {
                        params: {
                            action: 'load'
                        }
                    });
                    const chat = response.data;
                    console.log(chat);
                    let str = '';
                    for( let c in chat ) {
                        const dayAndTime = chat[c].time.day.toString() + ' ' + chat[c].time.hour.toString() + ':' + chat[c].time.minute.toString();
                        str += dayAndTime + ' ' + chat[c].name + ' ' + chat[c].message + '<br>';
                    }
                    if (str !== '') {
                        document.getElementById('messages').innerHTML = str;
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }
        },
        mounted() {
            this.debugLoadChatMessages();
        }
    }
</script>