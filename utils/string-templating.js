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
function fillTemplate(template, data) {
  let orderIndex = 0;

  // Handle the raw regions first
  let rawRegions = [];
  template = template.replace(/:!(.*?)!:/gs, (match, p1) => {
    rawRegions.push(p1);
    return `__RAW${rawRegions.length - 1}__`;
  });

  // Process the template
  template = template.replace(/:(\+|::|\w+)/g, (match, p1) => {
    if (p1 === "::") {
      return ":";
    } else if (p1 === "+") {
      if (Array.isArray(data)) {
        return data[orderIndex++];
      } else {
        throw new Error("Data must be an array when using :+ syntax");
      }
    } else if (!isNaN(p1)) {
      if (Array.isArray(data)) {
        return data[parseInt(p1, 10)];
      } else {
        throw new Error("Data must be an array when using :index syntax");
      }
    } else {
      if (typeof data === "object" && data !== null) {
        return data[p1];
      } else {
        throw new Error("Data must be an object when using :name syntax");
      }
    }
  });

  // Restore the raw regions
  template = template.replace(
    /__RAW(\d+)__/g,
    (match, p1) => rawRegions[parseInt(p1, 10)],
  );

  return template;
}

function escapeForTemplate(text) {
  if (typeof text === "string") {
    return text;
  }
  return text.replace(/:/g, "::");
}

export {
  fillTemplate,
  escapeForTemplate
}