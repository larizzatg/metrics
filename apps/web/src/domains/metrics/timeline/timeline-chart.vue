<script lang="ts" setup>
import { computed } from 'vue'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import type { MetricAverage } from '../types'

const props = defineProps<{ metrics: MetricAverage[] }>()

Chart.register(...registerables)

const lineChartProps = {
  chartData: {
    datasets: [{ data: props.metrics }],
  },
  options: {
    parsing: {
      xAxisKey: 'datetime',
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
