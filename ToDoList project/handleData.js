const colors = require("colors");
const fs = require("fs");

const handleData = (type, title) => {
  //type - number (1 - add, 2 - remove, 3 - list)
  // title (string || null)
  const data = fs.readFileSync("database.json");
  let tasks = JSON.parse(data);
  //console.log(tasks);

  if (type === 1 || type === 2) {
    const isExisted = tasks.find((task) => task.title === title) ? true : false;
    if (type === 1 && isExisted) {
      return console.log("This task is already on your list!".red);
    } else if (type === 2 && !isExisted) {
      return console.log("I cant delete task which doesnt exist");
    }
  }

  let dataJSON = "";
  switch (type) {
    case 1:
      //przebudowa tablicy
      // console.log(tasks);
      tasks = tasks.map((task, index) => ({
        id: index + 1,
        title: task.title,
      }));
      // console.log(tasks);
      const id = tasks.length + 1;
      tasks.push({ id, title });
      // console.log(tasks);
      dataJSON = JSON.stringify(tasks);
      // console.log(dataJSON);
      fs.writeFileSync("database.json", dataJSON);
      console.log(`Adding.. ${title}`.white.bgGreen);
      break;

    case 2:
      const index = tasks.findIndex((task) => task.title === title);
      //   console.log("usuwam zadanie");
      tasks.splice(index, 1);
      // przebudowa
      tasks = tasks.map((task, index) => ({
        id: index + 1,
        title: task.title,
      }));
      console.log(tasks);
      dataJSON = JSON.stringify(tasks);
      fs.writeFile("database.json", dataJSON, "utf8", (err) => {
        if (err) throw err;
        console.log(`Task ${title} is now deleted`.black.bgGreen);
      });

      break;

    case 3:
      console.log(`Task list: ${tasks.length} . You must make `);
      if (tasks.length) {
        tasks.forEach((task, index) => {
          if (index % 2) return console.log(task.title.green);
          return console.log(task.title.yellow);
        });
      }
      break;
  }
};

module.exports = handleData;
