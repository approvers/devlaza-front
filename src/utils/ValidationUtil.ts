export const checkBlankSpace = (value: string) => !!value.match(/\S/g);
export const checkIsUrl = (value: string) => !!value.match(/^https?:\/\/.+$/g);
