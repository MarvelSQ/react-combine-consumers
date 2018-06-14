# react-combine-consumers

this is a lib for [React] new [Context] Api

there are **combineConsumers** and **withConsumers**

## combineConsumers

this can combine multiple consumers into one Component

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

## withConsumers

this can combine multiple consumers as a High-Order-Component

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

[React]:https://reactjs.org
[Context]:https://reactjs.org/docs/context.html