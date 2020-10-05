import {signup} from '../authActions';

it('Signup with credencials', async () => {
  let data = await signup({userId: 'T', password: '1'});
  expect(data.success).toEqual(true);
});
