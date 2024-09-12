import '@testing-library/jest-dom';
import UsersForm from '@/components/UsersForm';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { toast } from 'sonner';

const createUsersMock = vi.fn();

vi.mock('@/app/hooks/useCreateUsers', () => ({
  useCreateUsers: () => ({
    createUser: createUsersMock,
  }),
}));

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('UsersForm', () => {
  test('Should be able render UsersForm', () => {
    render(<UsersForm />);

    expect(screen.getByPlaceholderText('Nome do usuário')).toBeTruthy();
    expect(screen.getByPlaceholderText('@ do GitHub')).toBeTruthy();
    expect(screen.getByText('Cadastrar')).toBeTruthy();
  });

  test('Should update values in inputs when the user type', async () => {
    render(<UsersForm />);

    const nameInput = screen.getByPlaceholderText('Nome do usuário');
    const gitHubInput = screen.getByPlaceholderText('@ do GitHub');

    await userEvent.type(nameInput, 'Rodrigo');
    await userEvent.type(gitHubInput, 'costarodrigo22');

    expect(nameInput).toHaveValue('Rodrigo');
    expect(gitHubInput).toHaveValue('costarodrigo22');
  });

  test('Should submit the form with values corrects', async () => {
    render(<UsersForm />);

    const form = screen.getByTestId('users-form');
    const nameInput = screen.getByPlaceholderText('Nome do usuário');
    const gitHubInput = screen.getByPlaceholderText('@ do GitHub');

    await userEvent.type(nameInput, 'Rodrigo Costa');
    await userEvent.type(gitHubInput, 'costarodrigo22');

    fireEvent.submit(form);

    expect(createUsersMock).toHaveBeenCalledWith({
      name: 'Rodrigo Costa',
      userName: 'costarodrigo22',
      blocked: false,
    });
  });

  test('Should show error message if createUsersMock throw a error', async () => {
    createUsersMock.mockRejectedValue(new Error('Erro ao cadastrar usuário'));

    render(<UsersForm />);

    const form = screen.getByTestId('users-form');
    const nameInput = screen.getByPlaceholderText('Nome do usuário');
    const gitHubInput = screen.getByPlaceholderText('@ do GitHub');

    await userEvent.type(nameInput, 'Rodrigo Costa');
    await userEvent.type(gitHubInput, 'costarodrigo22');

    fireEvent.submit(form);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Erro ao cadastrar usuário!!');
    });
  });
});
