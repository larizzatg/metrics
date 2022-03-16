<script lang="ts" setup>
import { ref, watch } from 'vue'
import {
  Dialog as TwDialog,
  DialogTitle as TwDialogTitle,
  DialogDescription as TwDialogDescription,
  DialogOverlay as TwDialogOverlay,
} from '@headlessui/vue'
import AppCard from '../app-card/app-card.vue'
import AppIconClose from '../app-icon/app-icon-close.vue'

interface ModalProps {
  title?: string
  description?: string
  open: boolean
  showClose?: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
  showClose: true,
  open: false,
})
defineEmits(['update:open'])

const isOpen = ref(props.open)
watch(
  () => props.open,
  (value) => {
    isOpen.value = value
  },
)
</script>

<template>
  <tw-dialog :open="isOpen" as="div">
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <tw-dialog-overlay class="fixed inset-0 bg-black opacity-40" />
        <app-card
          class="w-full max-w-md my-8 overflow-hidden transform bg-white rounded-lg shadow-md"
          :square-padding="true"
        >
          <template #header>
            <div class="flex flex-col flex-1">
              <tw-dialog-title class="flex-1 caption" v-if="title">
                {{ title }}
              </tw-dialog-title>
              <tw-dialog-description
                class="w-full text-sm font-light text-gray-400"
                v-if="description"
              >
                {{ description }}
              </tw-dialog-description>
            </div>
            <app-icon-close
              class="text-gray-500 cursor-pointer"
              @click="$emit('update:open', false)"
            />
          </template>

          <slot />
        </app-card>
      </div>
    </div>
  </tw-dialog>
</template>
