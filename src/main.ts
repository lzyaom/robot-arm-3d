import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vLongPress from './directives/longpress'
const app = createApp(App)

app.directive('longpress', vLongPress)
app.mount('#app')
