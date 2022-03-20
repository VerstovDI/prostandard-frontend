import { createApp } from 'vue'
import App from './App.vue'
import 'buefy/dist/buefy.css'

import router from "./router/router";
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

const app = createApp(App).use(Quasar, quasarUserOptions).use(router);

router.isReady().then(()=> {
    app.mount('#app')
});