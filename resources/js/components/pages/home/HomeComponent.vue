<template>
  <div>
    <div>COUNTER = {{ count }}</div>
    <button class="btn btn-primary" @click="increment">+</button>
    <button class="btn btn-primary mx-1" @click="decrement">-</button>
  </div>
</template>
<script setup lang="ts">
import { exampleStore } from '../../../stores/example.js';
import { storeToRefs } from 'pinia';

const counterStore = exampleStore();

// Destructure state and actions using storeToRefs
const { count } = storeToRefs(counterStore);
const { increment, decrement } = counterStore;
</script>
