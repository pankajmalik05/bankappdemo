import {updateUserInfo} from '../authActions';

it('Update User Info', async () => {
  let data = await updateUserInfo({
    userId: 'Q',
    password: '1',
    lastLoggedIn: '10/5/2020',
    info: {
      osName: 'android',
      deviceName: 'n/a',
      macAddress: 'n/a',
      imei: 'n/a',
      location: {long: 1, latt: 1},
      publicIP: 'xyz.xyz.x.x',
    },
  });
  expect(data.success).toEqual(true);
});
