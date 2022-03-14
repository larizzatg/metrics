import type { Story } from '@storybook/vue3'
import { ref } from 'vue'
import AppModal from './app-modal.vue'

export default {
  title: 'AppModal',
  component: AppModal,
}

const Template: Story<typeof AppModal> = (args) => ({
  components: { AppModal },
  setup() {
    const open = ref(false)
    return { args, open }
  },
  template: `
    <p @click="open=true">Click to open modal</p>
    <app-modal v-bind="args" v-model:open="open">    
        <p>
            Lollipop jujubes chupa chups halvah candy canes. 
            Jelly-o chocolate cake danish biscuit gummies sesame snaps. 
            Muffin cookie carrot cake chupa chups dragée caramels halvah.
            Pie chupa chups apple pie jujubes lollipop bear claw gummies pudding. 
            Chocolate sugar plum jelly sugar plum lemon drops jelly beans topping. 
            Pudding pie bear claw ice cream chocolate jujubes gummies sweet topping. 
        </p>
    </app-modal>
  `,
})

export const Default = Template.bind({})
Default.args = {
  title: 'Analytics',
  description: 'show latests information',
}
