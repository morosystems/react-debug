# @morosystems/react-debug
Debug utils for react components. Intended for development only, not for production

## debug HOC

Lets you see in console when component mounts, unmounts, updates and why it updated:

```
import {debug} from "@morosystems/react-debug";

export default debug()(MyComponent);
```

This logs roughly the following information:
```
MyComponent mounts
MyComponent updates name,input
MyComponent updates error
MyComponent unmounts
```

Displayed information can be changed using the configuration object, e.g.:
```
export default debug({name: 'Test'})(MyComponent);
```

### Alternative import
In order to not importing component all the time, you can import `@morosystems/react-debug/lib/patch` just once, in your main file,
then use `debug()` directly from global namespace. You can also safely forget about removing this import for production,
since it will inject `debug()` only when NODE_ENV is `development`

```
import "@morosystems/react-debug/lib/patch";
...
export default debug()(MyComponent);
```

### Component name
You can specify name that is logged using the `name` property. You can specify:
1. String.
2. Function of props. This is useful when debugging one specific instance of generic component, e.g. `Field`.

```
export default debug({name: (props) => props.input.name})(Field);
```
### Custom logging
You can also use custom messages for each lifecycle event.
1. `mount` as a function from props to string.
2. `update` as a function from props and next props to string.
3. `unmount` as a function from props to string.

You can also supress loging by returning `null`, `undefined` or `false`:
```
const update = (props, nextProps) => (props.name !== nextProps.name) && `${props.name} updates to ${nextProps.name}`;

export default debug({update})(MyComponent);
```
