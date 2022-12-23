import { _get } from '../helpers/utilities';
import errors from '../data/errors';

export default {
  async getRegion() {
    if (!this.email || !this.password) {
      return { error: 406, msg: errors.invalidAuth };
    }

    const credentials = await this.getCredentials();

    const error = _get(credentials, 'error', false);

    if (error) {
      return credentials;
    }

    return {
      email: credentials.user.email,
      region: credentials.region,
    };
  },
};
