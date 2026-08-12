<template>
  <div
    class="h-screen w-screen bg-surface flex items-center justify-center antialiased text-on-surface"
  >
    <div
      class="w-full max-w-sm p-8 bg-surface-container-low border border-surface-container-high rounded-default shadow-2xl"
    >
      <!-- Лого -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-black text-emergency tracking-wider uppercase">
          RRT Dispatcher panel
        </h1>
        <span class="text-xs text-data-gray font-medium">Control Panel Access</span>
      </div>

      <!-- Форма -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <div
          v-if="error"
          class="text-xs text-emergency bg-emergency/10 border border-emergency/20 p-3 rounded-default"
        >
          {{ error }}
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-data-gray mb-2">
            Телефон диспетчера
          </label>
          <input
            type="text"
            v-model="phone"
            placeholder="+66088888881"
            class="w-full bg-surface-container border border-surface-container-high rounded-default px-4 py-3 text-sm text-on-surface placeholder-data-gray/50 focus:outline-none focus:border-alert transition-colors"
            required
          />
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-data-gray mb-2">
            Пароль
          </label>
          <input
            type="password"
            v-model="password"
            placeholder="••••••••"
            class="w-full bg-surface-container border border-surface-container-high rounded-default px-4 py-3 text-sm text-on-surface placeholder-data-gray/50 focus:outline-none focus:border-alert transition-colors"
            required
          />
        </div>

        <!-- Кнопка входа: Акцентный вторичный цвет из дизайн-системы -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-secondary-container hover:bg-secondary disabled:opacity-50 text-on-surface font-bold text-sm py-3 rounded-default border border-surface-container-highest transition-colors cursor-pointer mt-2"
        >
          {{ loading ? 'Выполняется вход...' : 'Войти в систему' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { apiFetch } from '@/services/api'
import { ref } from 'vue'
import { useRouter } from 'vue-router' // Импортируем хук роутера

const router = useRouter() // Инициализируем роутер внутри компонента

const phone = ref('+66088888881')
const password = ref('password123')
const error = ref(null)
const loading = ref(false)

const handleLogin = async () => {
  if (phone.value && password.value) {
    loading.value = true
    error.value = null
    try {
      const response = await apiFetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.value, password: password.value }),
      })
      if (!response.ok) {
        throw new Error('Неверный телефон или пароль')
      }
      const data = await response.json()
      // Сохраняем токены
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)

      router.push({ name: 'dashboard' })
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
}
</script>
