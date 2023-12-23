require("core-js"); // <- at the top of your entry point
const _ = require("lodash");
const winston = require("winston");

const processData = (data) => {
  // let array1 = data.schools;
  // let array2 = data.members;

  // let newArray = data.members.reduce((acc, item) => {
  //   if (!item.teacher_id) {
  //     acc.push(item);
  //   }
  //   return acc;
  // }, []);

   // function myFunc(obj, prop) {
  //   return obj.reduce(function (acc, item) {
  //     let key = item[prop];
  //     if (key !== null) {
  //       if (!acc[key]) {
  //         acc[key] = [];
  //       }
  //       acc[key].push(item);
  //     }
  //     return acc;
  //   }, {});
  // }

  // let sortedArray = myFunc(array2, "teacher_id");

  // for (let i = 0; i < newArray.length; i++) {
  //   newArray[i].students = sortedArray[i + 1];
  // }

  // for (let i = 0; i < newArray.length; i++) {
  //   let sum = newArray[i].students.reduce((acc, item) => acc + item.marks, 0);
  //   newArray[i].marks = sum;
  // }

  // let sortedArraySchoolWise = myFunc(newArray, "school_id");

  // for (let i = 0; i < array1.length; i++) {
  //   array1[i].members = sortedArraySchoolWise[i + 1];
  // }

  // for (let i = 0; i < array1.length; i++) {
  //   let sum = array1[i].members.reduce((acc, item) => acc + item.marks, 0);
  //   array1[i].marks = sum;
  // }

  // array1.sort((a, b) => {
  //   return b.marks - a.marks;
  // });

  
 return  data.schools.reduce((accum,school) =>{
    let schoolMarks = 0;
    school.members = data.members.reduce((memberAccum, member)=>{
      if(school.id === Number(member.school_id)){
        if(!Number(member.teacher_id)){
          member.students=[];
          member.marks=0;
          memberAccum.push(member);
          return memberAccum;
        } else {
          memberAccum.map((item)=>{
            if(Number (item.id) === Number(member.teacher_id)){
              item.students.push(member);
              item.marks += member.marks;
              schoolMarks += member.marks;
            }
            return item.students.sort((a,b)=>{
              a.id < b.id ? 1 :-1
            });
          }).sort((a,b)=>{
            a.id < b.id ? 1 :-1
          })
        }
      }
      return memberAccum;
    },[])    
    school.marks = schoolMarks;
    accum.push(school);
    return accum 
  },[]).sort((a,b)=> {
    return a.marks < b.marks? 1 : -1
  })
};

module.exports = {
  processData,
};
