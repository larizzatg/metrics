<script setup lang="ts">
import AppButton from '@/components/app-button/app-button.vue'
import AppCard from '@/components/app-card/app-card.vue'
</script>

<template>
  <main>
    <div class="flex justify-end flex-1 my-4">
      <app-button type="secondary"> Create new Metric </app-button>
    </div>
    <app-card title="Daily Metrics">
      <template #before> </template>
    </app-card>
  </main>
</template>
