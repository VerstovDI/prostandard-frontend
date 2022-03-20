import { createApp } from 'vue'
import App from './App.vue'
import 'buefy/dist/buefy.css'

import router from "./router/router";

const app = createApp(App).use(router);

router.isReady().then(()=> {
    app.mount('#app')
});