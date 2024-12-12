<template>
  <template v-if="type === 'checkbox'">
    <input class="float-left w-4 h-4 mt-1 -ml-6 rounded" :value="modelValue" :type="type" v-bind="attrs"
      @input="onInputChange($event.target.value)" />
    <label class="inline-block" v-html="label" />
  </template>
  <template v-else>
    <label v-if="label" class="inline-block mb-2" v-html="label" />
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
