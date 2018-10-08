/* This file will be used to help generate random data */


/** Returns a random string of 6 characters [a-z0-9]
 * @param {number} - number of times you want to generate a string
 */
function generateRandomString(times = 1) {
  let str = '';

  for (let i = 0; i < times; i++) {
    str += Math.random().toString(36).substring(7);
  }

  return str;
}


// might delete this funciton
// async function getUserId(User) {
//   if (User === undefined) {
//     throw new Error('User in getUserId is undefined');
//   }

//   let users = await User.getAllUsers();

//   if (users.length) {
//     console.log(users[0].dataValues.id);
//     return users[0].dataValues.id;
//   }


//   return null;
// };




/** Generates a user objet
 * @param { string ?} passedEmail - OPTIONAL
 * @param { string ? } passedPassword - OPTIONAL
 */

module.exports.generateUser = function (
  passedEmail,
  passedPassword,
  userName = null,
  firstName = null,
  lastName = null
) {
  let email = passedEmail === undefined ?
    `${generateRandomString()}@yahoo.com` : passedEmail;

  let password = passedPassword === undefined ?
    generateRandomString(2) : passedPassword;

  return {
    email: email,
    password: password,
    userName: userName,
    firstName: firstName,
    lastName: lastName
  };
};


/**
 * Generates a random post
 * @param {string} title
 * @param {string} post
 * @param {number} id
 */
module.exports.generatePost = function (title, post, id = 1) {
  title = title === undefined ? generateRandomString(2) : title;
  post = post === undefined ? generateRandomString(4) : title;

  return {
    title: title,
    post: post,
    id: id
  };
};
