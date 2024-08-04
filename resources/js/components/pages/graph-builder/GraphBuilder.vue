<template>
  <div class="container px-5">
    <h2 class="mt-4">Build a graph</h2>
    <p>Please fill out the form below to configure your graph settings</p>
    <div class="row">
      <div class="col">
        <DropdownComponent
          :items="items"
          placeholder="Select an option"
          @update:selectedItem="handleSelectedItemChange"
        />
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DropdownComponent from '../../general/DropdownComponent.vue';

const items = ref([
  { value: 'value1', label: 'Label 1' },
  { value: 'value2', label: 'Label 2' },
  // Add more items as needed
]);

const handleSelectedItemChange = (selectedValue: string) => {
  console.log('Selected item:', selectedValue);
  // Handle the selected item value in the parent component
};
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

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
