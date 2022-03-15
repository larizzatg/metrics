<script lang="ts" setup>
import { computed } from 'vue'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import type { MetricAverage } from '../types'

const props = defineProps<{ metrics: MetricAverage[] }>()

Chart.register(...registerables)
const datasets = computed(() => {
  const groupedMetrics: any = {}
  props.metrics.forEach((metric) => {
    if (!groupedMetrics[metric.name]) {
      groupedMetrics[metric.name] = {
        label: [metric.name],
        data: [],
      }
    }

    groupedMetrics[metric.name].data.push({
      value: Number(metric.value),
      datetime: metric.datetime,
    })
  })

  return Object.values(groupedMetrics)
})

const lineChartProps = {
  chartData: {
    datasets: datasets.value,
  },
  options: {
    parsing: {
      xAxisKey: 'datetime',
      yAxisKey: 'value',
    },
  },
}
</script>

<template>
  <div>
    <LineChart v-bind="lineChartProps" />
  </div>
</template>
