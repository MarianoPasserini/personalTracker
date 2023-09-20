
// DECLARE DOM VARIABLES TO WORK IN JS
const months = document.querySelectorAll('.month-item'); // Add a dot before REMEMBER!!!!
const monthGrid = document.querySelector('.month-grid');
const daysList = document.querySelectorAll('.days-list');

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
        }
    });
});

const resetView = () => { // Function to reset the view of the calendar
    months.forEach((month) => { // Set everything back to normal
        month.classList = 'month-item';
        daysList[currentMonth].classList = 'days-list';
    });
    monthGrid.classList = 'month-grid';
    currentMonth = -1; // reset our tracker
}

const monthsOfCalendar = [...Array(12).keys()]; // Array of 12 months
let actualYear = 2023 // Year to be displayed

const intl = new Intl.DateTimeFormat("en-US", {month: 'long'})

const calendar = monthsOfCalendar.map(monthKey => {
  const monthName = intl.format(new Date( actualYear, monthKey))
  return {
    daysOfMonth: new Date(actualYear, monthKey + 1, 0).getDate(),
    startsOn: new Date(actualYear, monthKey, 1).getDay()
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
    list.innerHTML = html[index]
    })




