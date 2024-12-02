<template>
  <template v-if="attrs.type === 'checkbox'">
    <input class="float-left -ml-6 mt-1 h-4 w-4 rounded" v-bind="attrs" />
    <label class="inline-block">{{ label }}</label>
  </template>
  <template v-else>
    <label v-if="label" class="mb-2 inline-block">{{ label }}</label>
    <input
      :type="type"
      class="block w-full rounded border border-gray-300 px-3 py-1.5 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
      v-bind="attrs"
    />
  </template>
</template>
<script setup>
import { useAttrs } from 'vue';

defineProps({
  label: String,
});

const attrs = useAttrs();
</script>
