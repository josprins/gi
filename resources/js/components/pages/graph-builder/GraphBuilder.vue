<template>
  <div class="container px-5">
    <h2 class="mt-4">Build a graph</h2>
    <p>Please fill out the form below to configure your graph settings</p>
    <div class="row">
      <div class="col">
        <h4>Select countries</h4>
        <MultiSelectComponent
          :items="computedCountries"
          placeholder="Select an option"
          :multi-select="true"
          @update:selectedItems="
            (selectedItems) =>
              handleSelectedItemChange(selectedItems, 'countries')
          "
        />
        <fieldset>
          <legend class="mt-4">Graph type</legend>
          <div class="form-check pointer">
            <input
              class="form-check-input pointer"
              type="radio"
              name="graphType"
              id="graphType1"
              value="option1"
            />
            <label class="form-check-label pointer" for="graphType1">
              Line
            </label>
          </div>
          <div class="form-check pointer">
            <input
              class="form-check-input pointer"
              type="radio"
              name="graphType"
              id="graphType2"
              value="option2"
            />
            <label class="form-check-label pointer" for="graphType2">
              Bar
            </label>
          </div>
          <div class="form-check pointer">
            <input
              class="form-check-input pointer"
              type="radio"
              name="graphType"
              id="graphType3"
              value="option3"
            />
            <label class="form-check-label pointer" for="graphType3">
              Pie
            </label>
          </div>
        </fieldset>
      </div>
      <div class="col">
        <h4>Select range in years</h4>
        <DropdownComponent
          label="Start"
          :items="yearRange"
          @update:modelValue="(year) => updateRange(year, 'start')"
        />
        <DropdownComponent
          label="End"
          :items="yearRange"
          @update:modelValue="(year) => updateRange(year, 'end')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import MultiSelectComponent from '../../general/MultiSelectComponent.vue';
import DropdownComponent from '../../general/DropdownComponent.vue';
import GraphBuilderMixin from './GraphBuilderMixin';

// Data from mixin
const { indicators, countries, graphTypes } = GraphBuilderMixin.data();
const { fetchData } = GraphBuilderMixin.methods;

// Refs
const reactiveCountries = ref(countries);
const selectedIndicator = ref('');
const selectedCountry = ref('');
const selectedGraphType = ref('');
let yearStart: number | null = null;
let yearEnd: number | null = null;

// Computed
const computedCountries = computed(() => reactiveCountries.value);
const yearRange = computed(() => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 10;

  return Array.from({ length: 21 }, (_, i) => startYear + i);
});

// Functions
const handleSelectedItemChange = (
  selectedItems: Array<string>,
  type: string
) => {
  switch (type) {
    case 'countries':
      reactiveCountries.value.forEach((country) => {
        country.selected = selectedItems.includes(country.label);
      });
      break;
  }
};

const updateRange = (year: number, type: string) => {
  if (type === 'start') yearStart = year;
  if (type === 'end') yearEnd = year;
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
</style>
