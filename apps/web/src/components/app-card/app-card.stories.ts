import AppCard from './app-card.vue'
import AppCardMenu from './app-card-menu.vue'

export default {
  title: 'AppCard/Card',
  component: AppCard,
}

export const Default = () => ({
  components: { AppCard },
  template: `<div width="500px" class="bg-blue-50 p-2"><app-card title="Card title"  subtitle="Card subtitle"/></div>`,
})

export const WithContent = () => ({
  components: { AppCard },
  template: `
    <div width="500px" class="bg-blue-50 p-2">
      <app-card title="Card title">
        <p>Lollipop jujubes chupa chups halvah candy canes. Jelly-o chocolate cake danish biscuit gummies sesame snaps. Muffin cookie carrot cake chupa chups dragée caramels halvah. Pie chupa chups apple pie jujubes lollipop bear claw gummies pudding. Chocolate sugar plum jelly sugar plum lemon drops jelly beans topping. Pudding pie bear claw ice cream chocolate jujubes gummies sweet topping. </p>
      </app-card>
    </div>`,
})

export const WithMenu = () => ({
  components: { AppCard, AppCardMenu },
  template: `
    <div width="500px" class="bg-blue-50 p-2">
      <app-card title="Card title">
        <template #menu>
          <app-card-menu :options="[              
            { id: 1, name: 'download' },
            { id: 2, name: 'image' },
            { id: 3, name: 'share' }
          ]" />
        </template>
        <p>Lollipop jujubes chupa chups halvah candy canes. Jelly-o chocolate cake danish biscuit gummies sesame snaps. Muffin cookie carrot cake chupa chups dragée caramels halvah. Pie chupa chups apple pie jujubes lollipop bear claw gummies pudding. Chocolate sugar plum jelly sugar plum lemon drops jelly beans topping. Pudding pie bear claw ice cream chocolate jujubes gummies sweet topping. </p>
      </app-card>
    </div>`,
})

export const WithCustomHeader = () => ({
  components: { AppCard },
  template: `
    <div width="500px" class="bg-blue-50 p-2">
      <app-card>
        <template #header>
          <h3 class="mb-5 text-center">Love lollipops</h3> 
        </template>
        <p>
          Lollipop jujubes chupa chups halvah candy canes. 
          Jelly-o chocolate cake danish biscuit gummies sesame snaps. 
          Muffin cookie carrot cake chupa chups dragée caramels halvah.
          Pie chupa chups apple pie jujubes lollipop bear claw gummies pudding. 
          Chocolate sugar plum jelly sugar plum lemon drops jelly beans topping. 
          Pudding pie bear claw ice cream chocolate jujubes gummies sweet topping. 
        </p>
      </app-card>
    </div>`,
})
