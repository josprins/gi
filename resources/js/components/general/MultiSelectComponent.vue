<template>
  <form class="d-flex flex-column">
    <label v-if="label" for="dropdown-select" class="form-label mt-4"
      >Example select</label
    >
    <div class="select-button">
      <span v-if="selectedItems.length === 0">Select countries</span>
      <span v-else>{{ selectedItems.join(', ') }}</span>
    </div>
    <div>
      <select multiple class="form-select mt-0" id="dropdown-select" size="10">
        <option
          v-for="item in props.items"
          :key="item.value"
          :value="item.value"
          @click="handleSelection(item)"
        >
          <input type="checkbox" :checked="item.selected" />
          {{ item.label }}
        </option>
      </select>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// Interfaces
interface Item {
  label: string;
  value: string;
  selected?: boolean;
}

// Props
const props = withDefaults(
  defineProps<{
    items: Array<Item>;
    placeholder: string;
    multiSelect?: boolean;
    label?: string;
  }>(),
  {
    multiSelect: false,
    label: undefined,
  }
);

// Emits
const emit = defineEmits<{
  (event: 'update:selectedItems', value: Array<string>): void;
}>();

// Refs
const selectedItems = ref<Array<string>>([]);
const selectedItemValues = ref<Array<string>>([]);

type Country = {
  label: string;
  value: string;
  selected: boolean;
};
// Functions
const handleSelection = (country: Country) => {
  const selectedValue = country.value;
  const selectedLabel = country.label;

  if (selectedItems.value.includes(selectedLabel)) {
    selectedItems.value = selectedItems.value.filter(
      (item) => item !== selectedLabel
    );
    selectedItemValues.value = selectedItemValues.value.filter(
      (item) => item !== selectedValue
    );
  } else {
    selectedItems.value.push(selectedLabel);
    selectedItemValues.value.push(selectedValue);
  }

  emit('update:selectedItems', selectedItemValues.value);
};
</script>

<style scoped>
.form-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-select {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.select-button {
  margin-top: 27px;
}

.select-button > span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 375px;
  display: inline-block;
}

.select-button:hover > span {
  white-space: unset;
  overflow: unset;
  text-overflow: unset;
  display: inline;
}
</style>
