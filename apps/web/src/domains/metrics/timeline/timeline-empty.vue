<script lang="ts" setup>
import AppButton from '@/components/app-button/app-button.vue'
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4 space-y-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-20 h-20"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
      />
    </svg>
    <p class="font-thin text-md">
      No data available, let's create some new metrics
    </p>
    <app-button type="secondary" size="small"> Create new metric </app-button>
  </div>
</template>
