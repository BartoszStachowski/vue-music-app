import './assets/base.css';
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { nhost } from './lib/nhost';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(nhost);
app.use(createPinia());
app.use(router);

app.mount('#app');
