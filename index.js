// Setting employee records
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
  }


// settinf the time event with time in and time out
function createTimeInEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(" ");
  
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date: date,
    });
  
    return employee;
  }
  
  function createTimeOutEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(" ");
  
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date: date,
    });
  
    return employee;
  }

  //finding the number of hours worked based on time in and time out/
  function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find((event) => event.date === date);
  
    const timeInHour = timeInEvent.hour;
    const timeOutHour = timeOutEvent.hour;
  
    const hoursWorked = (timeOutHour - timeInHour) / 100;
  
    return hoursWorked;
  }
  // wages earned by the employee
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const payRate = employee.payPerHour;
    const wagesEarned = hoursWorked * payRate;
  
    return wagesEarned;
  }
  //wages earned by all emloyees
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map((event) => event.date);
    const totalWages = datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate(employee, date);
    }, 0);
  
    return totalWages;
  }
  function calculatePayroll(employees) {
    const totalPayroll = employees.reduce((total, employee) => {
      return total + allWagesFor(employee);
    }, 0);
  
    return totalPayroll;
  }