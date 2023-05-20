import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PopComment from '~/index'

const app = createApp(App)
app.use(PopComment)
app.mount('#app')
