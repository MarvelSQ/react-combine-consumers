import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

test('test', () => {
  expect(1 + 1).toBe(2);
});

test('render', () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.props.onChangeColor('#2196f3');

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.props.onChangeHeight('30px');

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

