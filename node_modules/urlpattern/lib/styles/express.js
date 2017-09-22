/**
 * toString ref.
 */
var toString = {}.toString;


/**
 * Normalize the given path string,
 * returning a regular expression.
 *
 * An empty array should be passed,
 * which will contain the placeholder
 * key names. For example "/user/:id" will
 * then contain ["id"].
 *
 * @param  {String|RegExp|Array} path
 * @param  {Array} keys
 * @param  {Boolean} sensitive
 * @param  {Boolean} strict
 * @return {RegExp}
 * @api private
 */

// CREDIT: express - utils.pathRegexp

exports.parse = function(path, keys, sensitive, strict) {
  if (toString.call(path) == '[object RegExp]') return path;
  if (Array.isArray(path)) path = '(' + path.join('|') + ')';
  path = path
    .concat(strict ? '' : '/?')
    .replace(/\/\(/g, '(?:/')
    .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function(_, slash, format, key, capture, optional, star){
      keys.push({ name: key, optional: !! optional });
      slash = slash || '';
      return ''
        + (optional ? '' : slash)
        + '(?:'
        + (optional ? slash : '')
        + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
        + (optional || '')
        + (star ? '(/*)?' : '');
    })
    .replace(/([\/.])/g, '\\$1')
    .replace(/\*/g, '(.*)');
  return new RegExp('^' + path + '$', sensitive ? '' : 'i');
}


/**
 * Substitute `vars` into the given path
 * string, returning a string.
 *
 * As an optimization, pass keys obtained
 * from a previous call to parse().
 *
 * @param  {String} path
 * @param  {Object} vars
 * @param  {Array} keys
 * @return {String}
 * @api private
 */

exports.transform = function(path, vars, keys) {
  if (!keys) {
    keys = [];
    exports.parse(path, keys);
  }
  
  var out = path;
  keys.forEach(function(key) {
    if (!key.optional) {
      if (!vars[key.name]) { throw new Error('Failed to substitute :' + key.name + ' in pattern ' + path); }
      out = out.replace(':' + key.name, vars[key.name]);
    } else {
      var replacement = vars[key.name] ? '$1' + vars[key.name] : '';
      out = out.replace(new RegExp('(\\.?\\/?):' + key.name + '\\?'), replacement);
    }
  });
  return out;
}
