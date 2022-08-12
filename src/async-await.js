require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

// User.findByIdAndUpdate('62f5e29a7b86718c4b833ae8', {age: 28}).then((user) => {
//     console.log(user);
//     return User.countDocuments({age: 28});
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });

// Task.findByIdAndUpdate('62f5e7bbddc26a3cda6c3b53', {completed: true}).then((task) => {
//     console.log(task);
//     return Task.countDocuments({completed: true});
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });

// const updateAgeAndCount = async (id, age) =>{
//     const user = await User.findByIdAndUpdate(id, {age});
//     const count = await User.countDocuments({age});
//     return count;
// }

// updateAgeAndCount('62f5e29a7b86718c4b833ae8', 2).then((count) => {
//     console.log(count);
// }).catch((e) => {
//     console.log(e);
// });

const updateCompletedAndCount = async (id, completed) =>{
    const task = await Task.findByIdAndUpdate(id, {completed});
    const count = await Task.countDocuments({completed});
    return count;
}

updateCompletedAndCount('62f5e7bbddc26a3cda6c3b53', false).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});