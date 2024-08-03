<template>
    <div>
      {{ msg }}
    </div>
  </template>
  
  <script setup>
  import { defineProps, toRefs } from 'vue';
  
  // Define the props using defineProps
  const props = defineProps({
    msg: String
  });
  
  // Use toRefs to create reactive references to the props
  const { msg } = toRefs(props);
  
  console.log(msg);
  </script>
  
  <style>
  /* Add your styles here */
  </style>