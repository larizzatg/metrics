<script lang="ts" setup>
import { computed } from 'vue'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { MetricTimelineInterval, type MetricAverage } from '../types'
import AppCard from '@/components/app-card/app-card.vue'

const props =
  defineProps<{ metrics: MetricAverage[]; interval: MetricTimelineInterval }>()

Chart.register(...registerables)

const dateParseInterval: Record<
  MetricTimelineInterval,
  Intl.DateTimeFormatOptions
> = {
  [MetricTimelineInterval.DAY]: { day: '2-digit', month: 'long' },
  [MetricTimelineInterval.HOUR]: { hour: 'numeric' },
  [MetricTimelineInterval.MINUTE]: { minute: 'numeric' },
}

const parsedDataset = computed(() => {
  return props.metrics.map((metric) => {
    const dateOption = dateParseInterval[props.interval]
    const date = new Date(metric.datetime).toLocaleString('default', dateOption)
    return {
      ...metric,
      parsedDate: date,
    }
  })
})

const timelineTitle = computed(() => {
  const titles: Record<MetricTimelineInterval, string> = {
    [MetricTimelineInterval.DAY]: 'Daily',
    [MetricTimelineInterval.HOUR]: 'Hourly',
    [MetricTimelineInterval.MINUTE]: 'Minute',
  }
  return `${titles[props.interval]} metrics`
})

const lineChartProps = {
  chartData: {
    datasets: [{ data: parsedDataset.value, borderColor: '#818CF8' }],
  },
  options: {
    parsing: {
      xAxisKey: 'parsedDate',
      yAxisKey: 'value',
    },
    plugins: {
      legend: { display: false },
    },
  },
}
</script>

<template>
  <app-card :title="timelineTitle">
    <LineChart v-bind="lineChartProps" />
  </app-card>
</template>
