import * as Flex from '@twilio/flex-ui';
import { EncodedParams } from '../types/Params';
import { random } from 'lodash';
import { ErrorManager, FlexPluginErrorType } from '../utils/ErrorManager';

function delay<T>(ms: number, result?: T) {
  return new Promise((resolve) => setTimeout(() => resolve(result), ms));
}

const { FLEX_APP_SERVERLESS_FUNCTONS_DOMAIN } = process.env;

export default abstract class ApiService {
  protected manager = Flex.Manager.getInstance();
  readonly serverlessDomain: string;

  constructor() {
    this.serverlessDomain = '';

    try {
      this.serverlessDomain =
        process.env.FLEX_APP_SERVERLESS_FUNCTONS_DOMAIN || '<FLEX_APP_SERVERLESS_FUNCTONS_DOMAIN>';

      if (!this.serverlessDomain) throw Error('serverless_functions_domain is not set');
    } catch (e) {
      ErrorManager.createAndProcessError('Could not set serverless function domain', {
        type: FlexPluginErrorType.serverless,
        description: e instanceof Error ? `${e.message}` : 'Could not set serverless function domain',
        context: 'Plugin.ApiService',
        wrappedError: e,
      });
    }
  }

  protected buildBody(encodedParams: EncodedParams): string {
    return Object.keys(encodedParams).reduce((result, paramName, idx) => {
      if (encodedParams[paramName] === undefined) {
        return result;
      }
      if (idx > 0) {
        return `${result}&${paramName}=${encodedParams[paramName]}`;
      }
      return `${paramName}=${encodedParams[paramName]}`;
    }, '');
  }

  protected fetchJsonWithReject<T>(url: string, config: RequestInit, attempts = 0): Promise<T> {
    return fetch(url, config)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .catch(async (error) => {
        try {
          if (error.status === 429 && attempts < 3) {
            await delay(random(10, 50) + attempts * 100);
            return await this.fetchJsonWithReject<T>(url, config, attempts + 1);
          }
          return error.json().then((response: any) => {
            throw response;
          });
        } catch (e) {
          throw error;
        }
      });
  }
}
