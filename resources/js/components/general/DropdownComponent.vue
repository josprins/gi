<template>
  <form>
    <label for="dropdown-select" class="form-label mt-4">{{ label }}</label>
    <select class="form-select" id="dropdown-select" @change="emitSelection">
      <option value="" disabled selected hidden>{{ placeholder }}</option>
      <option v-for="item in items" :key="item">{{ item }}</option>
    </select>
  </form>
</template>
<script setup lang="ts">
// Props
const props = withDefaults(
  defineProps<{
    items: Array<number>;
    placeholder?: string;
    label?: string;
  }>(),
  {
    multiSelect: false,
    label: undefined,
    placeholder: 'Select an option',
  }
);

// Emits
const emit = defineEmits(['update:modelValue']);

// Functions
const emitSelection = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', Number(target.value));
};
</script>
<style lang=""></style>
