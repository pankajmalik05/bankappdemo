import {login} from '../authActions';

it('Login with credencials', async () => {
  let data = await login({userId: 'A', password: '1'});
  expect(data.success).toEqual(true);
});
