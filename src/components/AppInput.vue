<template>
  <template v-if="attrs.type === 'checkbox'">
    <input class="float-left w-4 h-4 mt-1 -ml-6 rounded" v-bind="attrs" />
    <label class="inline-block">{{ label }}</label>
  </template>
  <template v-else>
    <label v-if="label" class="inline-block mb-2">{{ label }}</label>
    <input :type="type" :value="modelValue" @input="onInputChange($event.target.value)"
      class="block w-full rounded border border-gray-300 px-3 py-1.5 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
      v-bind="attrs" />
  </template>
</template>
<script setup>
import { useAttrs } from 'vue';

defineProps({
  label: String,
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: [String, Boolean, Number],
    default: '',
  },
});
const attrs = useAttrs();

const emit = defineEmits(['update:modelValue']);
const onInputChange = (value) => emit('update:modelValue', value);
</script>
