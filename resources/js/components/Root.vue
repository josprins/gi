<template>
    <Navbar />
    <component :is="currentView" />
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import type { Component } from 'vue';
  import Navbar from './general/NavBar.vue'
  import Home from './pages/home/HomeComponent.vue';
  import Graphs from './pages/graphs/GraphsComponent.vue';
  import GraphBuilder from './pages/graph-builder/GraphBuilder.vue';
  import NotFound from './pages/NotFound.vue'; // Ensure NotFound is correctly defined
  
  // Define the type for the routes object
  type Routes = Record<string, Component>;
  
  // Define your routes with the proper component types
  const routes: Routes = {
    '/': Home,
    '/graphs': Graphs,
    '/graph-builder': GraphBuilder
  };
  
  // Create a ref for the current path
  const currentPath = ref<string>(window.location.hash);
  
  // Update current path on hash change
  window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash;
  });
  
  // Compute the current view based on the current path
  const currentView = computed<Component>(() => {
    // Remove the leading '#' from the hash
    const pathKey = currentPath.value.slice(1) || '/';
    // Return the matched component or NotFound if no match
    return routes[pathKey] || NotFound;
  });
  </script>