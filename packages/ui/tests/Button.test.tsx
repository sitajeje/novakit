import { render, screen } from '@testing-library/react';
import Button from '../src/components/Button';


test('renders button text', () => {
  render(<Button>Click Me</Button>);
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});

