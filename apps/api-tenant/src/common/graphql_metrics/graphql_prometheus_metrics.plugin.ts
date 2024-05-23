import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';
import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Plugin } from '@nestjs/apollo';
import { Counter, LabelValues } from 'prom-client';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

function filterUndefined(from: {
  [label: string]: string | number | undefined;
}): LabelValues<any> {
  return Object.fromEntries(
    Object.entries(from).filter(([, o]) => o)
  ) as LabelValues<any>;
}

export const parsedCounter = makeCounterProvider({
  name: 'graphql_queries_parsed',
  help: 'The amount of GraphQL queries that have been parsed.',
  labelNames: ['operation_name', 'operation']
});

export const validationStartedCounter = makeCounterProvider({
  name: 'graphql_queries_validation_started',
  help: 'The amount of GraphQL queries that have started validation.',
  labelNames: ['operation_name', 'operation']
});

export const resolvedCounter = makeCounterProvider({
  name: 'graphql_queries_resolved',
  help: 'The amount of GraphQL queries that have had their operation resolved.',
  labelNames: ['operation_name', 'operation']
});

export const executionStartedCounter = makeCounterProvider({
  name: 'graphql_queries_execution_started',
  help: 'The amount of GraphQL queries that have started executing.',
  labelNames: ['operation_name', 'operation']
});

export const errorsCounter = makeCounterProvider({
  name: 'graphql_queries_errored',
  help: 'The amount of GraphQL queries that have encountered errors.',
  labelNames: ['operation_name', 'operation']
});

export const respondedCounter = makeCounterProvider({
  name: 'graphql_queries_responded',
  help: 'The amount of GraphQL queries that have been executed and been attempted to send to the client. This includes requests with errors.',
  labelNames: ['operation_name', 'operation']
});

@Injectable()
@Plugin()
export class GraphQLPrometheusMetricsPlugin implements ApolloServerPlugin {
  constructor(
    @InjectMetric('graphql_queries_parsed')
    public parsedCounter: Counter<string>,
    @InjectMetric('graphql_queries_validation_started')
    public validationStartedCounter: Counter<string>,
    @InjectMetric('graphql_queries_resolved')
    public resolvedCounter: Counter<string>,
    @InjectMetric('graphql_queries_execution_started')
    public executionStartedCounter: Counter<string>,
    @InjectMetric('graphql_queries_errored')
    public errorsCounter: Counter<string>,
    @InjectMetric('graphql_queries_responded')
    public respondedCounter: Counter<string>
  ) {}

  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    const parsedCounter = this.parsedCounter;
    const validationStartedCounter = this.validationStartedCounter;
    const resolvedCounter = this.resolvedCounter;
    const executionStartedCounter = this.executionStartedCounter;
    const errorsCounter = this.errorsCounter;
    const respondedCounter = this.respondedCounter;
    return {
      parsingDidStart(parsingContext): Promise<void> {
        const labels = filterUndefined({
          operation_name: parsingContext.request.operationName || '',
          operation: parsingContext.operation?.operation
        });
        parsedCounter.inc(labels);
        return;
      },
      validationDidStart(validationContext): Promise<void> {
        const labels = filterUndefined({
          operation_name: validationContext.request.operationName || '',
          operation: validationContext.operation?.operation
        });
        validationStartedCounter.inc(labels);
        return;
      },
      didResolveOperation(resolveContext): Promise<void> {
        const labels = filterUndefined({
          operation_name: resolveContext.request.operationName || '',
          operation: resolveContext.operation.operation
        });
        resolvedCounter.inc(labels);
        return;
      },
      executionDidStart(executingContext): Promise<void> {
        const labels = filterUndefined({
          operation_name: executingContext.request.operationName || '',
          operation: executingContext.operation.operation
        });
        executionStartedCounter.inc(labels);
        return;
      },
      didEncounterErrors(errorContext): Promise<void> {
        const labels = filterUndefined({
          operation_name: errorContext.request.operationName || '',
          operation: errorContext.operation?.operation
        });
        errorsCounter.inc(labels);
        return;
      },
      willSendResponse(responseContext): Promise<void> {
        const labels = filterUndefined({
          operation_name: responseContext.request.operationName || '',
          operation: responseContext.operation?.operation
        });
        respondedCounter.inc(labels);
        return;
      }
    };
  }
}
