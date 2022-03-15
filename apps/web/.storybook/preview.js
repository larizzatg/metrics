import '../src/assets/index.css'
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'blue',
    values: [
      {
        name: 'white',
        value: '#FFFFFF',
      },
      {
        name: 'blue',
        value: '#EFF6FF',
      },
      {
        name: 'indigo',
        value: '#EEF2FF',
      },
    ],
  },
}
