<template>
  <div class="container px-5">
    <h2 class="mt-4">Build a graph</h2>
    <p>Please fill out the form below to configure your graph settings</p>
    <div class="row">
      <div class="col">
        <DropdownComponent
          :items="computedCountries"
          placeholder="Select an option"
          :multi-select="true"
          @update:selectedItems="
            (selectedItems) =>
              handleSelectedItemChange(selectedItems, 'countries')
          "
        />
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DropdownComponent from '../../general/DropdownComponent.vue';
import GraphBuilderMixin from './GraphBuilderMixin';

const { indicators, countries, graphTypes } = GraphBuilderMixin.data();
const { fetchData } = GraphBuilderMixin.methods;

// Wrap countries in a ref to enable reactivity
const reactiveCountries = ref(countries);

const selectedIndicator = ref('');
const selectedCountry = ref('');
const selectedGraphType = ref('');

// Use computed to provide the list of countries
const computedCountries = computed(() => reactiveCountries.value);

const handleSelectedItemChange = (
  selectedItems: Array<string>,
  type: string
) => {
  console.log(selectedItems);

  switch (type) {
    case 'countries':
      reactiveCountries.value.forEach((country) => {
        // Update selected state based on whether the country is in selectedItems
        country.selected = selectedItems.includes(country.value);
      });
      break;
  }
};

const createGraph = async () => {
  if (
    !selectedIndicator.value ||
    !selectedCountry.value ||
    !selectedGraphType.value
  ) {
    alert('Please select all fields before creating a graph.');
    return;
  }

  const startYear = 2010;
  const endYear = 2022;

  const data = await fetchData(
    selectedIndicator.value,
    selectedCountry.value,
    startYear,
    endYear
  );

  // Integrate graph drawing logic using the fetched data
  console.log('Data to visualize:', data);
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
