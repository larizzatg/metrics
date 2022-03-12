import AppCard from './app-card.vue'

export default {
  title: 'AppCard',
  component: AppCard,
}

export const Default = () => ({
  components: { AppCard },
  template: `<div width="500px" class="bg-blue-50 p-2"><app-card title="Card title" /></div>`,
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

export const WithCustomHeader = () => ({
  components: { AppCard },
  template: `
    <div width="500px" class="bg-blue-50 p-2">
      <app-card>
        <template #header>
          <h3 class="mb-5 text-center">Love lollipops</h3> 
        </template>
        <p>Lollipop jujubes chupa chups halvah candy canes. Jelly-o chocolate cake danish biscuit gummies sesame snaps. Muffin cookie carrot cake chupa chups dragée caramels halvah. Pie chupa chups apple pie jujubes lollipop bear claw gummies pudding. Chocolate sugar plum jelly sugar plum lemon drops jelly beans topping. Pudding pie bear claw ice cream chocolate jujubes gummies sweet topping. </p>
      </app-card>
    </div>`,
})