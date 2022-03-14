<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import AppIconDotsHorizontal from '../app-icon/app-icon-dots-horizontal.vue'

type MenuOption = {
  id?: string | number
  name: string
}

interface MenuProps {
  options: MenuOption[]
}

withDefaults(defineProps<MenuProps>(), {
  options: () => [],
})
const emit = defineEmits(['change'])

const onOptionSelected = (option: MenuOption) => {
  emit('change', option)
}
</script>

<template>
  <Menu as="div" class="relative flex">
    <MenuButton class="items-center justify-center w-6 h-6">
      <app-icon-dots-horizontal class="text-gray-500" />
    </MenuButton>
    <MenuItems
      class="absolute right-0 mt-6 origin-top-right bg-white shadow-md min-w-max ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <MenuItem
        v-for="option in options"
        :key="option.id ? option.id : option.name"
        v-slot="{ active }"
        @click="onOptionSelected(option)"
      >
        <button
          :class="[
            active ? 'bg-blue-500 text-white' : 'text-gray-900',
            'group flex items-center w-full px-4 py-2 text-sm',
          ]"
        >
          {{ option.name }}
        </button>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>
