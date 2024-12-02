<template>
  <label v-if="label" class="mb-2 inline-block">{{ label }}</label>
  <input
    :type="type"
    :autocomplete="autocomplete"
    class="block w-full rounded border border-gray-300 px-3 py-1.5 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
    :placeholder="placeholder"
  />
</template>
<script setup>
defineProps({
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
  autocomplete: String,
});
</script>
