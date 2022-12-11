import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vLongPress from './directives/longpress'
import router from './routes'
const app = createApp(App)

app.directive('longpress', vLongPress)
app.use(router)
app.mount('#app')
