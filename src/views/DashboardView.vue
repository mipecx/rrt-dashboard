<template>
  <div class="flex h-screen w-screen bg-surface text-on-surface overflow-hidden antialiased">
    <!-- 1. ЛЕВЫЙ САЙДБАР: НАВИГАЦИЯ -->
    <div
      class="w-64 h-full bg-surface-container-low border-r border-surface-container-high flex flex-col z-20"
    >
      <!-- Логотип -->
      <div class="p-6 border-b border-surface-container-high">
        <h1 class="text-xl font-black text-emergency tracking-wider uppercase">RRT system</h1>
        <span class="text-xs text-data-gray font-medium">Pattaya Sector</span>
      </div>

      <!-- Меню -->
      <nav class="flex-1 p-4 space-y-1">
        <!-- Dashboard -->
        <button
          @click="currentTab = 'dashboard'"
          :class="
            currentTab === 'dashboard'
              ? 'bg-surface-container-highest text-on-surface font-semibold'
              : 'text-data-gray hover:bg-surface-container hover:text-on-surface'
          "
          class="flex items-center gap-3 px-4 py-3 w-full rounded-default text-sm transition-colors text-left"
        >
          <svg
            class="w-5 h-5 text-on-surface"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"
            />
          </svg>
          Dashboard
        </button>

        <!-- Incidents -->
        <button
          @click="currentTab = 'incidents'"
          :class="
            currentTab === 'incidents'
              ? 'bg-surface-container-highest text-on-surface font-semibold'
              : 'text-data-gray hover:bg-surface-container hover:text-on-surface'
          "
          class="flex items-center gap-3 px-4 py-3 w-full rounded-default text-sm transition-colors text-left"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Incidents
        </button>

        <!-- RRT Units -->
        <button
          @click="currentTab = 'rrt'"
          :class="
            currentTab === 'rrt'
              ? 'bg-surface-container-highest text-on-surface font-semibold'
              : 'text-data-gray hover:bg-surface-container hover:text-on-surface'
          "
          class="flex items-center gap-3 px-4 py-3 w-full rounded-default text-sm transition-colors text-left"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          RRT Units
        </button>
      </nav>

      <!-- Профиль диспетчера -->
      <div class="p-4 border-t border-surface-container-high bg-surface-container-lowest">
        <div class="flex items-center gap-3">
          <div
            class="h-10 w-10 rounded-default bg-surface-bright border border-surface-container-highest flex items-center justify-center text-data-gray"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-[10px] text-data-gray font-bold uppercase tracking-wider">
              Dispatcher
            </div>
            <div class="text-sm font-semibold text-on-surface truncate">{{ dispatcherName }}</div>
          </div>
          <button
            @click.prevent="handleLogout"
            class="text-data-gray hover:text-emergency p-1 transition-colors"
            title="Выйти"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 2. ЦЕНТРАЛЬНАЯ ЧАСТЬ: КАРТА + ХЕДЕР -->
    <div class="flex-1 h-full flex flex-col relative">
      <!-- Верхняя панель управления -->
      <header
        class="h-16 border-b border-surface-container-high bg-surface-container-low px-6 flex items-center justify-between z-20"
      >
        <div
          class="w-96 flex items-center bg-surface-container border border-surface-container-high rounded-default px-3 py-2"
        >
          <svg
            class="w-4 h-4 text-data-gray mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search incidents, units..."
            class="w-full bg-transparent text-sm text-on-surface placeholder-data-gray/50 focus:outline-none"
          />
        </div>
        <div class="flex items-center gap-5">
          <span class="text-xs text-success flex items-center gap-1.5 font-bold tracking-wide">
            <span class="h-2 w-2 rounded-full bg-success animate-pulse"></span>
            SYSTEMS ONLINE
          </span>
          <button class="text-data-gray hover:text-on-surface transition-colors relative">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <button class="text-data-gray hover:text-on-surface transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </header>

      <!-- Сама карта -->
      <div class="flex-1 w-full h-full relative z-10">
        <AppMap :incidents="incidents" :rrt-units="rrtUnits" />

        <!-- Статистика юнитов -->
        <div
          class="absolute top-4 left-4 bg-surface-container-low/95 border border-surface-container-high p-4 rounded-default shadow-2xl z-[1000] w-52"
        >
          <div class="text-[11px] font-bold text-data-gray uppercase tracking-wider mb-3">
            Unit Status
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between items-center">
              <span class="text-data-gray flex items-center gap-2"
                ><span class="h-2 w-2 rounded-full bg-success"></span> Available RRT</span
              >
              <span class="font-bold text-base text-on-surface">{{ stats.available }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-data-gray flex items-center gap-2"
                ><span class="h-2 w-2 rounded-full bg-emergency"></span> On Mission</span
              >
              <span class="font-bold text-base text-on-surface">{{ stats.mission }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-data-gray flex items-center gap-2"
                ><span class="h-2 w-2 rounded-full bg-alert"></span> Standby</span
              >
              <span class="font-bold text-base text-on-surface">{{ stats.standby }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. ПРАВЫЙ САЙДБАР: ДИНАМИЧЕСКИЙ КОНТЕНТ -->
    <div
      class="w-96 h-full bg-surface-container-low border-l border-surface-container-high flex flex-col z-20"
    >
      <!-- Шапка сайдбара меняется в зависимости от вкладки -->
      <div class="p-6 border-b border-surface-container-high flex justify-between items-center">
        <div>
          <h2 class="text-md font-bold tracking-tight text-on-surface mb-1">
            {{ currentTab === 'rrt' ? 'RRT Squads Operations' : 'Active SOS Calls' }}
          </h2>
          <span
            v-if="currentTab === 'rrt'"
            class="text-xs font-bold text-success flex items-center gap-1"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-success"></span>
            {{ rrtUnits.length }} Units Registered
          </span>
          <span v-else class="text-xs font-bold text-emergency flex items-center gap-1">
            <span class="h-1.5 w-1.5 rounded-full bg-emergency animate-pulse"></span>
            {{ incidents.length }} Events Active
          </span>
        </div>
        <button
          v-if="currentTab === 'rrt'"
          @click="showCreateRrtModal = true"
          class="px-3 py-1.5 rounded-default text-xs font-bold bg-success text-white hover:bg-success/90 transition-colors flex items-center gap-1 cursor-pointer shadow-md"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Squad
        </button>
      </div>

      <!-- Лента контента -->
      <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-container-lowest">
        <div v-if="loading" class="text-xs text-data-gray text-center py-4">Загрузка данных...</div>
        <div
          v-else-if="error"
          class="text-xs text-emergency bg-emergency/10 border border-emergency/20 p-3 rounded-default"
        >
          {{ error }}
        </div>

        <!-- РЕНДЕР RRT ЮНИТОВ -->
        <template v-else-if="currentTab === 'rrt'">
          <div v-if="filteredRrtUnits.length === 0" class="text-xs text-data-gray text-center py-4 italic">
            Нет зарегистрированных RRT групп
          </div>
          <div
            v-else
            v-for="unit in filteredRrtUnits"
            :key="unit.id"
            class="bg-surface-container rounded-default p-4 relative shadow-lg border border-surface-container-high transition-all"
          >
            <div class="flex justify-between items-start mb-2">
              <span
                :class="[
                  'px-2 py-0.5 rounded-sm font-bold text-[10px] uppercase tracking-wide',
                  getRrtStatusConfig(unit.status).badgeClass,
                ]"
              >
                {{ getRrtStatusConfig(unit.status).label }}
              </span>

              <!-- Иконка транспорта (SVG вместо эмодзи) -->
              <svg
                v-if="unit.type === 'motorcycle'"
                class="w-5 h-5 text-on-surface"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <!-- Упрощенная SVG иконка мотоцикла/байка -->
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 18a3 3 0 100-6 3 3 0 000 6zm14 0a3 3 0 100-6 3 3 0 000 6zm-9.7-3h5.4M9.3 12l2.2-4h2.6l1.2 4M6.5 9h2"
                />
              </svg>
              <svg
                v-else
                class="w-5 h-5 text-on-surface"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <!-- Твоя стандартная иконка авто/пикапа -->
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zm-2-4H7a2 2 0 00-2 2v2h14v-2a2 2 0 00-2-2zM5 13V9a2 2 0 012-2h8a2 2 0 012 2v4H5z"
                />
              </svg>
            </div>

            <!-- Имя экипажа (проверь, совпадает ли ключ в JSON с базой) -->
            <h3 class="text-sm font-bold text-on-surface">
              {{ unit.name || unit.title || 'Unknown Unit' }}
            </h3>

            <!-- Тип текстом -->
            <p class="text-xs text-data-gray mt-1 uppercase tracking-wider text-[10px] font-bold">
              {{ unit.type }}
            </p>

            <!-- Координаты: если на бэке они лежат в объекте coords (как в инцидентах) -->
            <div class="mt-3 text-xs text-data-gray flex items-center gap-1 font-medium">
              <!-- Родная SVG маркер-иконка из твоего пака вместо красной булавки 📍 -->
              <svg
                class="w-3.5 h-3.5 text-data-gray"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span v-if="unit.coords">
                Lat: {{ unit.coords.lat?.toFixed(4) }}, Lng: {{ unit.coords.lng?.toFixed(4) }}
              </span>
              <span v-else-if="unit.lat && unit.lng">
                Lat: {{ unit.lat?.toFixed(4) }}, Lng: {{ unit.lng?.toFixed(4) }}
              </span>
              <span v-else class="italic text-data-gray/50">No GPS data</span>
            </div>
          </div>
        </template>

        <!-- РЕНДЕР ИНЦИДЕНТОВ -->
        <template v-else>
          <div v-if="filteredIncidents.length === 0" class="text-xs text-data-gray text-center py-4 italic">
            Нет активных вызовов SOS
          </div>
          <div
            v-else
            v-for="incident in filteredIncidents"
            :key="incident.id"
            :class="[
              'bg-surface-container rounded-default p-4 relative shadow-lg border transition-all',
              incident.status === 'created' ? 'border-emergency' : 'border-surface-container-high',
            ]"
          >
            <div class="flex justify-between items-start mb-2">
              <span
                :class="[
                  'px-2 py-0.5 rounded-sm font-bold text-[10px] uppercase tracking-wide',
                  incident.status === 'created'
                    ? 'bg-emergency text-white'
                    : incident.status === 'in_progress'
                    ? 'bg-alert text-surface'
                    : 'bg-success text-white',
                ]"
              >
                {{ incident.status === 'created' ? 'NEW SOS' : incident.status }}
              </span>
              <span class="text-[11px] text-data-gray">{{ formatTime(incident.created_at) }}</span>
            </div>
            <h3 class="text-sm font-bold text-on-surface">{{ incident.tourist_name }}</h3>
            <p class="text-xs text-data-gray mt-1">{{ incident.incident_type }}</p>
            <div v-if="incident.description" class="text-xs text-data-gray/80 mt-1 italic">
              "{{ incident.description }}"
            </div>
            <div class="mt-3 text-xs text-data-gray flex items-center gap-1 font-medium">
              <svg
                class="w-3.5 h-3.5 text-emergency"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Lat: {{ incident.coords?.lat?.toFixed(4) }}, Lng:
              {{ incident.coords?.lng?.toFixed(4) }}
            </div>
            <div
              v-if="incident.battery"
              class="mt-3 inline-block bg-surface-container-high px-3 py-1 rounded-sm border border-surface-container-highest"
            >
              <span class="text-[9px] uppercase text-data-gray block font-bold tracking-wider"
                >Battery</span
              >
              <span
                :class="[
                  'text-xs font-bold flex items-center gap-1',
                  incident.battery < 20 ? 'text-emergency' : 'text-success',
                ]"
              >
                {{ incident.battery }}%
              </span>
            </div>

            <!-- Управление инцидентом (Назначен / Кнопки Arrive & Resolve) -->
            <div class="mt-3 pt-3 border-t border-surface-container-high space-y-2">
              <div
                v-if="incident.rrt_id || incident.assigned_rrt_id"
                class="space-y-2"
              >
                <div class="text-xs text-success flex items-center gap-1.5 font-bold">
                  <span class="h-1.5 w-1.5 rounded-full bg-success"></span>
                  Экипаж: {{ crewNameById(incident.rrt_id || incident.assigned_rrt_id) }}
                </div>
                <div class="flex items-center gap-2 pt-1">
                  <button
                    @click="markArrived(incident.id)"
                    :disabled="actionLoading[incident.id]"
                    class="flex-1 px-2.5 py-1.5 rounded-sm text-[11px] font-bold uppercase tracking-wide bg-alert text-surface hover:bg-alert/90 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {{ actionLoading[incident.id] === 'arrive' ? '...' : 'Arrived' }}
                  </button>
                  <button
                    @click="resolveIncident(incident.id)"
                    :disabled="actionLoading[incident.id]"
                    class="flex-1 px-2.5 py-1.5 rounded-sm text-[11px] font-bold uppercase tracking-wide bg-success text-white hover:bg-success/90 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {{ actionLoading[incident.id] === 'resolve' ? '...' : 'Resolve' }}
                  </button>
                </div>
              </div>
              <div v-else class="flex items-center gap-2">
                <select
                  v-model="selectedCrewByIncident[incident.id]"
                  class="flex-1 bg-surface-container-high border border-surface-container-highest rounded-sm px-2 py-1.5 text-xs text-on-surface focus:outline-none disabled:opacity-50"
                  :disabled="assigningIncidentId === incident.id"
                >
                  <option :value="undefined" disabled>Выбрать экипаж...</option>
                  <option v-for="crew in availableCrews" :key="crew.id" :value="crew.id">
                    {{ crew.name || crew.title || 'Unit' }}
                  </option>
                </select>
                <button
                  @click="assignCrew(incident.id)"
                  :disabled="
                    !selectedCrewByIncident[incident.id] || assigningIncidentId === incident.id
                  "
                  class="px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wide bg-emergency text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emergency/90 transition-colors cursor-pointer"
                >
                  {{ assigningIncidentId === incident.id ? '...' : 'Assign' }}
                </button>
              </div>
              <div v-if="assignError[incident.id]" class="text-[11px] text-emergency mt-1">
                {{ assignError[incident.id] }}
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Фиксированный подвал -->
      <div
        class="p-4 border-t border-surface-container-high bg-surface-container-low grid grid-cols-2 gap-4 text-center"
      >
        <div class="p-2 bg-surface-container rounded-default border border-surface-container-high">
          <span class="text-[10px] font-bold text-data-gray uppercase tracking-wider block"
            >Avg Response</span
          >
          <span class="text-sm font-bold text-on-surface mt-0.5 block">0m 0s</span>
        </div>
        <div class="p-2 bg-surface-container rounded-default border border-surface-container-high">
          <span class="text-[10px] font-bold text-data-gray uppercase tracking-wider block"
            >Active RRT</span
          >
          <!-- Выводим реальное соотношение занятых групп к общему числу -->
          <span class="text-sm font-bold text-on-surface mt-0.5 block">
            {{ stats.mission }}/{{ rrtUnits.length }}
          </span>
        </div>
      </div>
    </div>

    <!-- МОДАЛЬНОЕ ОКНО СОЗДАНИЯ ЭКИПАЖА RRT -->
    <div
      v-if="showCreateRrtModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 antialiased"
    >
      <div
        class="bg-surface-container-low border border-surface-container-high w-full max-w-md rounded-default p-6 shadow-2xl space-y-5"
      >
        <div class="flex justify-between items-center border-b border-surface-container-high pb-3">
          <h3 class="text-md font-bold text-on-surface">Создать новый экипаж RRT</h3>
          <button
            @click="showCreateRrtModal = false"
            class="text-data-gray hover:text-on-surface transition-colors cursor-pointer text-lg font-bold"
          >
            ✕
          </button>
        </div>

        <form @submit.prevent="handleCreateRrt" class="space-y-4">
          <div
            v-if="createRrtError"
            class="text-xs text-emergency bg-emergency/10 p-2.5 rounded-sm border border-emergency/20"
          >
            {{ createRrtError }}
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-data-gray mb-1.5">
              Название экипажа / Имя
            </label>
            <input
              v-model="newRrtForm.fullname"
              type="text"
              placeholder="RRT Crew Delta (Bike-03)"
              required
              class="w-full bg-surface-container border border-surface-container-high rounded-default px-3 py-2.5 text-xs text-on-surface focus:outline-none focus:border-success"
            />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-data-gray mb-1.5">
              Телефон экипажа
            </label>
            <input
              v-model="newRrtForm.phone"
              type="text"
              placeholder="+66077777774"
              required
              class="w-full bg-surface-container border border-surface-container-high rounded-default px-3 py-2.5 text-xs text-on-surface focus:outline-none focus:border-success"
            />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-data-gray mb-1.5">
              Пароль для входа в приложение
            </label>
            <input
              v-model="newRrtForm.password"
              type="password"
              placeholder="••••••••"
              required
              class="w-full bg-surface-container border border-surface-container-high rounded-default px-3 py-2.5 text-xs text-on-surface focus:outline-none focus:border-success"
            />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-data-gray mb-1.5">
              Сектор дежурства
            </label>
            <select
              v-model="newRrtForm.sector_id"
              required
              class="w-full bg-surface-container border border-surface-container-high rounded-default px-3 py-2.5 text-xs text-on-surface focus:outline-none focus:border-success"
            >
              <option value="33333333-3333-3333-3333-111111111111">Pattaya Central & Walking St</option>
              <option value="33333333-3333-3333-3333-222222222222">Jomtien Beach</option>
              <option value="33333333-3333-3333-3333-333333333333">Naklua & Wongamat</option>
            </select>
          </div>

          <div class="flex justify-end gap-3 pt-3 border-t border-surface-container-high">
            <button
              type="button"
              @click="showCreateRrtModal = false"
              class="px-4 py-2 rounded-default text-xs font-bold text-data-gray hover:text-on-surface transition-colors cursor-pointer"
            >
              Отмена
            </button>
            <button
              type="submit"
              :disabled="creatingRrt"
              class="px-4 py-2 rounded-default text-xs font-bold bg-success text-white hover:bg-success/90 transition-colors cursor-pointer disabled:opacity-50"
            >
              {{ creatingRrt ? 'Создание...' : 'Создать экипаж' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppMap from '../components/AppMap.vue'

const router = useRouter()

// Управление вкладками: 'dashboard', 'incidents', 'rrt'
const currentTab = ref('dashboard')

// Данные и Поиск
const incidents = ref([])
const rrtUnits = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const actionLoading = ref({})

// Состояние модального окна создания экипажа
const showCreateRrtModal = ref(false)
const creatingRrt = ref(false)
const createRrtError = ref(null)
const newRrtForm = ref({
  fullname: '',
  phone: '',
  password: 'password123',
  sector_id: '33333333-3333-3333-3333-111111111111',
})

const handleCreateRrt = async () => {
  creatingRrt.value = true
  createRrtError.value = null
  try {
    const token = localStorage.getItem('access_token')
    const response = await fetch('http://localhost:8080/api/v1/rrt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newRrtForm.value),
    })

    if (!response.ok) {
      const errBody = await response.json().catch(() => null)
      throw new Error(errBody?.error || 'Не удалось создать экипаж')
    }

    showCreateRrtModal.value = false
    newRrtForm.value = {
      fullname: '',
      phone: '',
      password: 'password123',
      sector_id: '33333333-3333-3333-3333-111111111111',
    }
    await loadAllData()
  } catch (err) {
    createRrtError.value = err.message
  } finally {
    creatingRrt.value = false
  }
}

// Поисковые фильтры
const filteredIncidents = computed(() => {
  if (!searchQuery.value.trim()) return incidents.value
  const q = searchQuery.value.toLowerCase()
  return incidents.value.filter(
    (i) =>
      (i.tourist_name && i.tourist_name.toLowerCase().includes(q)) ||
      (i.incident_type && i.incident_type.toLowerCase().includes(q)) ||
      (i.description && i.description.toLowerCase().includes(q)) ||
      (i.status && i.status.toLowerCase().includes(q)) ||
      (i.number && String(i.number).includes(q)),
  )
})

const filteredRrtUnits = computed(() => {
  if (!searchQuery.value.trim()) return rrtUnits.value
  const q = searchQuery.value.toLowerCase()
  return rrtUnits.value.filter(
    (u) =>
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.status && u.status.toLowerCase().includes(q)) ||
      (u.type && u.type.toLowerCase().includes(q)),
  )
})

