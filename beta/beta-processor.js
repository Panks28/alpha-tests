require("core-js"); // <- at the top of your entry point
const _ = require("lodash");
const winston = require("winston");

const processData = (data) => {
  let resultObj = {
    records: [],
    top: [],
  };

  function sortStudents(array, prop) {
    return array.reduce(function (accum, value) {
      let key = value[prop];
      if (!accum[key]) {
        accum[key] = [];
      }

      value.title = value.name.first + " " + value.name.last;
      let TotalMarks = 0;
      for (let i = 0; i < value.marks.length; i++) {
        if (value.marks[i].marks > 15) {
          TotalMarks = TotalMarks + value.marks[i].marks;
        }
      }
      value.totalMarks = TotalMarks;
      accum[key].push(value);
      return accum;
    }, {});
  }

  const Data = sortStudents(data, "class");

  const recordKeys = Object.keys(Data);
  const recordValues = Object.values(Data).sort(
    (a, b) => b.TotalMarks - a.TotalMarks
  );

  for (let i = 0; i < Object.keys(Data).length; i++) {
    const recordObject = {};
    recordObject.name = recordKeys[i];
    recordObject.students = recordValues[i];
    resultObj.records.push(recordObject);
  }

  const totalNumberArray = [];

  for (let i = 0; i < resultObj.records.length; i++) {
    for (let j = 0; j < resultObj.records[i].students.length; j++) {
      let obj = {};
      obj.title = resultObj.records[i].students[j].title;
      obj.class = resultObj.records[i].students[j].class;
      obj.totalMarks = resultObj.records[i].students[j].totalMarks;
      totalNumberArray.push(obj);
    }
  }

  totalNumberArray.sort((a, b) => b.totalMarks - a.totalMarks);

  for (let i = 0; i < totalNumberArray.length; i++) {
    resultObj.top.push(
      totalNumberArray[i].title +
        " from " +
        totalNumberArray[i].class +
        " obtained " +
        totalNumberArray[i].totalMarks
    );
  }

  // 281416

  // 171974276

  for (let i = 0; i < resultObj.records.length; i++) {
    resultObj.records[i].students.sort((a, b) => b.totalMarks - a.totalMarks);
  }

  return resultObj;
};

module.exports = {
  processData,
};
