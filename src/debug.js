import React from 'react';

const defaultMount = (nameFn) => (props) => `${nameFn(props)} mounts`;
const defaultUnmount = (nameFn) => (props) => `${nameFn(props)} unmounts`;
const defaultUpdate = (nameFn) => (props, nextProps) => {
    const changed = Object.keys(nextProps).filter((key) => props[key] !== nextProps[key]).join(', ');
    return `${nameFn(nextProps)} updates ${changed}`;
};
const logIfExists = (string) => {
    if (string) {
        console.log(string);
    }
};

/**
 * [HoC] Debug component. Logs debug information about component lifecycle: componentDidMount, componentWillUnmount, componentWillUpdate.
 *
 * @param {?object} $0 Configuration (optional)
 * @param {?string|function} $0.name Name of the component. May be a string or function from props. If undefined, displayName is used.
 * @param {?function} $0.mount Generates componentDidMount message. Receives props as argument.
 * @param {?function} $0.unmount Generates componentWillUnmount message. Receives props as argument.
 * @param {?function} $0.update Generates componentWillUpdate message. Receives props and nextProps as arguments.
 * @return {component => component} Configured debug component wrapper.
 */
const debug = ({name, mount, unmount, update} = {}) => (Component) => {
    const finalName = name || Component.displayName || Component.name || 'Component';
    const nameFn = typeof finalName === 'function' ? finalName : () => finalName;
    const onMount = mount || defaultMount(nameFn);
    const onUnmount = unmount || defaultUnmount(nameFn);
    const onUpdate = update || defaultUpdate(nameFn);

    return class extends React.Component {
        componentDidMount() {
            logIfExists(onMount(this.props));
        }

        componentWillUpdate(nextProps) {
            logIfExists(onUpdate(this.props, nextProps));
        }

        componentWillUnmount() {
            logIfExists(onUnmount(this.props));
        }

        render() {
            return <Component {...this.props} />;
        }
    };
};
export default debug;
