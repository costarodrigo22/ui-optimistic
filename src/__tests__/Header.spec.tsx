import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Header from '@/components/Header';

describe('Header component', () => {
  test('Should render Header component', () => {
    const { getByText } = render(<Header />);

    expect(getByText('Theusers')).toBeTruthy();
  });

  test('Should render Header component', () => {
    const { getByText } = render(<Header />);

    expect(getByText('Gerencie seus usuários')).toBeTruthy();
  });
});
