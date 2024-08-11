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
          <div
            v-for="type in graphTypes"
            :key="type.value"
            class="form-check pointer"
          >
            <input
              class="form-check-input pointer"
              type="radio"
              name="graphType"
              :id="type.value"
              :value="type.value"
              v-model="selectedGraphType"
            />
            <label class="form-check-label pointer" :for="type.value">
              {{ type.label }}
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
        <h4 class="mt-5">Select what data you want to show</h4>
        <DropdownComponent
          label="Graph Indicator"
          :items="mappedIndicators"
          @update:modelValue="updateIndicator"
        />
      </div>
    </div>
    <button class="btn btn-success mt-5 build-button" @click="createGraph">
      Create graph
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, Ref } from 'vue';
import MultiSelectComponent from '../../general/MultiSelectComponent.vue';
import DropdownComponent from '../../general/DropdownComponent.vue';
import GraphBuilderMixin from './GraphBuilderMixin';

// Data & methods from mixin
const { indicators, countries, graphTypes } = GraphBuilderMixin.data();
const { fetchData } = GraphBuilderMixin.methods;

// Refs
const reactiveCountries = ref(countries);
const selectedIndicator = ref('');
const selectedCountries: Ref<string[]> = ref([]);
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

const mappedIndicators = computed(() =>
  indicators.map((indicator) => indicator.label)
);

// Functions
const handleSelectedItemChange = (
  selectedItems: Array<string>,
  type: string
) => {
  switch (type) {
    case 'countries':
      reactiveCountries.value.forEach((country) => {
        country.selected = selectedItems.includes(country.value);
      });

      selectedCountries.value = selectedItems;
      break;
  }
};

const updateRange = (year: number, type: string) => {
  if (type === 'start') yearStart = year;
  if (type === 'end') yearEnd = year;
};

const updateIndicator = (indicator: string) =>
  (selectedIndicator.value = indicator);

const createGraph = async () => {
  if (
    !selectedIndicator.value ||
    !selectedGraphType.value ||
    yearStart === null ||
    yearEnd === null
  ) {
    alert('Please select all fields before creating a graph.');
    return;
  }

  let bla: any = {};

  const indicatorCode = indicators.find(
    (ind) => ind.label === selectedIndicator.value
  );

  selectedCountries.value.forEach(async (country: string) => {
    const data: any = await fetchData(
      indicatorCode?.code ?? '',
      country,
      yearStart!,
      yearEnd!
    );

    bla[country] = data;
  });

  console.log(bla);

  // Integrate graph drawing logic using the fetched data
  console.log('Data to visualize:', bla);
};
</script>

<style scoped>
.error {
  color: red;
}

.build-button {
  width: 16rem;
}
</style>
