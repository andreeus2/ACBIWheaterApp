import { render, screen } from '@testing-library/react';
import MainWeather from '../Components/MainWeather';

test('renders learn react link', () => {
  render(<MainWeather />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
