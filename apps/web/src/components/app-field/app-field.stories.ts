import AppField from './app-field.vue'
import AppInput from '../app-input/app-input.vue'
import type { Story } from '@storybook/vue3'

export default {
  title: 'AppField',
  component: AppField,
}

const Template: Story<typeof AppField> = (args) => ({
  components: { AppField, AppInput },
  setup() {
    return { args }
  },
  template: `
  <app-field v-bind="args">
    <app-input />
  </app-field>
  `,
})

export const Default = Template.bind({})
Default.args = {
  label: 'full name',
}

export const WithErrors = Template.bind({})
WithErrors.args = {
  ...Default.args,
  errors: ['first error', 'second error'],
}
