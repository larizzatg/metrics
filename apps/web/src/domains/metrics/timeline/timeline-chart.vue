<script lang="ts" setup>
import { computed } from 'vue'
import 'chartjs-adapter-date-fns'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { MetricTimelineInterval, type MetricAverage } from '../types'
import AppCard from '@/components/app-card/app-card.vue'
import TimelineEmpty from './timeline-empty.vue'
import TimelineLoading from './timeline-loading.vue'
import TimelineError from './timeline-error.vue'
import { getHourRangeUTC, getMinuteRangeUTC, getNextInterval } from './timeline'

interface TimelineChartProps {
  metricsAverage: MetricAverage[]
  interval?: MetricTimelineInterval
  loading?: boolean
  error?: string
}

const emit = defineEmits(['change'])

const props = withDefaults(defineProps<TimelineChartProps>(), {
  loading: false,
  interval: MetricTimelineInterval.DAY,
  error: '',
})

Chart.register(...registerables)

const timelineTitle = computed(() => {
  const titles: Record<MetricTimelineInterval, string> = {
    [MetricTimelineInterval.DAY]: 'Daily',
    [MetricTimelineInterval.HOUR]: 'Hourly',
    [MetricTimelineInterval.MINUTE]: 'Minute',
  }
  return `${titles[props.interval]} metrics`
})

const onClickDataPoint = (dataset: unknown) => {
  const { datetime = '' } = dataset?.element?.$context?.raw ?? {}
  const nextInterval = getNextInterval(props.interval)
  let endDate = ''

  if (!datetime || !nextInterval) {
    return
  }

  if (datetime && nextInterval === MetricTimelineInterval.HOUR) {
    endDate = getHourRangeUTC(datetime)
  }
  if (datetime && nextInterval === MetricTimelineInterval.MINUTE) {
    endDate = getMinuteRangeUTC(datetime)
  }

  const newFilter = {
    startDate: datetime,
    endDate,
    interval: nextInterval,
  }
  emit('change', newFilter)
  return
}

const xScaleUnit = computed(() => {
  const units: Record<MetricTimelineInterval, string> = {
    [MetricTimelineInterval.DAY]: 'day',
    [MetricTimelineInterval.HOUR]: 'hour',
    [MetricTimelineInterval.MINUTE]: 'minute',
  }
  return units[props.interval]
})

const lineChartProps = computed(() => ({
  chartData: {
    datasets: [{ data: props.metricsAverage, borderColor: '#818CF8' }],
  },
  options: {
    parsing: {
      xAxisKey: 'datetime',
      yAxisKey: 'value',
    },
    scales: {
      x: {
        type: 'timeseries',
        time: {
          unit: xScaleUnit.value,
        },
      },
      y: {},
    },
    plugins: {
      legend: { display: false },
    },
    onClick: (_ctx, datasets: unknown[]) => {
      onClickDataPoint(datasets[0])
    },
  },
}))
</script>

<template>
  <app-card
    :title="timelineTitle"
    subtitle="Click on a data point to see more information"
  >
    <template #menu>
      <slot name="menu" />
    </template>
    <timeline-loading v-if="loading" class="text-gray-400" />
    <timeline-error v-else-if="error">{{ error }}</timeline-error>
    <timeline-empty v-else-if="!metricsAverage.length" class="text-gray-400" />
    <line-chart v-else v-bind="lineChartProps" />
  </app-card>
</template>
