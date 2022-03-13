import { render } from '@testing-library/vue'
import { describe, test } from 'vitest'
import '@testing-library/jest-dom'
import AppCard from './app-card.vue'

describe('AppCard Component', () => {
  test('render with correct title and content', () => {
    const title = 'Apple Pie'
    const { getByText } = render(AppCard, {
      props: { title },
      slots: { default: '<div>content</div>' },
    })
    getByText(title)
    getByText('content')
  })
  test('render with custom header', () => {
    const title = 'Apple Pie'
    const { getByText, queryByText } = render(AppCard, {
      props: { title },
      slots: {
        default: '<div>content</div>',
        header: '<header>Card Header</header>',
      },
    })

    expect(queryByText(title)).not.toBeInTheDocument()
    getByText('Card Header')
    getByText('content')
  })
})
