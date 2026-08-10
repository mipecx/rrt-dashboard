import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import L from 'leaflet' // <-- Импортируем Leaflet сюда

// Фикс бага с пропавшими иконками маркеров в Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const app = createApp(App)

app.use(router)

app.mount('#app')
