import { CharSet, generateStringSync } from 'secure-pin';

export const generatePassword = (): string => {
  const charSet = new CharSet();
  charSet.addLowerCaseAlpha().addUpperCaseAlpha().addNumeric();

  return generateStringSync(10, charSet);
};
