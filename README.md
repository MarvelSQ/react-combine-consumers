# react-combine-consumers

this is a lib for [React] new [Context] Api

there are **combineConsumers** and **withConsumers**

## v0.1.0

### preRender

combineConsumers support **preRender**

there are two params

- *valuesObj* multiple consumers Values Obj

  - like ```{ height: HEIGHT_CONTEXT_VALUE,color: COLOR_CONTEXT_VALUE }```

- *render* function inside multiConsumer

  - like ```(params) => <Component {...params} />```

***default***

```js
(valuesObj,render)=>{
  return render(valuesObj);
}
```

### mapValuesToProps

withConsumers support **mapValuesToProps**

there are two params

- *valuesObj* multiple consumers Values Obj
  - like ```{ height: HEIGHT_CONTEXT_VALUE,color: COLOR_CONTEXT_VALUE }```

***default***

```js
(valuesObj)=>{
  // some opreation
  return valuesObj;
}
```

## combineConsumers

this can combine multiple consumers into one Component

### Usage

```js
import React from 'react';
import { combineConsumers } from 'react-combine-consumers';
import ColorContext from './Themecontext';
import HeightContext from './Themecontext';

const StyleConsumer = combineConsumers({color:ColorContext.Consumer,height:HeightContext.Consumer},({color,height},render)=>render(color,height))

export default ()=>{
  return <HeightContext.Provider value="19px">
    <ColorContext.Provider value="#2196f3">
      <StyleConsumer>
        {
          (color,height)=>
            <button style={{color,height}}>
              this is a button
            </button>
        }
      </StyleConsumer>
    </ColorContext.Provider>
  </HeightContext.Provider>
}
```

## withConsumers

this can combine multiple consumers as a High-Order-Component

### Usage

```js
import React from 'react';
import { withConsumers } from 'react-combine-consumers';
import ColorContext from './Themecontext';
import HeightContext from './Themecontext';
import Button from './Button';

const EnhancedButton = withConsumers({color:ColorContext.Consumer,height:HeightContext.Consumer},({color,height})=>({color:color.repace('f','0'),height}))(Button)

export default ()=>{
  return <HeightContext.Provider value="19px">
    <ColorContext.Provider value="#2196f3">
      <EnhancedButton/>
    </ColorContext.Provider>
  </HeightContext.Provider>
}
```

[React]:https://reactjs.org
[Context]:https://reactjs.org/docs/context.html