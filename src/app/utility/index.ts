import R from 'ramda';

export const isObject = (value: any) => R.is(Object, value);

export const zoomImage = (src: string) => window.open(src, '_blank');

export const parseImageURL = (object: {path: string, extension: string}) => `${R.path(['path'], object)}.${R.path(['extension'], object)}`;
