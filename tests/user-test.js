const expect = require('chai').expect;
const generator = require('./generator');
const Sequelize = require('sequelize');
const config = require('../config/config').development;


const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const User = require('../models/user')(sequelize, Sequelize);



describe('Adding a user', () => {


  it('should be able to create a user', async () => {
    await sequelize.authenticate();
    await User.sync({
      force: true
    });
    let user = generator.generateUser();

    let response = await User.create(user);
    expect(response.get('email')).to.equal(user.email);
  });


  it('should not be able to create a user that doesn\'t supply a password',
    (done) => {
      let user = generator.generateUser('c@a.com', null);

      User.create(user)
        .then(() => done('created a user, when it shouldn\t have'))
        .catch(() => {
          done();
        });


    });

  it('shouldn\'t take an empty password', (done) => {
    let user = generator.generateUser('b@a.com', '');

    User.create(user)
      .then(() => done(new Error('allowed empty password')))
      .catch(() => {
        done();
      });
  });

  it('shouldn\'t take an empty email', (done) => {
    let user = generator.generateUser('');

    User.create(user)
      .then(() => done(new Error('failed, took an empty email')))
      .catch(() => {
        done();
      });
  });

  it('should be able to add other user stuff', async () => {
    let user = generator.generateUser(
      'c@c.com',
      'asdfadfhjkl;adsf',
      'bobbert123',
      'Alex',
      'Ball'
    );

    let response = await User.addUser(user);
    expect(response.get('firstName')).to.equal(user.firstName);
    expect(response.get('lastName')).to.equal(user.lastName);
    expect(response.get('userName')).to.equal(user.userName);
  });
});



describe('updating a user and it\' various variables', () => {
  it('should be able to update a user', (done) => {

    User.update({
        email: 'chickennuggets@gmail.com'
      }, {
        where: {
          id: 2
        }
      })
      .then((res) => {
        if (res > 0) {
          done();
        } else {
          done(new Error('Failed to update anything properly'));
        }
      })
      .catch((err) => {
        done(err);
      });
  });


  it('should be able to update multiple properties', (done) => {
    User.update({
        email: 'chickennuggetssss@gmail.com',
        userName: 'neo'
      }, {
        where: {
          id: 2
        }
      })
      .then((res) => {
        if (res > 0) {
          done();
        } else {
          done(new Error('Failed to update anything properly'));
        }
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should not be able to update an email to null', (done) => {
    User.update({
        email: null
      }, {
        where: {
          id: 1
        }
      })
      .then(() => {
        done(new Error("Updated user email with a null value"));
      })
      .catch(() => {
        done();
      });
  });

  it('should not be able to update an email to an empty value', (done) => {
    User.update({
      email: ''
    }, {
      where: {
        id: 1
      }
    })
    .then(() => {
      done(new Error('Updated user email to an empty value'));
    })
    .catch(() => {
      done();
    });
  });

});
