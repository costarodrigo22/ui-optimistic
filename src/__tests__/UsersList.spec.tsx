import '@testing-library/jest-dom';
import UsersList from '@/components/UsersList';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

const useUsersMockCall = vi.fn();

vi.mock('@/app/hooks/useUsers', () => ({
  useUsers: useUsersMockCall,
}));

vi.mock('@/app/hooks/useUsers', () => ({
  useUsers: vi.fn().mockReturnValue({ users: [], isLoading: false }),
}));

vi.mock('@/app/hooks/useUpdateUser', () => ({
  useUpdateUser: vi.fn().mockReturnValue({ updataUser: vi.fn() }),
}));

describe('UsersList', () => {
  test('Should be able render component UsersList', () => {
    render(<UsersList />);

    const usersListComponent = screen.getByTestId('users-list');

    expect(usersListComponent).toBeTruthy();
  });

  // test('Should be able show skeletron while loading', () => {
  //   render(<UsersList />);

  //   useUsersMockCall.mockReturnValue({ users: [], isLoading: true });

  //   const skeletons = screen.getByTestId('loading');

  //   expect(skeletons).toHaveLength(3);
  // });
});
