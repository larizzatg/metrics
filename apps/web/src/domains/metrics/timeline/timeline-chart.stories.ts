import TimelineChart from './timeline-chart.vue'
import type { Story } from '@storybook/vue3'
import { dailyAverage } from '@/mocks/data'

export default {
  title: 'Metric/ChartTimeline',
  component: TimelineChart,
}
const Template: Story<typeof TimelineChart> = (args) => ({
  components: { TimelineChart },
  setup() {
    return { args }
  },
  template: `<timeline-chart v-bind="args"  />
  `,
})

export const Daily = Template.bind({})
Daily.args = {
  metrics: dailyAverage,
}