const formatTime = (timeStr) => {
  if (!timeStr) return ''
  const date = new Date(timeStr)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

// Декодирование информации о диспетчере из JWT токена
const getDispatcherInfo = () => {
  const token = localStorage.getItem('access_token')
  if (!token) return { fullname: 'Dispatcher' }
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    const claims = JSON.parse(jsonPayload)
    // UUID дефолтных диспетчеров из seed.sql
    const name = claims.uuid === '44444444-1111-1111-1111-111111111111' ? 'Somchai Jaidee' : 
                 claims.uuid === '44444444-1111-1111-1111-222222222222' ? 'Kanya Raksa' : 'Dispatcher'
    return { fullname: name, uuid: claims.uuid }
  } catch {
    return { fullname: 'Dispatcher' }
  }
}

const dispatcherName = computed(() => getDispatcherInfo().fullname)

// Загрузка инцидентов
const fetchIncidents = async () => {
  try {
    const token = localStorage.getItem('access_token')
    const response = await fetch('http://localhost:8080/api/v1/incidents', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (!response.ok) throw new Error('Ошибка при получении инцидентов')
    const data = await response.json()
    incidents.value = (Array.isArray(data) ? data : []).filter(
      (i) => i.status !== 'resolved' && i.status !== 'incident_resolved',
    )
    error.value = null
  } catch (err) {
    error.value = 'Ошибка связи с бэкендом.'
    console.error(err)
  }
}

// Загрузка RRT юнитов
const fetchRrtUnits = async () => {
  try {
    const token = localStorage.getItem('access_token')
    const response = await fetch('http://localhost:8080/api/v1/rrt', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (!response.ok) throw new Error('Ошибка при получении RRT')
    const data = await response.json()
    rrtUnits.value = Array.isArray(data) ? data : []
  } catch (err) {
    console.error('Ошибка загрузки RRT юнитов:', err)
  }
}

const loadAllData = async () => {
  await Promise.all([fetchIncidents(), fetchRrtUnits()])
}

// Единый словарь статусов RRT — источник правды и для фильтров, и для бейджей в шаблоне.
// Реальные значения приходят с бэка в нижнем регистре: offline, idle, en_route, arrived, busy.
const RRT_STATUS_CONFIG = {
  ready: { label: 'READY', badgeClass: 'bg-success/10 text-success border border-success/20' },
  en_route: {
    label: 'EN ROUTE',
    badgeClass: 'bg-emergency/10 text-emergency border border-emergency/20',
  },
  arrived: {
    label: 'ARRIVED',
    badgeClass: 'bg-alert/10 text-alert border border-alert/20',
  },
  busy: {
    label: 'BUSY',
    badgeClass: 'bg-alert/10 text-alert border border-alert/20',
  },
  offline: {
    label: 'OFFLINE',
    badgeClass:
      'bg-surface-container-highest text-data-gray border border-surface-container-highest',
  },
}

const getRrtStatusConfig = (status) =>
  RRT_STATUS_CONFIG[status] ?? {
    label: status ?? 'UNKNOWN',
    badgeClass:
      'bg-surface-container-highest text-data-gray border border-surface-container-highest',
  }

// Экипажи, которых можно назначить на инцидент (свободны прямо сейчас)
const availableCrews = computed(() => rrtUnits.value.filter((u) => u.status === 'ready'))

// Статистика — фильтруем по реальным (lowercase) значениям статусов
const stats = computed(() => {
  const available = rrtUnits.value.filter((u) => u.status === 'ready').length
  const mission = rrtUnits.value.filter((u) => u.status === 'en_route').length
  const standby = rrtUnits.value.filter((u) => u.status === 'offline').length

  return { available, mission, standby }
})

const handleLogout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  router.push({ name: 'login' })
}

// --- Назначение экипажа на инцидент ---

// Выбранный (но ещё не подтверждённый) экипаж для каждого инцидента: { [incidentId]: crewId }
const selectedCrewByIncident = ref({})
// id инцидента, для которого прямо сейчас идёт запрос назначения (для disabled/спиннера)
const assigningIncidentId = ref(null)
// Текст ошибки на конкретный инцидент: { [incidentId]: string }
const assignError = ref({})

const crewNameById = (crewId) => {
  const crew = rrtUnits.value.find((u) => u.id === crewId)
  return crew ? crew.name || crew.title || 'Unit' : 'Unknown'
}

const assignCrew = async (incidentId) => {
  const crewId = selectedCrewByIncident.value[incidentId]
  if (!crewId) return

  assigningIncidentId.value = incidentId
  assignError.value = { ...assignError.value, [incidentId]: null }

  try {
    const token = localStorage.getItem('access_token')
    const response = await fetch(`http://localhost:8080/api/v1/incidents/${incidentId}/assign`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ rrt_id: crewId }),
    })

    if (!response.ok) {
      const body = await response.json().catch(() => null)
      throw new Error(body?.error || 'Не удалось назначить экипаж')
    }

    // Оптимистично обновляем локальное состояние, не дожидаясь следующего фетча:
    const incidentIndex = incidents.value.findIndex((i) => i.id === incidentId)
    if (incidentIndex !== -1) {
      incidents.value[incidentIndex].assigned_rrt_id = crewId
    }
    const crewIndex = rrtUnits.value.findIndex((u) => u.id === crewId)
    if (crewIndex !== -1) {
      rrtUnits.value[crewIndex].status = 'en_route'
    }

    delete selectedCrewByIncident.value[incidentId]
  } catch (err) {
    assignError.value = { ...assignError.value, [incidentId]: err.message }
    console.error('Ошибка назначения экипажа:', err)
  } finally {
    assigningIncidentId.value = null
  }
}

