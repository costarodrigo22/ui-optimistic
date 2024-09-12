import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { userEvent } from '@testing-library/user-event';

const setThemeMock = vi.fn();

vi.mock('@/app/hooks/useTheme', () => ({
  useTheme: () => ({
    setTheme: setThemeMock,
  }),
}));

describe('ThemSwitcher', () => {
  test('Should be able to render the documment', () => {
    render(<ThemeSwitcher />);

    const switcherButton = screen.getByTestId('switcher');

    expect(switcherButton).toBeInTheDocument();
  });

  test('Should be able to show dropdown menu on click', async () => {
    render(<ThemeSwitcher />);

    const dropDownBtn = screen.getByTestId('switcher');

    await userEvent.click(dropDownBtn);

    const dropItemLight = screen.getByText('Light');
    const dropItemDark = screen.getByText('Dark');
    const dropItemSystem = screen.getByText('System');

    expect(dropItemLight).toBeTruthy();
    expect(dropItemDark).toBeTruthy();
    expect(dropItemSystem).toBeTruthy();
  });

  test('deve alternar para o tema "Light" quando clicado', async () => {
    render(<ThemeSwitcher />);

    const switcherBtn = screen.getByTestId('switcher');

    await userEvent.click(switcherBtn);

    const lightOptionMode = screen.getByText('Light');

    await userEvent.click(lightOptionMode);

    expect(setThemeMock).toHaveBeenCalledWith('light');
  });
});
