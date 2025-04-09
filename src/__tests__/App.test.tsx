import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders Vite and React logos', () => {
    render(<App />);
    expect(screen.getByAltText(/vite logo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/react logo/i)).toBeInTheDocument();
  });

  test('renders initial count and increments on button click', () => {
    render(<App />);
    const button = screen.getByText(/count is 0/i);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText(/count is 1/i)).toBeInTheDocument();
  });
});
