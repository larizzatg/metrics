import type { Story } from '@storybook/vue3'
import AppCardMenu from './app-card-menu.vue'

export default {
  title: 'AppCard/Menu',
  component: AppCardMenu,
}

const Template: Story<typeof AppCardMenu> = (args) => ({
  components: { AppCardMenu },
  setup() {
    return { args }
  },
  template: `<app-card-menu v-bind="args"/>`,
})

export const Default = Template.bind({})
Default.args = {
  options: [
    { id: 1, name: 'download' },
    { id: 2, name: 'image' },
    { id: 3, name: 'share' },
  ],
}
