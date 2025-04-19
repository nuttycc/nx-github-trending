<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  filter: [lang: string];
}>();

const langs = [
  'All',
  'TypeScript',
  'JavaScript',
  'Python',
  'Go',
  'Rust',
  'Java',
  'C++',
  'C#',
  'PHP',
  'Ruby',
];
const selectedLang = ref('All');

function handleLangSelect(lang: string) {
  selectedLang.value = lang;
  emit('filter', lang);
}
</script>
<template>
  <div class="px-2 py-4">
    <div class="flex flex-wrap gap-2">
      <button
        v-for="lang in langs"
        :key="lang"
        :class="[
          'cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200',
          selectedLang === lang
            ? 'bg-violet-700 text-gray-100'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
        ]"
        @click="handleLangSelect(lang)"
      >
        {{ lang }}
      </button>
    </div>
  </div>
</template>
