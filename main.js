let bar = Array.from(document.getElementsByClassName('bar'))
let days = Array.from(document.getElementsByClassName('day-bar'))

let listOfDays = ['sun','mon','tue','wed','thu','fri','sat']
let date = new Date()
let todaysDay = listOfDays[date.getDay()]

async function jsonData () {
    let response = await fetch('./data.json')
    let data = await response.json()
    let highest = highestAmount(data)

    for (let day of days){
        for(let info of data){
            if(day.dataset.day == info.day){
            day.style.height = `${info.amount * 140 / highest}px`
            }
            if(day.dataset.day === todaysDay){
                day.classList.add('cyan')
            }
        }
        day.addEventListener('mouseover', () =>{
            data.forEach(info => {
                if(day.dataset.day === info.day){
                    let amountDisplay = document.createElement('p')
                    amountDisplay.classList.add('amount')
                    amountDisplay.innerText = `$${info.amount}`
                    day.append(amountDisplay)
                }
            })
        })
        day.addEventListener('mouseleave', () =>{
            document.querySelector('.amount').remove()
        })
    }
}

function highestAmount (data) {
    let amountPerDay = data[0].amount
    for (let bits of data){
        if(bits.amount > amountPerDay){
            amountPerDay = bits.amount
        }
    }
   return amountPerDay
}
jsonData()