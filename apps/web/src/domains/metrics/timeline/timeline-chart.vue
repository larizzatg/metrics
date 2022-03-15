<script lang="ts" setup>
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { MetricTimelineInterval, type MetricAverage } from '../types'
import { computed } from 'vue'

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
  <div>
    <LineChart v-bind="lineChartProps" />
  </div>
</template>
