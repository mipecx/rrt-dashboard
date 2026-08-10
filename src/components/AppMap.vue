<template>
  <div id="map" class="h-full w-full bg-[#10141a]"></div>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  incidents: {
    type: Array,
    default: () => [],
  },
  rrtUnits: {
    type: Array,
    default: () => [],
  },
})

let map = null
const incidentMarkers = {}
const rrtMarkers = {}

// 1. Кастомный SVG-щит для SOS инцидентов (Красный / Желтый / Зеленый)
const createIncidentIcon = (status) => {
  let iconColor = '#E63946' // Красный по умолчанию (created / critical)
  if (status === 'in_progress') {
    iconColor = '#FFB703' // Желтый (в процессе)
  } else if (status === 'resolved') {
    iconColor = '#10B981' // Зеленый (решен)
  }

  return L.divIcon({
    html: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="${iconColor}" stroke="#10141a" stroke-width="1.5" style="filter: drop-shadow(0px 3px 6px ${iconColor}80);">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <circle cx="12" cy="11" r="2.5" fill="#fff"/>
      </svg>
    `,
    className: 'custom-map-marker',
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34],
  })
}

// Генератор иконки на основе точных статусов из БД
const createRrtIcon = (status) => {
  const s = String(status || '')
    .toLowerCase()
    .trim()

  let iconColor = '#10B981' // По умолчанию ready (зелёный)
  let shadowColor = 'rgba(16,185,129,0.4)'

  if (s === 'en_route') {
    iconColor = '#3B82F6' // Синий (на задании)
    shadowColor = 'rgba(59,130,246,0.6)'
  } else if (s === 'offline') {
    iconColor = '#6B7280' // Серый (неактивен)
    shadowColor = 'rgba(107,114,128,0.3)'
  }

  return L.divIcon({
    html: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="${iconColor}" stroke="#10141a" stroke-width="1.5" style="filter: drop-shadow(0px 3px 6px ${shadowColor}); transition: fill 0.3s ease;">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M13 7l-3 4.5h3L11 16l4-5h-3l2-4z" fill="#ffffff" stroke="none"/>
      </svg>
    `,
    className: 'custom-map-marker',
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34],
  })
}

// Обновление слоя RRT на карте
const updateRrtUnits = (units) => {
  if (!map) return

  const currentIds = new Set(units.map((u) => u.id))

  // Удаляем маркеры с карты, если юнит удален из списка
  Object.keys(rrtMarkers).forEach((id) => {
    if (!currentIds.has(id)) {
      map.removeLayer(rrtMarkers[id])
      delete rrtMarkers[id]
    }
  })

  units.forEach((unit) => {
    const lat = unit.coords?.lat || unit.lat
    const lng = unit.coords?.lng || unit.lng

    if (lat && lng) {
      if (rrtMarkers[unit.id]) {
        // Перемещаем маркер и ПРИНУДИТЕЛЬНО меняем иконку под новый статус
        rrtMarkers[unit.id].setLatLng([lat, lng])
        rrtMarkers[unit.id].setIcon(createRrtIcon(unit.status))

        // Обновляем текст попапа
        rrtMarkers[unit.id].getPopup().setContent(`
          <div style="color: #dfe2eb; background: #1c2026; padding: 6px; font-family: Inter, sans-serif; border-radius: 4px;">
            <b style="color: #60a5fa;">${unit.name || 'RRT Unit'}</b><br>
            <span style="font-size: 11px; color: #8d99ae;">Статус: ${unit.status}</span>
          </div>
        `)
      } else {
        const marker = L.marker([lat, lng], { icon: createRrtIcon(unit.status) }).addTo(map)
          .bindPopup(`
            <div style="color: #dfe2eb; background: #1c2026; padding: 6px; font-family: Inter, sans-serif; border-radius: 4px;">
              <b style="color: #60a5fa;">${unit.name || 'RRT Unit'}</b><br>
              <span style="font-size: 11px; color: #8d99ae;">Статус: ${unit.status}</span>
            </div>
          `)
        rrtMarkers[unit.id] = marker
      }
    }
  })
}

onMounted(() => {
  map = L.map('map', {
    zoomControl: false,
    attributionControl: false,
  }).setView([12.9236, 100.8824], 13)

  L.control.zoom({ position: 'bottomright' }).addTo(map)

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 20,
  }).addTo(map)

  updateIncidents(props.incidents)
  updateRrtUnits(props.rrtUnits)
})

// Обновление инцидентов без пересоздания слоев
const updateIncidents = (incidents) => {
  if (!map) return

  const currentIds = new Set(incidents.map((i) => i.id))

  // 1. Удаляем с карты маркеры тех инцидентов, которых больше нет в списке активных
  Object.keys(incidentMarkers).forEach((id) => {
    if (!currentIds.has(id)) {
      map.removeLayer(incidentMarkers[id])
      delete incidentMarkers[id]
    }
  })

  // 2. Добавляем / обновляем маркеры и ИКОНКИ под актуальный статус
  incidents
    .filter((i) => i.status !== 'resolved' && i.status !== 'incident_resolved')
    .forEach((incident) => {
    const lat = incident.coords?.lat || incident.lat
    const lng = incident.coords?.lng || incident.lng

    if (lat && lng) {
      if (incidentMarkers[incident.id]) {
        incidentMarkers[incident.id].setLatLng([lat, lng])
        incidentMarkers[incident.id].setIcon(createIncidentIcon(incident.status))
        incidentMarkers[incident.id].getPopup().setContent(`
          <div style="color: #dfe2eb; background: #1c2026; padding: 6px; font-family: Inter, sans-serif; border-radius: 4px;">
            <b style="color: #ffb3b1;">${incident.tourist_name || 'Информации нет'}</b><br>
            <span style="font-size: 11px; color: #8d99ae;">Тип: ${incident.incident_type || 'SOS'}</span><br>
            <span style="font-size: 11px; color: #60a5fa;">Статус: ${incident.status}</span>
          </div>
        `)
      } else {
        const marker = L.marker([lat, lng], { icon: createIncidentIcon(incident.status) })
          .addTo(map)
          .bindPopup(`
            <div style="color: #dfe2eb; background: #1c2026; padding: 6px; font-family: Inter, sans-serif; border-radius: 4px;">
              <b style="color: #ffb3b1;">${incident.tourist_name || 'Информации нет'}</b><br>
              <span style="font-size: 11px; color: #8d99ae;">Тип: ${incident.incident_type || 'SOS'}</span><br>
              <span style="font-size: 11px; color: #60a5fa;">Статус: ${incident.status}</span>
            </div>
          `)
        incidentMarkers[incident.id] = marker
      }
    }
  })
}

watch(
  () => props.incidents,
  (val) => updateIncidents(val),
  { deep: true },
)
watch(
  () => props.rrtUnits,
  (val) => updateRrtUnits(val),
  { deep: true },
)

onUnmounted(() => {
  if (map) map.remove()
})
</script>

<style>
.custom-map-marker {
  background: transparent !important;
  border: none !important;
}
</style>
