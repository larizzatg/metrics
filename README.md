# Metrics

Fullstack application to visualize and create metrics.

## Features

### Create new metrics

- Create metrics given a name and value.
- Validate if the metric name and input.

![gift showing a metric creation](./docs/new-metric.gif)

### Metrics Visualization

#### Filter

- Select the metric you want to visualize.
- The first metric returned is selected by default.

![gift show filter of visualization by metric name](./docs/filter-metrics.gif)

#### Drill Down

- Metrics average are grouped per day by default
- When clicking a specific dataset point on the day vizualization it will go to the hour vizualization
- When clicking a specific dataset point on the hour vizualization it will go to the minute vizualization

![gift shows daily average of responsive metric, clicking on a dataset shows the next interval average](./docs/drill-down.gif)

## Setup

### Necessary Tools

- yarn v1
- docker
- node v14

### Steps

1. Clone the project
   `https://github.com/larizzatg/metrics.git`
2. Enter the directory `cd metrics`
3. Execute `yarn install`
4. Go to the api directory `cd metrics/apps/api`
5. Create a .env files
   - copy the values of example.env
   - add password
   - modify as you like
6. In the api dir open run `docker-compose up -d` this will run the docker image with the database on detachment mode
7. Move back to the parent directoy `cd ../../` and run `yarn dev`

- client port default is `localhost:3000`
- api port default is `localhost:4000`

## Stack

Turbo repo and yarn workspaces for monorepo managament

### Frontend

- vite for bundling and dev server
- typescript
- vue3 as a web framework
- storybook for rapid testing of components
- tailwind as a css utility framework
- chart.js to display the visualizations
- vitest as a test runner
- testing/library for component testing
- cypress for e2e (not in use)
- msw to mock server calls
- prettier for code formating
- axios for api call
- date-fns, date-fns-tz as a time scale adapter for chart.js and some time utility functions
- headless/ui for select and modal headless logic
- vue-toastification to display status messages

### Backend

- nestjs as a backend framework with express.js and typeorm
- postgress as a database
- typescript
- jest for testing
- prettier
- class-validator/transformer for dto pipe validation
- hapi/joi for configuration schema

## Considerations

## Roadmap