const markArrived = async (incidentId) => {
  actionLoading.value[incidentId] = 'arrive'
  try {
    const token = localStorage.getItem('access_token')
    const response = await fetch(`http://localhost:8080/api/v1/incidents/${incidentId}/arrive`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error('Ошибка обновления статуса')
    await loadAllData()
  } catch (err) {
    console.error('Arrive error:', err)
  } finally {
    actionLoading.value[incidentId] = null
  }
}

const resolveIncident = async (incidentId) => {
  actionLoading.value[incidentId] = 'resolve'
  try {
    const token = localStorage.getItem('access_token')
    const response = await fetch(`http://localhost:8080/api/v1/incidents/${incidentId}/resolve`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error('Ошибка закрытия инцидента')
    await loadAllData()
  } catch (err) {
    console.error('Resolve error:', err)
  } finally {
    actionLoading.value[incidentId] = null
  }
}

let socket = null

const connectWebSocket = () => {
  socket = new WebSocket('ws://localhost:8080/api/v1/ws')

  socket.onopen = () => {
    console.log('⚡ WebSocket подключен к Go бэкенду!')
  }

  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data)

      if (message.type === 'RRT_UPDATE') {
        const updatedUnit = message.data
        const index = rrtUnits.value.findIndex((u) => u.id === updatedUnit.id)

        if (index !== -1) {
          // Мягко обновляем поля без полной замены объекта (чтобы Vue и Leaflet не пересоздавали слои)
          rrtUnits.value[index].lat = updatedUnit.lat
          rrtUnits.value[index].lng = updatedUnit.lng
          rrtUnits.value[index].status = updatedUnit.status
          rrtUnits.value[index].coords = { lat: updatedUnit.lat, lng: updatedUnit.lng }
        } else {
          rrtUnits.value.push({
            ...updatedUnit,
            coords: { lat: updatedUnit.lat, lng: updatedUnit.lng },
          })
        }
      } else if (message.type === 'INCIDENT_UPDATE') {
        if (message.data && message.data.id && message.data.lat && message.data.lng) {
          const idx = incidents.value.findIndex((i) => i.id === message.data.id)
          if (idx !== -1) {
            if (message.data.status === 'resolved' || message.data.status === 'incident_resolved') {
              incidents.value.splice(idx, 1)
            } else {
              incidents.value[idx].coords = { lat: message.data.lat, lng: message.data.lng }
              if (message.data.battery) incidents.value[idx].battery = message.data.battery
            }
          } else {
            loadAllData()
          }
        } else {
          loadAllData()
        }
      }
    } catch (e) {
      console.error('Ошибка разбора WS сообщения:', e)
    }
  }
}

onMounted(async () => {
  const token = localStorage.getItem('access_token')
  if (!token) {
    router.push({ name: 'login' })
    return
  }

  loading.value = true
  await loadAllData()
  loading.value = false

  // Подключаем WebSocket для живых координат
  connectWebSocket()
})

onUnmounted(() => {
  if (socket) socket.close()
})
</script>
