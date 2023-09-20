const months = document.querySelectorAll('.month-item'); // Add a dot before 
const monthGrid = document.querySelector('.month-grid');
const daysList = document.querySelectorAll('.days-list');

let currentMonth = -1;

months.forEach((month, index) => {
    month.addEventListener('click', () => {
        months.forEach((item) => {
            if(item !== month){
                item.classList = 'month-item-none';
            }
        });
        if(currentMonth === -1){
            currentMonth = index;
            monthGrid.classList = 'month-grid-active';
            month.classList = 'month-item-active';
            daysList[index].classList = 'days-list-active';
        }
    });
});

const resetView = () => {
    months.forEach((month) => {
        month.classList = 'month-item';
        daysList[currentMonth].classList = 'days-list';
    });
    monthGrid.classList = 'month-grid';
    currentMonth = -1;
}

const monthsOfCalendar = [...Array(12).keys()];
let actualYear = 2023

const intl = new Intl.DateTimeFormat("en-US", {month: 'long'})

const calendar = monthsOfCalendar.map(monthKey => {
  const monthName = intl.format(new Date( actualYear, monthKey))
  return {
    daysOfMonth: new Date(actualYear, monthKey + 1, 0).getDate(),
    startsOn: 0
  }
})

const html = calendar.map(({daysOfMonth}) => {
    const renderDays = [...Array(daysOfMonth).keys()].map(day => {
        return `<li>${day + 1}</li>`
    }).join('')
  return `
  <ol style='list-style: none'>
    ${renderDays}
  </ol>`
})

document.querySelectorAll('.days-list').forEach((list, index) => {
    list.innerHTML = html[index]
    })



