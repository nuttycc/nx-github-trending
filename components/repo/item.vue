<script setup lang="ts">
const props = defineProps<{
  repo: Omit<Repository, 'readme'>;
}>();

function formatLargeNum(num: number) {
  const k = 1000;
  const sizes = ['', 'K', 'M', 'B'];
  const i = Math.floor(Math.log(num) / Math.log(k));

  if (i < 1) {
    return num.toString();
  }

  return (num / Math.pow(k, i)).toFixed(0) + sizes[i];
}
</script>
<template>
  <RepoSlot>
    <template #repo-name>{{ props.repo.name }}</template>

    <template #owner-avatar>
      <!-- <NuxtImg
        :src="repo.owner.avatar_url"
        width="17"
        height="17"
        :placeholder="[17, 17]"
        loading="lazy"
        format="webp"
        class="rounded-full bg-gray-500"
      /> -->
    </template>

    <template #repo-star>
      {{ formatLargeNum(repo.stargazers_count) }}
    </template>

    <template #repo-lang>
      {{ repo.language ?? '-' }}
    </template>

    <template #repo-url>
      <NuxtLink
        :to="`https://github.com/${repo.full_name}`"
        target="_blank"
        class="block truncate underline md:w-80"
        >https://github.com/{{ repo.full_name }}</NuxtLink
      >
    </template>

    <template #repo-desc>
      <div class="line-clamp-3">{{ repo.description }}</div>
    </template>
  </RepoSlot>
</template>
