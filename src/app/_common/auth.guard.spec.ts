import { AuthGuard } from './auth.guard';

describe('Auth.Guard', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new AuthGuard()).toBeTruthy();
  });
});
