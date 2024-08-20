/**
* @component chatPage
* @description チャットのUI処理を行う．商品購入ページへの遷移可能，商品購入キャンセルも行うことができる
*
* @since 2024-06-10
* @author N.N
*/

<template>
    <header class="chatheader">
        <CancelPurchaseButton :orderId="this.$route.query.orderId" :studentId="this.$route.query.senderStudentId"></CancelPurchaseButton>
        <div class="logo">
            <img src="/favicon.ico" alt="Logo" class="logo-image" />
            <h1 class="chattitle">芝浦市場</h1>
        </div>
        <router-link :to="{ name: 'ProfilePage', query: { studentId: this.$route.query.senderStudentId } }">
            <p class="mypage">マイページ ▸ </p>
        </router-link>
    </header>

    <div class="container">
        <div class="contents scroll" id="chat">
            <div class="contents input">
                <div>
                    <input class="msg" id="massages" type="text" v-model="message" placeholder="message"
                        maxlength="200" />
                </div>
                <button @click="insertChatMessages()">Send</button>
            </div>
        </div>
    </div>

</template>


<script>
import axios from 'axios';
import CancelPurchaseButton from '@/components/CancelPurchaseButton.vue';

export default {
    name: 'ChatPage',
    components: {
        CancelPurchaseButton
    },
    data() {
        return {
            message: '',
            messages: [],// チャットメッセージを表示するための配列
            prevLength: 0 // 前回のメッセージの数
        };
    },
    methods: {
        async insertChatMessages() {
            console.log("insertChatMessages");
            if (this.message.trim() === '') {
                return; // 空のメッセージは送信しない
            }
            try {
                const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
                //7/12 process.env.EXPRESS_APP_API_URLから process.env.VUE_APP_EXPRESS_URLに変更
                const url = express + '/chatPage';
                await axios.get(url, {
                    params: {
                        //insertをhttp通信で呼ぶ
                        action: 'insert',
                        text: this.message,
                        senderStudentId: this.$route.query.senderStudentId,
                        orderId: this.$route.query.orderId
                    }
                });
                this.message = ''; // メッセージ送信後に入力欄をクリア
                this.loadChatMessages(); // チャットメッセージを再読み込み，これで送信したメッセージが表示される
            }
            catch (error) {
                alert('チャットメッセージの送信に失敗しました');
                console.error(error);
            }
        },
        async loadChatMessages() {
            console.log("loadChatMessages");
            try {
                const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
                //7/12 process.env.EXPRESS_APP_API_URLから process.env.VUE_APP_EXPRESS_URLに変更
                const url = express + '/chatPage';
                const response = await axios.get(url, {
                    params: {
                        action: 'load',
                        prevLength: this.prevLength, // 前回のメッセージの数を送信
                        senderStudentId: this.$route.query.senderStudentId,
                        orderId: this.$route.query.orderId
                    }
                });
                const chat = response.data;
                if(chat === false) { // オーダーがキャンセルされた場合
                    alert('オーダーがキャンセルされました');
                    this.$router.push({ name: 'ProfilePage', query: { studentId: this.$route.query.senderStudentId }});
                    return;
                }
                //console.log(chat);
                // チャットメッセージを表示
                const chatDiv = document.getElementById('chat');
                for (let c in chat) {
                    chatDiv.appendChild(this.createMessage(chat[c]));
                }
                if (chat.length > 0) {
                    chatDiv.scrollTo(0, chatDiv.scrollHeight);
                }
                this.prevLength += chat.length;
            }
            catch (error) {
                alert('チャットメッセージの取得に失敗しました');
                console.error(error);
            }

        },
        createMessage(json) {
            const side = json.mine ? 'mine' : 'other';
            const sideElement = this.createDiv(side);
            const sideTextElement = this.createDiv(`${side}-text`);
            const timeElement = this.createDiv('time');
            const nameElement = this.createDiv('name');
            const textElement = this.createDiv('text');
            timeElement.textContent = json.time;
            nameElement.textContent = json.name;
            textElement.textContent = json.message;
            sideElement.appendChild(sideTextElement);
            sideTextElement.appendChild(nameElement);
            sideTextElement.appendChild(textElement);
            sideTextElement.appendChild(timeElement);
            return sideElement;
        },

        createDiv(className) {
            const element = document.createElement('div');
            element.classList.add(className);
            return element;
        }
    },
    mounted() {
        this.loadChatMessages();
        this.intervalId = setInterval(this.loadChatMessages, 7000); // 7秒ごとにチャットメッセージを取得
    },
    unmounted() {
        clearInterval(this.intervalId);
    }

}

