import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import ThemeSwitcher from '@/components/ThemeSwitcher';
// import { useTheme } from '@/app/hooks/useTheme';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

// vi.mock('@/app/hooks/useTheme', () => ({
//   useTheme: () => ({
//     setTheme: vi.fn(),
//   }),
// }));

interface IBtn {
  onClick: () => void;
}

function SimpleDropdown({ onClick }: IBtn) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button onClick={onClick} data-testid="switcher" aria-label="open menu">
          Open Menu
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent role="menu">
        <DropdownMenuItem>Item 1</DropdownMenuItem>
        <DropdownMenuItem>Item 2</DropdownMenuItem>
        <DropdownMenuItem>Item 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

describe('ThemSwitcher', () => {
  test('Should be able to render the documment', () => {
    render(<ThemeSwitcher />);

    const switcherButton = screen.getByTestId('switcher');

    expect(switcherButton).toBeInTheDocument();
  });

  test('Should be able to show dropdown menu on click', async () => {
    const portalContainer = document.createElement('div');
    portalContainer.setAttribute('id', 'portal-root');
    document.body.appendChild(portalContainer);

    const handleClick = vi.fn();

    render(<SimpleDropdown onClick={handleClick} />, {
      container: document.body.appendChild(portalContainer),
    });

    const dropDownBtn = screen.getByTestId('switcher');

    fireEvent.click(dropDownBtn);

    expect(dropDownBtn).toBeInTheDocument();

    expect(handleClick).toHaveBeenCalledTimes(1);

    // await new Promise(r => setTimeout(r, 1000));

    // const portal = screen.getByTestId('portal-root');

    // expect(portal).toBeInTheDocument();

    // const item1 = screen.getByText('Item 1');
    // expect(item1).toBeVisible();
  });

  // test('deve alternar para o tema "Light" quando clicado', () => {
  //   const { setTheme } = useTheme();
  //   render(<ThemeSwitcher />);

  //   // Clicar no botão para abrir o menu
  //   fireEvent.click(screen.getByTestId('switcher'));

  //   // Clicar na opção "Light"
  //   fireEvent.click(screen.getByTestId('switcher-button'));

  //   // Verificar se a função setTheme foi chamada com o valor correto
  //   expect(setTheme).toHaveBeenCalledWith('light');
  // });
});
