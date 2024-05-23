import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import {
  GraphQLPrometheusMetricsPlugin,
  validationStartedCounter,
  parsedCounter,
  resolvedCounter,
  executionStartedCounter,
  errorsCounter,
  respondedCounter,
} from './graphql_prometheus_metrics.plugin';

@Module({
  imports: [PrometheusModule.register()],
  providers: [
    GraphQLPrometheusMetricsPlugin,
    validationStartedCounter,
    parsedCounter,
    resolvedCounter,
    executionStartedCounter,
    errorsCounter,
    respondedCounter,
  ],
  exports: [GraphQLPrometheusMetricsPlugin],
})
export class PromModule {}
