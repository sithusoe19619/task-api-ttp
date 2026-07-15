const { db, User, Task } = require("./models")

async function seed() {

    await db.sync({ force: true})

    const alex = await User.create({
        name: "Alex",
        email: "dumbAlex69@gmail.com",
        password: "supersecret"
    })

    const jones = await User.create({
        name: "Jones",
        email: "dumbjones69@gmail.com",
        password: "supersupersecret"
    })

await Task.create({ title: "Write project proposal", priority: 3, status: "todo", UserId: alex.id });
await Task.create({ title: "Review pull requests", priority: 2, status: "doing", UserId: alex.id });
await Task.create({ title: "Water the plants", priority: 1, status: "done", UserId: alex.id });


await Task.create({title: "Buy groceries", priority: 2, status: "todo", UserId: sam.id});
await Task.create({title: "Finish homework", priority: 3, status: "doing", UserId: sam.id});

    console.log("Seeded!");
    await db.close();
}

seed();
