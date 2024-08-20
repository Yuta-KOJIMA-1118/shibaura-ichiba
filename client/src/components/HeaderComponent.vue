<template>
    <header ref="header" class="header">
        <div class="logo">
            <img src="/favicon.ico" alt="Logo" class="logo-image" />
            <h1>芝浦市場</h1>
        </div>
        <div class="search-bar">
            <input type="text" placeholder="Search for items" @input="handleInput" />
        </div>
        <nav class="nav-links">
            <a><router-link :to="{ name: 'ProfilePage', query: { studentId: studentId } }">ProfilePage</router-link></a>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'HeaderComponent',
    props: {
        studentId: {
            type: Number,
            required: true
        }
    },
    mounted() {
        const headerHeight = this.$refs.header.clientHeight;
        const headerPadding = parseInt(window.getComputedStyle(this.$refs.header).paddingTop, 10) * 2;
        this.$emit('setHeaderHeight', headerHeight + headerPadding);
    },
    methods: {
        handleInput(event) {
            this.$emit('searchInput', event.target.value);
        }
    }
}
</script>

<style scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #f8f8f8;
    border-bottom: 1px solid #ddd;
    z-index: 1000;
    box-sizing: border-box;
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

h1 {
    font-size: 24px;
    margin: 0;
    color: #333;
}

.search-bar input {
    width: 300px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.nav-links a {
    margin: 0 10px;
    text-decoration: none;
    color: #333;
    font-weight: bold;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: #e60023;
}
</style>