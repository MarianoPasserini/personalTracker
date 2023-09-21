
// DECLARE DOM VARIABLES TO WORK IN JS
const months = document.querySelectorAll('.month-item'); // Add a dot before REMEMBER!!!!
const monthGrid = document.querySelector('.month-grid');
const daysList = document.querySelectorAll('.days-list');
const daysName = document.querySelectorAll('.days-name-li');
const year = document.querySelector('.year');

let currentMonth = -1; // variable to know if a month is active or not

months.forEach((month, index) => { // Adding an event listener to each month
    month.addEventListener('click', () => {
        months.forEach((item) => {
            if(item !== month){ // If the month is not the one clicked, it will be hidden
                item.classList = 'month-item-none';
            }
        });
        if(currentMonth === -1){
            // If there is no month active, the month clicked will be active
            currentMonth = index;
            monthGrid.classList = 'month-grid-active';
            month.classList = 'month-item-active';
            daysList[index].classList = 'days-list-active';
            daysName[index].classList = 'days-name-li-active';
        }
    });
});

const resetView = () => { // Function to reset the view of the calendar
    months.forEach((month) => { // Set everything back to normal
        month.classList = 'month-item';
        daysList[currentMonth].classList = 'days-list';
        daysName[currentMonth].classList = 'days-name-li';
    });
    monthGrid.classList = 'month-grid';
    currentMonth = -1; // reset our tracker
}

const monthsOfCalendar = [...Array(12).keys()]; // Array of 12 months
let actualYear = 2023 // Year to be displayed

const intl = new Intl.DateTimeFormat("es-ES", {month: 'long'})

const calendar = monthsOfCalendar.map(monthKey => {
  return {
    daysOfMonth: new Date(actualYear, monthKey + 1, 0).getDate(),
    startsOn: new Date(actualYear, monthKey, 0).getDay()
  }
})

const html = calendar.map(({daysOfMonth}) => {
    const renderDays = [...Array(daysOfMonth).keys()].map(day => {
        return `<li>${day + 1}</li>`
    }).join('')
  return `
    ${renderDays}
`
})


document.querySelectorAll('.days-list').forEach((list, index) => {
    list.innerHTML = html[index]; // Set the HTML content first
    const dayItems = list.querySelectorAll('li'); // Get all the li elements

    // Apply grid-column-start to each li element
    dayItems.forEach((dayItem, dayIndex) => {
        dayItem.style.gridColumnStart = (dayIndex + 1 + calendar[index].startsOn) % 7 || 7;
    });
});

const yearBefore = () => {
    actualYear--;
    document.querySelector('.year').innerHTML = actualYear;
    updateCalendar();
}

const yearAfter = () => {
    actualYear++;
    document.querySelector('.year').innerHTML = actualYear;
    updateCalendar();
}

//update calendar according to actualYear

const updateCalendar = () => {
    const calendar = monthsOfCalendar.map(monthKey => {
        return {
          daysOfMonth: new Date(actualYear, monthKey + 1, 0).getDate(),
          startsOn: new Date(actualYear, monthKey, 0).getDay()
        }
      })
      
      const html = calendar.map(({daysOfMonth}) => {
          const renderDays = [...Array(daysOfMonth).keys()].map(day => {
              return `<li>${day + 1}</li>`
          }).join('')
        return `
          ${renderDays}
      `
      })
      
      
      document.querySelectorAll('.days-list').forEach((list, index) => {
          list.innerHTML = html[index]; // Set the HTML content first
          const dayItems = list.querySelectorAll('li'); // Get all the li elements
      
          // Apply grid-column-start to each li element
          dayItems.forEach((dayItem, dayIndex) => {
              dayItem.style.gridColumnStart = (dayIndex + 1 + calendar[index].startsOn) % 7 || 7;
          });
      });
}