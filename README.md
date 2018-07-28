# react-combine-consumers

this is a *2KB* lib for [React] new [Context] Api

there are Component:**combineConsumers** and HOC:**withConsumers**

## Install

npm:

```bash
npm install --save-dev webpack
```

---

## Get Started

### **combineConsumers(** *Consumers* **)**

A multiple context.consumer combine to one component

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