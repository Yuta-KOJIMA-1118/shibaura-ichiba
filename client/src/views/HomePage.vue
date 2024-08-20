/**
* @component HomePage
* @description ホームページコンポーネント，このコンポーネントは，App.vueにルーティングされ，最初に表示される．テスト用のコンポーネントのため，実際のアプリケーションでは，このコンポーネントは削除される．
*
* @since 2024-06-10
* @author 小島佑太
*/
<template>
    <div>
        <Header @setHeaderHeight="setHeaderHeight" @searchInput="handleSearchInput" :studentId="Number(this.studentId)">
        </Header>
        <div class="content-container">
            <Sidebar :headerHeight="this.headerHeight" @toggle="handleSidebarToggle"
                @filterTextbooks="handleFilterTextbooks"></Sidebar>
            <div :class="['main-content', { 'sidebar-open': isSidebarOpen }]"
                :style="{ marginRight: isSidebarOpen ? '300px' : '50px' }">
                <div v-if="loading">Loading...</div>
                <div v-else class="products-container">
                    <Product v-for="stock in stocks" :key="stock.id" :stockId="stock.id" :studentId="Number(this.studentId)"
                        :explanation="stock.stockName" :price="stock.price" :filename="JSON.parse(stock.picturePath)[0]"></Product>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/HeaderComponent.vue';
import Product from '@/components/ProductContainer.vue';
import Sidebar from '@/components/SidebarComponent.vue';
import axios from 'axios';

export default {
    name: 'HomePage',
    components: {
        Product,
        Header,
        Sidebar,
    },
    data() {
        return {
            stocks: [],
            loading: true,
            isSidebarOpen: false,
            headerHeight: 0,
            studentId: null,
            searchQuery: '',
            selectedTextbooks: [],
            selectedSubjectName: '',
            selectedProfessor: '',
            omiya: false,
            toyosu: false
        };
    },
    methods: {
        handleSidebarToggle(isOpen) {
            this.isSidebarOpen = isOpen;
        },
        setHeaderHeight(height) {
            this.headerHeight = height;
            document.documentElement.style.setProperty('--header-height', `${height}px`);
        },
        async fetchFilteredStocks() {
            this.loading = true;
            try {
                const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
                const url = express + '/stocks';
                const response = await axios.get(url, {
                    params: {
                        studentId: this.studentId,
                        searchQuery: this.searchQuery,
                        subjectName: this.selectedSubjectName,
                        professorName: this.selectedProfessor
                    }
                });
                this.stocks = response.data;
            } catch (error) {
                console.error('Error fetching stocks:', error);
            } finally {
                this.loading = false;
            }
        },
        handleSearchInput(query) {
            this.searchQuery = query;
            this.fetchFilteredStocks();
        },
        handleFilterTextbooks(filterOptions) {
            this.selectedSubjectName = filterOptions.selectedSubjectName;
            this.selectedProfessor = filterOptions.selectedProfessor;
            this.fetchFilteredStocks();
        }
    },
    async created() {
        this.studentId = this.$route.query.studentId;
        await this.fetchFilteredStocks();
    }
};
</script>

<style scoped>
:root {
    --header-height: 60px;
}

.content-container {
    display: flex;
    margin-top: var(--header-height);
    transition: margin-top 0.3s ease-in-out;
}

.main-content {
    flex-grow: 1;
    transition: margin-right 0.3s ease-in-out;
    padding: 20px;
}

.sidebar-open {
    margin-right: 300px;
}

.products-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
    width: 100%;
    box-sizing: border-box;
}
</style>