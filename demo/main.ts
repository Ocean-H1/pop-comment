import { createApp } from 'vue'
import App from './App.vue'

import PopComment from '~/index'
import '~/styles/index.scss'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(PopComment)
app.use(ElementPlus)
app.mount('#app')
