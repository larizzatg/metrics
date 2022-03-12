import AppButton from './app-button.vue'
import type { Story } from '@storybook/vue3'

export default {
  title: 'AppButton',
  component: AppButton,
}

const Template: Story<typeof AppButton> = (args) => ({
  components: { AppButton },
  setup() {
    return { args }
  },
  template: `
  <app-button v-bind="args">
    {{ args.text }}
  </app-button>
  `,
})

export const Default = Template.bind({})
Default.args = {
  text: 'My button',
}
