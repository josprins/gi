<template>
  <form>
    <div>
      <label for="exampleSelect1" class="form-label mt-4">Example select</label>
      <select class="form-select" id="exampleSelect1" v-model="selectedItem">
        <option disabled value="">
          {{ placeholder }}
        </option>
        <option v-for="item in props.items" :value="item.value">
          {{ item.label }}
        </option>
      </select>
    </div>
  </form>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';

interface Item {
  label: string;
  value: string;
}

const props = defineProps<{
  items: Array<Item>;
  placeholder: string;
}>();

const emit = defineEmits<{
  (event: 'update:selectedItem', value: string): void;
}>();

const selectedItem = ref<string>('');

watch(selectedItem, (newValue) => {
  emit('update:selectedItem', newValue);
});
</script>
