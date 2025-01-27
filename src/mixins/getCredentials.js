import fetch from 'node-fetch';

import { _get } from '../helpers/utilities.js';
import credentialsPayload from '../payloads/credentialsPayload.js';
import { makeAuthorizationSign } from '../helpers/ewelink.js';
import errors from '../data/errors.js';


export async function getCredentials() {
  const { APP_ID, APP_SECRET } = this;

  const body = credentialsPayload({
    appid: APP_ID,
    email: this.email,
    phoneNumber: this.phoneNumber,
    password: this.password,
  });

  const request = await fetch(`${this.getApiUrl()}/user/login`, {
    method: 'post',
    headers: {
      Authorization: `Sign ${makeAuthorizationSign(APP_SECRET, body)}`,
    },
    body: JSON.stringify(body),
  });

  let response = await request.json();

  const error = _get(response, 'error', false);
  const region = _get(response, 'region', false);

  if (error && [400, 401, 404].indexOf(parseInt(error)) !== -1) {
    return { error: 406, msg: errors['406'] };
  }

  if (error && parseInt(error) === 301 && region) {
    if (this.region !== region) {
      this.region = region;
      response = await this.getCredentials();
      return response;
    }
    return { error, msg: 'Region does not exist' };
  }

  this.apiKey = _get(response, 'user.apikey', '');
  this.at = _get(response, 'at', '');
  return response;
}

