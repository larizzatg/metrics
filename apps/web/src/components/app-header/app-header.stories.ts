import type { Story } from '@storybook/vue3'
import AppHeader from './app-header.vue'

export default {
  title: 'AppHeader',
  component: AppHeader,
}

const Template: Story<typeof AppHeader> = (args) => ({
  components: { AppHeader },
  setup() {
    return { args }
  },
  template: `<app-header v-bind="args"/>`,
})

export const Default = Template.bind({})
Default.args = {
  title: 'Analytics',
}
