export const omitString = (omitHead: number, body: string, omitTail: number, str: string) => {
  return `${str.slice(0, omitHead + 1)}${body}${str.slice(str.length - omitTail + 1, str.length - 1)}`;
};
// String.prototype.omitString = function() {
//     return this
// }
