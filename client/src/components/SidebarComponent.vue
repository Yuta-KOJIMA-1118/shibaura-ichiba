<template>
    <div :class="['sidebar', { 'sidebar--open': isOpen }]" :style="{ top: headerHeight + 'px' }">
        <div class="sidebar-toggle" @click="toggleSidebar">
            <span>{{ isOpen ? '>' : '<' }}</span>
        </div>
        <div class="sidebar-content" v-if="isOpen">
            <div>
                <SuggestTextbooks @sendSubjectName="handleSuggestedSubjectName"></SuggestTextbooks>
            </div>
            <h2>Filter</h2>
            <div class="form-group">
                <label for="subjectName">授業名:</label>
                <input type="text" id="subjectName" v-model="subjectName" @input="fetchSubjectNames">
            </div>
            <div class="form-group">
                <label for="textbook">授業名を選択:</label>
                <select id="textbook" v-model="selectedSubjectName" required>
                    <option v-for="subjectName in selectedSubjectNames" :key="subjectName">
                        {{ subjectName }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="professorName">教授名:</label>
                <input type="text" id="professorName" v-model="professorName" @input="fetchProfessorNames">
            </div>
            <div class="form-group">
                <label for="textbook">教授名を選択:</label>
                <select id="textbook" v-model="selectedProfessorName" required>
                    <option v-for="professor in selectedProfessors" :key="professor">
                        {{ professor }}
                    </option>
                </select>
            </div>
            <button @click="applyFilter">フィルタ適用</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import SuggestTextbooks from './SuggestTextbooks.vue';

export default {
    components: {
        SuggestTextbooks
    },
    props: {
        headerHeight: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            isOpen: false,
            textbooks: [],
            selectedSubjectNames: [],
            selectedProfessors: [],
            suggestedSubjectName: null,
            subjectName: '',
            professorName: '',
            selectedSubjectName: '',
            selectedProfessorName: '',
        };
    },
    async created() {
        try {
            const express = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
            const url = express + '/stocks/textbooks';
            const response = await axios.get(url);
            this.textbooks = response.data;
            this.selectedSubjectNames = this.uniqueSubjectNames;
            this.selectedProfessors = this.uniqueProfessors;
        } catch (error) {
            console.error('Error fetching textbooks:', error);
        }
    },
    computed: {
        uniqueProfessors() {
            const professors = this.textbooks.map(textbook => textbook.professorName);
            return [...new Set(professors)];
        },
        uniqueSubjectNames() {
            const subjectNames = this.textbooks.map(textbook => textbook.subjectName);
            return [...new Set(subjectNames)];
        },
    },
    methods: {
        toggleSidebar() {
            this.isOpen = !this.isOpen;
            this.$emit('toggle', this.isOpen);
        },
        applyFilter() {
            this.$emit('filterTextbooks', {
                selectedSubjectName: this.selectedSubjectName,
                selectedProfessor: this.selectedProfessorName,
            });
        },
        handleSuggestedSubjectName(subjectName) {
            this.suggestedSubjectName = subjectName;
            this.selectedSubjectName = subjectName;
            console.log("suggestedSubjectName: ", this.suggestedSubjectName);
            this.applyFilter()
        },
        fetchSubjectNames() {
            this.selectedSubjectNames = this.uniqueSubjectNames.filter(subjectName => subjectName.includes(this.subjectName));
        },
        fetchProfessorNames() {
            this.selectedProfessors = this.uniqueProfessors.filter(professorName => professorName.includes(this.professorName));
        }
    }
};
</script>

<style scoped>
.sidebar {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 50px;
    overflow: hidden;
    background-color: #f8f8f8;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    transition: width 0.3s ease-in-out;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sidebar--open {
    width: 300px;
}

.sidebar-toggle {
    width: 100%;
    height: 40px;
    background-color: #ff6f61;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;
}

.sidebar-toggle:hover {
    background-color: #e55a4f;
}

.sidebar-content {
    padding: 20px;
    width: 100%;
    overflow-y: auto;
}

.filter-group {
    margin-bottom: 20px;
}

h3 {
    margin-bottom: 10px;
}

label {
    display: block;
    margin-bottom: 10px;
}

input[type="checkbox"],
input[type="radio"] {
    margin-right: 10px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #ff6f61;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #e55a4f;
}

.form-group{
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    margin-left: 10px;
    text-align: left;
}
</style>