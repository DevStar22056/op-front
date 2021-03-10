import _map from 'lodash/map'
import _isArray from 'lodash/isArray'
import _isPlainObject from 'lodash/isPlainObject'

// This function recursively adds meta tags to the route(s) passed to it and
// to all of it children. Useful for defining whole sections.

export default function addMeta (route, newProperties) {
  if (_isPlainObject(route) && route.path !== '*') {
    route.meta = { ...newProperties, ...route.meta }
  } else
  if (_isArray(route)) {
    route = _map(route, elem => addMeta(elem, newProperties))
  }
  if (_isArray(route.children)) {
    route.children = _map(route.children, elem => addMeta(elem, newProperties))
  }
  return route
}
