/* eslint-disable no-prototype-builtins */
export const buildUrlParams = (query) => {
  const params: {
    search?: string;
  } = {};

  if (query?.search) params.search = String(query?.search);

  return new URLSearchParams({
    ...params
  });
};

export const flatten2DArray = (twoDArray: string[][]): string[] => {
  return [].concat(...twoDArray);
};
export const removeEmptyElements = (source: string[]): string[] => {
  return source.filter((element) => {
    return !(element === '');
  });
};
export const getUrlEnding = (urls: string[]): string[] => {
  return urls.map((url) => {
    const lastSlashIndex = url.lastIndexOf('/') + 1;
    return url.substr(lastSlashIndex);
  });
};

export const filterMatchingElements = (source: string[], filter: string): string[] => {
  return source.filter((fileName) => {
    return fileName.includes(filter);
  });
};
export const removeParameters = (source: string[]): string[] => {
  return source.map((element) => {
    return element.split('?')[0];
  });
};
export const countOccurence = (source: string[]) => {
  const reducedSource = source.reduce((accumulator, currentValue) => {
    !accumulator.hasOwnProperty(currentValue)
      ? (accumulator[currentValue] = 1)
      : accumulator[currentValue]++;
    return accumulator;
  }, {});
  return Object.keys(reducedSource)
    .map(function (key) {
      return {
        name: key,
        count: reducedSource[key]
      };
    })
    .sort((a, b) => (a.count < b.count ? 1 : -1));
};
