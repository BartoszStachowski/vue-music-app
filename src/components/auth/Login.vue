<template>
    <form @submit.prevent="handleLogin">
        <div class="mb-3">
            <AppInput v-model="email" type="text" label="Email" placeholder="Enter Email" />
        </div>
        <div class="mb-3">
            <AppInput v-model="password" label="Password" type="password" placeholder="Password"
                autocomplete="current-password" />
        </div>
        <div v-if="errorMsg" class="mb-3 text-center text-red-500">
            {{ errorMsg }}
        </div>
        <button type="submit"
            class="block w-full rounded bg-purple-600 px-3 py-1.5 text-white transition hover:bg-purple-700">
            Submit
        </button>
    </form>
</template>
<script setup>
import { ref } from 'vue'
import AppInput from '@/components/AppInput.vue';
import { validateEmail, validatePassword } from '@/utils/validators';

const email = ref('')
const password = ref('')
const errorMsg = ref('')

const handleLogin = () => {
    errorMsg.value = '';

    const obj = {
        email: email.value,
        password: password.value,
    };

    if (validateEmail(obj.email)) {
        return (errorMsg.value = validateEmail(obj.email));
    }

    if (validatePassword(obj.password)) {
        return (errorMsg.value = validatePassword(obj.password));
    }
    // TODO: connect with nhost
    console.log(obj);
};
</script>