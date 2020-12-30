import lodash from 'lodash';

/**
 * @param {{}} handlers
 * @author Omar Flores <dev@omarefg.com>
 */
function setHandlers(handlers) {
  if (lodash.isPlainObject(handlers)) {
    Object.keys(handlers).forEach((key) => {
      if (this[key] !== undefined) {
        throw new Error(`Cannot set handler ${key}, it's already declared in the instance.`);
      }
      this[key] = handlers[key].bind(this);
    });
  }
}

/**
 * @param {{}} props
 * @param {{}} defaultProps
 * @author Omar Flores <dev@omarefg.com>
 */
function setProps(props = {}, defaultProps = {}) {
  const resultingProps = {};
  Object.keys({ ...defaultProps, ...props }).forEach((key) => {
    resultingProps[key] = props[key] || defaultProps[key];
  });
  this.props = resultingProps;
}

/**
 * @param {{}} state
 * @author Omar Flores <dev@omarefg.com>
 */
function setInitialState(state = {}) {
  this.state = state;
}

/**
 *
 * @param {function} view - The view to mount in the dom, it must be a function that returns an HTML element
 * @param {{
 *  props: {},
 *  defaultProps: {},
 *  handlers: {},
 *  state: {},
 *  onMount: function
 * }} config - Configuration object, it contains all the logic and data
 * @author Omar Flores <dev@omarefg.com>
 */
export default function Miru(view, config = {}) {
  setProps.bind(this)(config.props, config.defaultProps);
  setHandlers.bind(this)(config.handlers);
  setInitialState.bind(this)(config.state);

  /** @private */
  this.__viewReferenceNode__ = view.bind(this)();

  /** @private */
  this.__viewReferenceDef__ = view.bind(this);

  if (config.onMount) {
    config.onMount.bind(this)();
  }

  return this.__viewReferenceNode__;
}

/**
 * @param {{}} state
 * @author Omar Flores <dev@omarefg.com>
 */
Miru.prototype.update = function update(state) {
  if (!state) {
    throw new Error('Cannot set an empty state');
  }
  if (!lodash.isPlainObject(state)) {
    throw new Error('State must be a plain object');
  }

  this.state = { ...this.state, ...state };

  const parent = this.__viewReferenceNode__.parentNode;
  const newReference = this.__viewReferenceDef__();
  parent.replaceChild(newReference, this.__viewReferenceNode__);
  this.__viewReferenceNode__ = newReference;
};
