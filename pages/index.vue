<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

console.log('[Client env] ', runtimeConfig);
</script>

<template>
  <div>
    <div>
      <div>
        <RepoList />
      </div>
    </div>
  </div>
</template>
