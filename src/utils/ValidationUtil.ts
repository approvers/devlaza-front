export const checkBlankSpace = (value: string) => /\S/g.test(value);
export const checkIsUrl = (value: string) => /^https?:\/\/.+$/g.test(value);
