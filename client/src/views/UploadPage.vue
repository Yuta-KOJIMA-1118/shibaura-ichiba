<template>
    <div>
        <ShibauraHeader></ShibauraHeader>
        <div class="logout">
            <button @click="logout">ログアウト</button>
        </div>
        <h1>商品の出品</h1>
        <div>
            <router-link :to="{ path: 'profilePage', query: { studentId: this.$route.query.studentId } }">
                <button>マイページへ戻る</button>
            </router-link>
        </div>
        <div>
            <button @click="toggleIsTextbook">
                {{ isTextbook ? '教科書でない商品を出品' : '教科書を出品' }}
            </button>
        </div>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="image">商品画像:</label>
                <input type="file" id="image" @change="onFileChange" accept="image/*" multiple required>
            </div>
            <div class="form-group">
                <label for="stockName">商品名:</label>
                <input type="text" id="stockName" v-model="stockName" maxlength="20" required>
            </div>
            <div class="form-group">
                <label for="price">値段:</label>
                <input type="number" id="price" v-model="price" @input="validatePrice" required>
                <span v-if="priceError" style="color: red;">{{ priceError }}</span>
            </div>
            <div class="form-group">
                <label for="description">商品説明:</label>
                <textarea id="description" v-model="description" maxlength="100" required></textarea>
            </div>
            <div v-if="isTextbook">
                <div class="form-group">
                    <label for="subjectName">授業名:</label>
                    <input type="text" id="subjectName" v-model="subjectName" @input="fetchTextbooks">
                </div>
                <div class="form-group">
                    <label for="textbookName">教科書名:</label>
                    <input type="text" id="textbookName" v-model="textbookName" @input="fetchTextbooks">
                </div>
                <div class="form-group">
                    <label for="professorName">教授名:</label>
                    <input type="text" id="professorName" v-model="professorName" @input="fetchTextbooks">
                </div>
                <div class="form-group">
                    <label for="textbook">教科書を選択:</label>
                    <select id="textbook" v-model="selectedTextbookId" required>
                        <option v-for="textbook in textbooks" :key="textbook.id" :value="textbook.id">
                            [ {{ textbook.subjectName }} ]  [ {{ textbook.textbookName }} ]  [ {{ textbook.professorName }} ]
                        </option>
                    </select>
                </div>
            </div>
            <button type="submit">出品する</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import ShibauraHeader from '../components/shibauraHeader.vue';

export default {
    name: 'UploadPage',
    components: {
        ShibauraHeader
    },
    data() {
        return {
            images: [],
            price: '',
            priceError: '',
            description: '',
            subjectName: '',
            textbookName: '',
            professorName: '',
            textbooks: [],
            originTextbooks: [],
            selectedTextbookId: '',
            stockName: '',
            isTextbook: true,
            // 5MB
            maxFileSize: 5 * 1024 * 1024
        };
    },
    async created() {
        try {
            const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
            const url = express + '/stocks/textbooks';
            const response = await axios.get(url);
            this.originTextbooks = this.textbooks = response.data;
        } catch (error) {
            console.error('Error fetching textbooks:', error);
        }
    },
    methods: {
        logout() {
            console.log('ログアウトしました');
            this.$router.push('/');
        },
        toggleIsTextbook() {
            this.isTextbook = !this.isTextbook;
            if (!this.isTextbook) {
                this.subjectName = '';
                this.textbookName = '';
                this.professorName = '';
                this.selectedTextbookId = '';
                this.textbooks = [];
            }
        },
        onFileChange(event) {
            const files = Array.from(event.target.files);
            if (files.length > 4) {
                alert('最大4つの画像ファイルのみを選択できます。');
                event.target.value = null;
                return;
            }
            const validFiles = files.filter(file => file.type.startsWith('image/') && file.size <= this.maxFileSize);
            if (validFiles.length !== files.length) {
                alert(`すべてのファイルが画像であり、サイズが${this.maxFileSize / (1024 * 1024)}MB以下であることを確認してください。`);
                event.target.value = null;
                return;
            }
            this.images = validFiles;
        },
        validatePrice() {
            const MAX_PRICE = 2147483647;
            const price = Number(this.price);
            if (!Number.isInteger(price) || price < 0 || price > MAX_PRICE) {
                this.priceError = `価格は整数であり、0から${MAX_PRICE}の間でなければなりません。`;
                this.price = '';
            } else {
                this.priceError = '';
            }
        },
        fetchTextbooks() {
            if (this.isTextbook) {
                this.textbooks = this.originTextbooks.filter(textbook =>
                    textbook.subjectName.includes(this.subjectName) &&
                    textbook.textbookName.includes(this.textbookName) &&
                    textbook.professorName.includes(this.professorName)
                );
            }
        },
        async submitForm() {
            console.log('Form submitted!', {
                image: this.image,
                price: this.price,
                description: this.description,
                textbookId: this.isTextbook ? this.selectedTextbookId : null
            });

            const formData = new FormData();
            this.images.forEach((image) => {
                formData.append(`images`, image);
            });
            formData.append('studentId', this.$route.query.studentId);
            formData.append('price', this.price);
            formData.append('stockName', this.stockName);
            formData.append('description', this.description);
            if (this.isTextbook) {
                formData.append('textbookId', this.selectedTextbookId);
            } else {
                formData.append('textbookId', 1);
            }

            try {
                const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
                const url = express + '/listing';
                await axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } catch (error) {
                console.error('Error submitting form:', error);
            }

            alert('出品完了しました');
            this.$router.push({ name: 'ProfilePage', query: { studentId: this.$route.query.studentId } });
        }
    }
};
</script>

<style scoped>
h1 {
    color: red;
}

.logout {
    position: absolute;
    top: 10px;
    right: 10px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #204C3B;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
}

button:hover {
    background-color: #358a5b;
}

h1 {
    text-align: center;
    margin-top: 20px;
    color: #333;
}

.navigation, .toggle {
    text-align: center;
    margin: 20px 0;
}

form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

.form-group input {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    text-align: left;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    text-align: left;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.form-group input[type="file"] {
    padding: 10px 0;
}

.error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
    display: block;
}
</style>