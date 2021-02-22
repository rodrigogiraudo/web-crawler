/* eslint-disable no-undef */
import { buildUrlParams, buildTitle, parseDateToIcalFormat } from '../index';

const params = {
  search: 'sixt',
};

describe('buildUrlParams', () => {
  it('return expected content', () => {
    expect(buildUrlParams(params).toString()).toBe(
      'search=sixt'
    );
  });
});
