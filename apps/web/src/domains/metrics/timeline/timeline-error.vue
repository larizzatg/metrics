<script lang="ts" setup></script>

<template>
  <div class="flex flex-col items-center justify-center text-red-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-20 h-20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <slot></slot>
  </div>
</template>
