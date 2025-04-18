<script setup lang="ts">
import VueMasonryWall from "@yeger/vue-masonry-wall";
import { ref, computed } from "vue";

const { data, status, error } = await useFetch("/api/trending-repos", {
  lazy: true,
}
);

const allRepos = computed(() => data.value?.repositories ?? []);
const selectedLang = ref("All");

const filteredRepos = computed(() => {
  if (selectedLang.value === "All") {
    return allRepos.value;
  }
  return allRepos.value.filter((repo) => repo.language === selectedLang.value);
});

const masonryOptions = {
  padding: 12,
  responsive: true,
  rtl: false,
  responsiveBreakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
  },
};

const columnCount = computed(() => {
  return { default: 1, sm: 2, md: 3, lg: 4 };
});

function handleFilter(lang: string) {
  selectedLang.value = lang;
}
</script>

<template>
  <div class="px-8 py-2">
    <RepoFilter @filter="handleFilter" />
    <div class="px-4 py-2 text-sm flex gap-2 text-gray-500 dark:text-gray-400">
      <span>{{ data?.date }}</span>
      <div>
        共 {{ filteredRepos.length }} 个仓库
        <span v-if="selectedLang !== 'All'">({{ selectedLang }})</span>
      </div>
    </div>
    <div
      v-if="status === 'pending'"
      class="flex justify-center items-center p-8"
    >
      <div class="flex flex-col items-center gap-2">
        <div
          class="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"
        />
        <div class="text-lg text-gray-600 dark:text-gray-300">
          正在加载仓库数据...
        </div>
      </div>
    </div>
    <div
      v-else-if="error"
      class="text-red-500 p-4"
    >
      {{ error.message }}
    </div>
    <VueMasonryWall
      v-else
      :items="filteredRepos"
      :column-count="columnCount"
      :column-width="350"
      :padding="masonryOptions.padding"
      :rtl="masonryOptions.rtl"
      :responsive="masonryOptions.responsive"
      :responsive-breakpoints="masonryOptions.responsiveBreakpoints"
      class="masonry-container px-2 py-4"
    >
      <template #default="{ item: repo }">
        <RepoItem :repo="repo" />
      </template>
    </VueMasonryWall>
  </div>
</template>

<style scoped>
.masonry-container {
  width: 100%;
  margin: 0 auto;
}
</style>