</script>

<style>
.chatheader {
    width: 100%;
    height: 60px;
    background: #1A4D2E;
    position: fixed;
    padding: 10px 40px;
    display: flex;
    text-align: left;
    vertical-align: middle;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    margin: 0;
}
.logo {
    display: flex;
    align-items: center;
}

.logo-image {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}
.chattitle{
    color: #ffffff;
}

.chatheader .back {
    vertical-align: middle;
    font-size: 35px;
    background-color: transparent;
    border: none;
    color: #ffffff;
    vertical-align: middle;
}

.chatheader .back:hover {
    opacity: 0.5;
}

.chatheader .mypage {
    left: 50%;
    color: #ffffff;
    background-color: transparent;
    border: none;
    font-size: 9px;
    vertical-align: middle;
    display: inline-block;
    text-align: right;
    text-decoration: none;
    font-weight: bold;
    font-size: 17px;

}

.chatheader .mypage:hover {
    opacity: 0.5;
}

.container {
    padding-top: 60px;
    background: #ffffff;

}

/* 会話部分 */
.container .contents {

    overflow: hidden;
    line-height: 135%;
}

.container .scroll {
    height: 635px;
    width: 100%;
    overflow-y: scroll;
    padding-top: 10px;
}

/* 相手の会話 */
.other {
    width: 80%;
    position: relative;
    display: block;
    margin: 5px;
    clear: both;
}

.container .other .other-text {
    margin-left: 10px;
    max-width: 60%;
}

.container .other .other-text .name {
    font-size: 80%;
    color: #4F6F52;
    text-align: left;
}

.container .other .other-text .time {
    font-size: 40%;
    color: #4F6F52;
    text-align: right;
}

.other .text {
    margin: 0;
    position: relative;
    padding: 10px;
    border-radius: 10px 10px 10px 0px;
    background-color: #E8DFCA;
    text-align: left;
}

/* 自分の会話 */
.container .mine {
    width: 50%;
    max-width: 80%;
    position: relative;
    display: block;
    margin: 5px;
    clear: both;
    float: right;
}

.container .mine .mine-text {
    margin-right: 10px;
    color: #ffffff;
}

.container .mine .mine-text .name {
    font-size: 80%;
    color: #4F6F52;
    text-align: right;

}

.container .mine .mine-text .time {
    font-size: 40%;
    color: #4F6F52;
    text-align: left;
}

/* コメントエリア */
.container .mine .text {
    padding: 10px;
    border-radius: 10px 10px 0px 10px;
    background-color: #4F6F52;
    margin: 0;
    text-align: left;

}

/* 入力部分 */
.container .input {
    background: #E8DFCA;
    padding: 30px;
    width: 100%;
    position: fixed;
    bottom: 0;
    margin: 0;

}

.container .input input {
    padding: 5px;
    border-radius: 10px;
    border-style: none;
    margin-right: 0;
}

.container .input .msg {
    width: 80%;
    float: left;
    height: 30px;
}

.container .input button {
    padding: 5px 20px;
    border-radius: 5px;
    border-style: none;
    margin-right: 5%;
    margin-left: 0;
    color: #606165;
    background-color: #ffffff;
    height: 30px;
}

.container .input button:hover {
    opacity: 0.5;
}
</style>