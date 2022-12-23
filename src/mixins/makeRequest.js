import fetch from 'node-fetch';
import { _get, _empty, toQueryString } from '../helpers/utilities';
import errors from '../data/errors';

/**
 * Helper to make api requests
 *
 * @param method
 * @param url
 * @param uri
 * @param body
 * @param qs
 * @returns {Promise<{msg: *, error: *}|*>}
 */
export async function makeRequest({ method = 'get', url, uri, body = {}, qs = {} }) {
  const { at } = this;

  if (!at) {
    await this.getCredentials();
  }

  let apiUrl = this.getApiUrl();

  if (url) {
    apiUrl = url;
  }

  const payload = {
    method,
    headers: {
      Authorization: `Bearer ${this.at}`,
      'Content-Type': 'application/json',
    },
  };

  if (!_empty(body)) {
    payload.body = JSON.stringify(body);
  }

  const queryString = !_empty(qs) ? toQueryString(qs) : '';
  const requestUrl = `${apiUrl}${uri}${queryString}`;

  const request = await fetch(requestUrl, payload);

  if (!request.ok) {
    return { error: request.status, msg: errors[request.status] };
  }

  const response = await request.json();

  return response
}
