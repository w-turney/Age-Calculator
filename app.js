const form = document.getElementById('form')
const day = document.getElementById('day')
const month = document.getElementById('month')
const year = document.getElementById('year')
const daySpan = document.getElementById('dayspan')
const monthSpan = document.getElementById('monthspan')
const yearSpan = document.getElementById('yearspan')
const spans = document.querySelectorAll('.hidden')
const button = document.getElementById('button')
const dashes = document.getElementsByClassName('dash')
const results = document.querySelectorAll('.result')

let validDay;


const calculate = () => {
    
    clearErrors();

    const now = new Date();
    const dob = new Date(`${month.value}-${day.value}-${year.value}`)

    checkDay(day.value, month.value)

    if (now.getTime() > dob.getTime() && validDay) {
        getAge(now, dob)
    } else {
        invalid()
    }
}


const checkDay = (day, month) => {
    validDay = true;
    if (day < 1 || day > 31) {
        validDay = false
    } else {
        switch (month) {
            case '04':
            case '06':
            case '09':
            case '11':
                if (day > 30) {
                    validDay = false
                }
                break;
            case '02':
                if (day > 29) {
                    validDay = false
                }
                break;
        }
    }
}

//changes input border and form font to red
const invalid = () => {
    Array.from(document.getElementsByTagName('input')).forEach(input => input.style.border = 'solid red 1px');
    form.style.color = 'red';
    yearSpan.textContent = 'Must be in the past';
    monthSpan.textContent = 'Must be valid month';
    daySpan.textContent = 'Must be valid day';
}

//clears form error messages
const clearErrors = () => {
    Array.from(document.getElementsByTagName('input')).forEach(input => input.style.border = 'solid lightgrey 1px');
    form.style.color = 'hsl(0, 1%, 44%)';
    Array.from(spans).forEach(span => span.textContent = '')
}

//calculates age
const getAge = (x, y) => {
    const ageDiff = (x.getTime() - y.getTime()) / 8.64e+7; //difference in days
    const years = Math.floor(ageDiff / 365.242374)
    const months = Math.floor((ageDiff % (years * 365.242374)) / 30.4368645)
    const days = Math.floor(ageDiff - (years * 365.242374) - (months * 30.4368645))
    displayAge(years, months, days)
}

const displayAge = (...args) => {
    Array.from(dashes).forEach(dash => dash.remove());
    Array.from(results).forEach((elem, index) => elem.textContent = args[index])
}

button.addEventListener('click', calculate)