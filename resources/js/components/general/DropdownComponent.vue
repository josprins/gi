<template>
  <form class="d-flex flex-column">
    <label for="dropdown-select" class="form-label mt-4">Example select</label>
    <button
      class="btn btn-outline-secondary"
      v-show="focus === false"
      @click="setFocus"
    >
      <span v-if="selectedItems.length === 0">Select countries</span>
      <span v-else>{{ selectedItems.join(', ') }}</span>
    </button>
    <div v-show="focus">
      <select multiple class="form-select" id="dropdown-select" size="">
        <option
          v-for="item in props.items"
          :key="item.value"
          :value="item.value"
          @click="handleSelection"
        >
          <input type="checkbox" :checked="item.selected" />
          {{ item.label }}
        </option>
      </select>
      <button
        type="button"
        class="btn btn-sm btn-outline-secondary mt-1 px-1 py-1"
        @click="setFocus"
      >
        done
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

interface Item {
  label: string;
  value: string;
  selected?: boolean;
}

// Define props with default values
const props = withDefaults(
  defineProps<{
    items: Array<Item>;
    placeholder: string;
    multiSelect?: boolean;
  }>(),
  {
    multiSelect: false,
  }
);

const emit = defineEmits<{
  (event: 'update:selectedItems', value: Array<string>): void;
}>();

const selectedItems = ref<Array<string>>([]);
const focus = ref(false);

const setFocus = () => {
  focus.value = !focus.value;
};

const handleSelection = (event: Event) => {
  const selectedValue = (event.target as HTMLSelectElement).value;
  console.log(selectedValue);
  console.log(1, selectedItems);

  if (selectedItems.value.includes(selectedValue)) {
    selectedItems.value = selectedItems.value.filter(
      (item) => item !== selectedValue
    );
  } else {
    selectedItems.value.push(selectedValue);
  }

  console.log(2, selectedItems);

  emit('update:selectedItems', selectedItems.value);
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
</style>
