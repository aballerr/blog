const expect = require('chai').expect;
const Sequelize = require('sequelize');
const generator = require('./generator');
/* personal imports */
const config = require('../config/config').development;
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config);
const User = require('../models/user')(sequelize, Sequelize);
const Post = require('../models/post')(sequelize, Sequelize, User);





describe('A test for posts', () => {
  it('should create a post', async () => {

    await Post.sync({
      force: true
    });

    let user = generator.generateUser();

    let res = await User.addUser(user);
    let id = res.get('id');
    let post = {
      title: 'harry potter',
      post: `lots of random but also probably important information 
      that's really not that important`,
      userId: id
    };

    let postRes = await Post.addPost(post);
    expect(postRes.get('title')).to.equal('harry potter');
  });

  it('should not create a post with empty title', (done) => {

    let post = generator.generatePost('');
    Post.addPost(post)
      .then(() => done(
        new Error('shouldn\'t be creating a post with empty values')
      ))
      .catch(() => done());

  });

  it('should not be able to user a user id that doesn\'t exist', (done) => {
    let post = generator.generatePost(undefined, undefined, 1000);

    Post.addPost(post)
      .then(() => done(new Error('Post should not have been added')))
      .catch(() => done());
  });


});
