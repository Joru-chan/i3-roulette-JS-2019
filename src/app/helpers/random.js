/* eslint-disable max-len */
export const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
export const valeurAleatoire = (arrayProp) => arrayProp[randomNumber(0, arrayProp.length - 1)];
