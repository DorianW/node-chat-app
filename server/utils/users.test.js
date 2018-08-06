const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '123',
        name: 'Dorian',
        room: 'Gaming'
      },
      {
        id: '2',
        name: 'Flo',
        room: 'Gaming'},
      {
        id: '3',
        name: 'Jan',
        room: 'Coding'
      }
    ]
  })

  it('should add user', () => {
    var users = new Users();
    var user = {id: '123', name: 'Dorian', room:'Gaming'};
    var responseUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should get users for specific room 1', () => {
    var usersList = users.getUserList('Gaming');
    expect(usersList).toEqual(['Dorian','Flo']);
  });

  it('should get users for specific room 2', () => {
    var usersList = users.getUserList('Coding');
    expect(usersList).toEqual(['Jan']);
  });

  it('should remove user', () => {
    var resultUser = users.removeUser('2');
    expect(resultUser).toEqual({
      id: '2',
      name: 'Flo',
      room: 'Gaming'
    });
    expect(users.users).toEqual([
      {
        id: '123',
        name: 'Dorian',
        room: 'Gaming'
      },
      {
        id: '3',
        name: 'Jan',
        room: 'Coding'
      }
    ]);
  });

  it('should not remove user', () => {
    var resultUser = users.removeUser('222');
    expect(resultUser).toEqual(undefined);
    expect(users.users).toEqual([
      {
        id: '123',
        name: 'Dorian',
        room: 'Gaming'
      },
      {
        id: '2',
        name: 'Flo',
        room: 'Gaming'},
      {
        id: '3',
        name: 'Jan',
        room: 'Coding'
      }
    ]);
  });

  it('should find user', () => {
    var user = users.getUser('123');
    expect(user).toEqual({
      id: '123',
      name: 'Dorian',
      room: 'Gaming'
    });
  });

  it('should not find user', () => {
    var user = users.getUser('222');
    expect(user).toEqual(undefined);
  });

});
