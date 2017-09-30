import R from 'ramda';

export const isObject = (value) => R.is(Object, value);

export const zoomImage = (src) => window.open(src, '_blank');
