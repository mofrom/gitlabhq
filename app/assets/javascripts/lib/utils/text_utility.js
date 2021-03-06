/**
 * Adds a , to a string composed by numbers, at every 3 chars.
 *
 * 2333 -> 2,333
 * 232324 -> 232,324
 *
 * @param {String} text
 * @returns {String}
 */
export const addDelimiter = text =>
  text ? text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : text;

/**
 * Returns '99+' for numbers bigger than 99.
 *
 * @param {Number} count
 * @return {Number|String}
 */
export const highCountTrim = count => (count > 99 ? '99+' : count);

/**
 * Converts first char to uppercase and replaces undercores with spaces
 * @param {String} string
 * @requires {String}
 */
export const humanize = string =>
  string.charAt(0).toUpperCase() + string.replace(/_/g, ' ').slice(1);

/**
 * Adds an 's' to the end of the string when count is bigger than 0
 * @param {String} str
 * @param {Number} count
 * @returns {String}
 */
export const pluralize = (str, count) => str + (count > 1 || count === 0 ? 's' : '');

/**
 * Replaces underscores with dashes
 * @param {*} str
 * @returns {String}
 */
export const dasherize = str => str.replace(/[_\s]+/g, '-');

/**
 * Removes accents and converts to lower case
 * @param {String} str
 * @returns {String}
 */
export const slugify = str => str.trim().toLowerCase();

/**
 * Replaces whitespaces with hyphens and converts to lower case
 * @param {String} str
 * @returns {String}
 */
export const slugifyWithHyphens = str => str.toLowerCase().replace(/\s+/g, '-');

/**
 * Truncates given text
 *
 * @param {String} string
 * @param {Number} maxLength
 * @returns {String}
 */
export const truncate = (string, maxLength) => `${string.substr(0, maxLength - 3)}...`;

/**
 * Truncate SHA to 8 characters
 *
 * @param {String} sha
 * @returns {String}
 */
export const truncateSha = sha => sha.substr(0, 8);

/**
 * Capitalizes first character
 *
 * @param {String} text
 * @return {String}
 */
export function capitalizeFirstCharacter(text) {
  return `${text[0].toUpperCase()}${text.slice(1)}`;
}

/**
 * Returns the first character capitalized
 *
 * If falsey, returns empty string.
 *
 * @param {String} text
 * @return {String}
 */
export function getFirstCharacterCapitalized(text) {
  return text ? text.charAt(0).toUpperCase() : '';
}

/**
 * Replaces all html tags from a string with the given replacement.
 *
 * @param {String} string
 * @param {*} replace
 * @returns {String}
 */
export const stripHtml = (string, replace = '') => {
  if (!string) return string;

  return string.replace(/<[^>]*>/g, replace);
};

/**
 * Converts snake_case string to camelCase
 *
 * @param {*} string
 */
export const convertToCamelCase = string => string.replace(/(_\w)/g, s => s[1].toUpperCase());

/**
 * Converts a sentence to lower case from the second word onwards
 * e.g. Hello World => Hello world
 *
 * @param {*} string
 */
export const convertToSentenceCase = string => {
  const splitWord = string.split(' ').map((word, index) => (index > 0 ? word.toLowerCase() : word));

  return splitWord.join(' ');
};

/**
 * Splits camelCase or PascalCase words
 * e.g. HelloWorld => Hello World
 *
 * @param {*} string
 */
export const splitCamelCase = string =>
  string
    .replace(/([A-Z]+)([A-Z][a-z])/g, ' $1 $2')
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .trim();
