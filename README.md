# react-combine-consumers

this is a *2KB* lib for [React] new [Context] Api

there are Component:**combineConsumers** and HOC:**withConsumers**

## Install

npm:

```bash
npm install --save-dev react-combine-consumers
```

---

## Get Started

### **combineConsumers(** *Consumers* **)**

A multiple context.consumer combine to one component

in React Developer Tool show as **combine(...)**

```html
<Context.Provider value="app">
  <Context.Provider value={height:16}>
    ...
    <combine(name,style)>
      <Context.Consumer>
        <Context.Consumer>
          <button style={height:16} >
            <span>app</span>
          </button>
        <Context.Consumer>
      </Context.Consumer>
    </combine(name,style)>
    ...
  </Context.Provider>
</Context.Provider>
```

#### Consumers

 a object, value is the **Context.Consumer**, **context value** will marked as it's own key;

```js
const Consumers = {
  name: NameContext.Consumer,
  style: StyleContext.Consumer,
}
```

### Usage

```js
import React from 'react';
import { combineConsumers } from 'react-combine-consumers';
import ColorContext from './Themecontext';
import HeightContext from './Themecontext';

const StyleConsumer = combineConsumers({color:ColorContext.Consumer,height:HeightContext.Consumer})

export default ()=>{
  return <HeightContext.Provider value="19px">
    <ColorContext.Provider value="#2196f3">
      <StyleConsumer>
        {
          ({color,height})=>
            <button style={{color,height}}>
              this is a button
            </button>
        }
      </StyleConsumer>
    </ColorContext.Provider>
  </HeightContext.Provider>
}
```

---

### **withConsumers(** *Consumers* **)**

this can combine multiple consumers as a High-Order-Component

in React Developer Tool show as **with(...)**

```html
<Context.Provider value="app">
  <Context.Provider value={height:16}>
    ...
    <with(name,style)>
      <combine(name,style)>
        <Context.Consumer>
          <Context.Consumer>
            <SomeComponent name="app" style={height:16}/>
          <Context.Consumer>
        </Context.Consumer>
      </combine(name,style)>
    </with(name,style)>
    ...
  </Context.Provider>
</Context.Provider>
```

#### Consumers

 a object, value is the **Context.Consumer**, **context value** will marked as it's own key;

```js
const Consumers = {
  name: NameContext.Consumer,
  style: StyleContext.Consumer,
}
```

### Usage

```js
import React from 'react';
import { withConsumers } from 'react-combine-consumers';
import ColorContext from './Themecontext';
import HeightContext from './Themecontext';
import Button from './Button';

const EnhancedButton = withConsumers({color:ColorContext.Consumer,height:HeightContext.Consumer})(Button)

export default ()=>{
  return <HeightContext.Provider value="19px">
    <ColorContext.Provider value="#2196f3">
      <EnhancedButton/>
    </ColorContext.Provider>
  </HeightContext.Provider>
}
```

## updates

## v0.2.0

main update: reduce module size

|version|stat|parsed|gzip|
|-------|----:|------:|----:|
|0.1.2|7.14KB|6.95KB|1.49KB|
|0.2.0|2.12KB|2.24KB|977B|

[React]:https://reactjs.org
[Context]:https://reactjs.org/docs/context.html