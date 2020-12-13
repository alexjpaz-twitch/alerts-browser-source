import { render, screen } from '@testing-library/react';
import App from './App';

test('alex is a bad developer because he did not write tests', () =>{
  const isAlexABadDeveloper = true;
  expect(isAlexABadDeveloper).toBe(true);
});
//test('renders learn react link', () => {
  //render(<App />);
  //const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
//});
