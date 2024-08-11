<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary p-1">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img :src="logo" alt="Logo" class="navbar-logo" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarColor04"
        aria-controls="navbarColor04"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor04">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" href="#/">Dashboard</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/graphs">My Graphs</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/graph-builder">Graph Builder</a>
          </li>
        </ul>
        <form class="d-flex">
          <button
            type="button"
            class="btn btn-secondary p-1 px-2 m-2"
            @click="toggleTheme"
          >
            <i class="fa-regular" :class="themeIcon"></i>
          </button>
          <input
            class="form-control me-sm-2"
            type="search"
            placeholder="Search"
          />
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import logo from '../../../../public/images/logo.svg';

// Create a ref to store the current theme
const currentTheme = ref<'light' | 'dark'>('light');

// Computed property for the icon class
const themeIcon = ref<string>('fa-sun');

// Function to toggle the theme
const toggleTheme = () => {
  const html = document.querySelector('html');

  if (!html) {
    console.error('HTML element not found');
    return;
  }

  // Toggle the theme
  const newTheme = currentTheme.value === 'light' ? 'dark' : 'light';
  currentTheme.value = newTheme;
  themeIcon.value = newTheme === 'light' ? 'fa-sun' : 'fa-moon';

  // Set the new theme on the HTML element
  html.setAttribute('data-bs-theme', newTheme);

  // Optionally, save the theme in local storage
  localStorage.setItem('theme', newTheme);
};

// Initialize the theme from local storage on page load
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    currentTheme.value = savedTheme as 'light' | 'dark';
    themeIcon.value = savedTheme === 'light' ? 'fa-sun' : 'fa-moon';
    document.querySelector('html')?.setAttribute('data-bs-theme', savedTheme);
  }
});
</script>

<style scoped>
/* Add any additional styles here if necessary */
.navbar-logo {
  height: 65px;
  width: 65px;
}
</style>
