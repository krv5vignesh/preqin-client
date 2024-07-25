import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';
 
describe('Page', () => {
  it('renders homepage with grid', () => {
    render(<Home />)
 
    const grid = screen.getByRole('grid', { level: 1 })
    expect(grid).toBeInTheDocument()
  })
})