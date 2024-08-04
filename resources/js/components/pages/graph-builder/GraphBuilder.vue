<template>
    <div>
DATA
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import axios from 'axios';

interface GDPData {
    data: any; // Replace 'any' with a more specific type based on expected response structure
}

onMounted(() => {
    axios.get<GDPData>('api/proxy/gdp')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
})
</script>

<style scoped>
.error {
    color: red;
}
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f4f4f4;
}
</style>