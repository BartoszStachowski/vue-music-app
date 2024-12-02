<template>
  <label v-if="label" class="mb-2 inline-block">{{ label }}</label>
  <select
    class="block w-full rounded border border-gray-300 px-3 py-1.5 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
  >
    <option v-for="option in options" :value="option" :key="option">{{ option }}</option>
  </select>
</template>
<script setup>
defineProps({
  options: Array,
  label: String,
});
</script>
