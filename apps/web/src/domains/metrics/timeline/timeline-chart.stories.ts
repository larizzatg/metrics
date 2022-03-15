import TimelineChart from './timeline-chart.vue'
import type { Story } from '@storybook/vue3'
import { dailyAverage } from '@/mocks/data'
import { MetricTimelineInterval } from '../types'

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

export const Loading = Template.bind({})
Loading.args = {
  loading: true,
  metrics: [],
}

export const Empty = Template.bind({})
Empty.args = {
  loading: false,
  metrics: [],
}

export const Daily = Template.bind({})
Daily.args = {
  metrics: dailyAverage,
  interval: MetricTimelineInterval.DAY,
}
