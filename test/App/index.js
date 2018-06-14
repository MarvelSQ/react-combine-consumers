import React, { Component } from 'react';
import HeightContext from './HeightContext';
import ColorContext from './ColorContext';
import { combineConsumers, withConsumers } from '../../';
import Button from './Button';

const MultiConsumer = combineConsumers({ color: ColorContext.Consumer, height: HeightContext.Consumer });
const EmhancedButton = withConsumers({ color: ColorContext.Consumer, height: HeightContext.Consumer })(Button);

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: '40px',
      color: '#ff00ff',
    };
  }

  changeColor = (color) => {
    this.setState({ color });
  }

  changeHeight = (height) => {
    this.setState({ height });
  }

  render() {
    return <div
      onChangeColor={this.changeColor}
      onChangeHeight={this.changeHeight}>
      <HeightContext.Provider value={this.state.height}>
        <ColorContext.Provider value={this.state.color}>
          <MultiConsumer>
            {({ color, height }) => {
              return <div style={{ color, height }}>{color},{height}</div>
            }}
          </MultiConsumer>
          <EmhancedButton />
        </ColorContext.Provider>
      </HeightContext.Provider>
    </div>;
  }
}

export default index;
