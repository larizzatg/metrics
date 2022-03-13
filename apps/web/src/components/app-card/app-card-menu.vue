<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

type MenuOption = {
  id?: string
  name: string
}

interface MenuProps {
  options: MenuOption[]
}

withDefaults(defineProps<MenuProps>(), { options: () => [] })
const emit = defineEmits(['change'])

const onOptionSelected = (option: MenuOption) => {
  emit('change', option)
}
</script>

<template>
  <Menu as="div" class="relative inline-block">
    <MenuButton class="w-4 h-4">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.5 8C3.5 8.82843 2.82843 9.5 2 9.5C1.17157 9.5 0.5 8.82843 0.5 8C0.5 7.17157 1.17157 6.5 2 6.5C2.82843 6.5 3.5 7.17157 3.5 8ZM9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8ZM14 9.5C14.8284 9.5 15.5 8.82843 15.5 8C15.5 7.17157 14.8284 6.5 14 6.5C13.1716 6.5 12.5 7.17157 12.5 8C12.5 8.82843 13.1716 9.5 14 9.5Z"
          fill="#BFC5D2"
        />
      </svg>
    </MenuButton>
    <MenuItems
      class="absolute left-0 origin-top-right bg-white rounded-md shadow-md min-w-max ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <MenuItem
        v-for="option in options"
        :key="option.id ? option.id : option.name"
        v-slot="{ active }"
        @click="onOptionSelected(option)"
      >
        <button
          :class="[
            active ? 'bg-indigo-500 text-white' : 'text-gray-900',
            'group flex items-center w-full px-4 py-2 text-sm rounded-md ',
          ]"
        >
          {{ option.name }}
        </button>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>
