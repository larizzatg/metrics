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

export const Sizes = () => ({
  components: { AppButton },
  template: `
    <div>
    <app-button size="small" class="my-2">small button</app-button>
    <app-button size="medium" class="my-2">medium button</app-button>
    <app-button size="large" class="my-2">large button</app-button>
    </div>
  `,
})

export const Types = () => ({
  components: { AppButton },
  template: `
    <div>
    <app-button type="primary" class="my-2">primary button</app-button>
    <app-button type="secondary" class="my-2">secondary button</app-button>
    </div>
  `,
})
