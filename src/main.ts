import { createApp } from 'vue'
import naive from 'naive-ui'
import './style.css'
import App from './App.vue'
import vLongPress from './directives/longpress'
import router from './routes'
const app = createApp(App)

app.directive('longpress', vLongPress)
app.use(naive)
app.use(router)
app.mount('#app')
