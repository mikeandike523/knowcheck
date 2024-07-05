/**
 *
 * Super easy template formatting using syntax
 *
 * :name    named indices, only works if data is an object
 * :index   specific indices, only works if data is an array
 * :+       indices in order only works if data is an array
 * ::       escapes colon
 *
 * :!   !:   specialized escape sequence to never process inside a given region
 *           of course the region delimiters are removed
 *           i.e. "raw" indicator
 *
 *
 * @param {*} template
 * @param {*} data
 */
export function fillTemplate(template: any, data: any): any;
export function escapeForTemplate(text: any): any;
