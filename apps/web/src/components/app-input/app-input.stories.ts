import AppInput from './app-input.vue'
import type { Story } from '@storybook/vue3'

export default {
  title: 'AppInput',
  component: AppInput,
}

const Template: Story<typeof AppInput> = (args) => ({
  components: { AppInput },
  setup() {
    return { args }
  },
  template: `<app-input v-bind="args"  />
  `,
})

export const Text = Template.bind({})
export const Placeholder = Template.bind({})
Placeholder.args = {
  placeholder: 'not the real deal',
}
