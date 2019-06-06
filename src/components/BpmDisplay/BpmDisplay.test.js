import React from 'react';
import ReactDOM from 'react-dom';
import BpmDisplay from './BpmDisplay';

test('renders a paragraph tag that ends with BPM', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BpmDisplay />, div);
  expect(div.querySelector('p').innerHTML.endsWith('BPM')).toBe(true);
});
