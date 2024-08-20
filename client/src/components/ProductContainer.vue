<template>
    <div class="item-container" @click="toItemPage">
        <img :src="imageSrc" alt="Loaded Image" class="item-thumbnail" />
        <!-- <img :src="'/example.jpg'" alt="Item thumbnail" class="item-thumbnail" /> -->
        <div class="item-details">
            <p class="item-price">¥{{ price.toLocaleString() }}</p>
            <p class="item-explanation">{{ explanation }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            imageSrc: ''
        };
    },
    props: {
        stockId: {
            type: Number,
            required: true
        },
        studentId: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        explanation: {
            type: String,
            required: true
        },
        thumbnailUrl: {
            type: String,
            // required: true
        },
        filename: {
            type: String,
            // require: true
        }
    },
    async created() {
        try {
            const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
            const url = express + '/getItemInfo/images';
            console.log('URL:', url);
            const response = await axios.get(url, {
                responseType: 'blob',
                params: {
                    filename: this.filename,
                }
            });
            this.imageSrc = URL.createObjectURL(response.data);
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        toItemPage() {
            this.$router.push({ name: 'ItemPage', query: { stockId: this.stockId, studentId: this.studentId } });
        }
    }
}
</script>

<style scoped>
.item-container {
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin: 10px;
    cursor: pointer;
    transition: box-shadow 0.3s;
}

.item-container:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.item-thumbnail {
    width: 100%;
    height: 150px;
    object-fit: cover;
}

.item-details {
    padding: 10px;
}

.item-price,
.item-explanation {
    margin: 5px 0;
    color: #333;
}

.item-price {
    font-size: 16px;
    font-weight: bold;
    color: #e60023;
}

.item-explanation {
    font-size: 14px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
