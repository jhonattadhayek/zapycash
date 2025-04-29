import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loading } from '../Loading';

describe('Loading', () => {
  it('should render loading spinner', () => {
    render(<Loading />);
    
    const loadingElement = screen.getByTestId('loading-spinner');
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveClass('animate-spin');
  });
}); 