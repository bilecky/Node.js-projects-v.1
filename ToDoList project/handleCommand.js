const handleData = require("./handleData.js");

const handleCommand = ({ add, remove, list }) => {
  if (add) {
    if (typeof add !== "string") {
      return console.log("Enter task name".red);
    } else if (add.length < 7) {
      return console.log("Task name must have more than 6 letters ".red);
    }
    console.log("Task has been added");
    handleData(1, add);
  } else if (remove) {
    if (typeof remove !== "string" || remove.length < 7) {
      return console.log(
        "Enter task name. Only strings"
          .blue
      );
    }
    handleData(2, remove);
    console.log("Deleted");
  } else if (list || list === "") {
    handleData(3, null);
    console.log("List:");
  } else {
    console.log(
      "I dont understand. Please use --add'taskname', --remove='taskname or --list "
    );
  }
};

module.exports = handleCommand;
