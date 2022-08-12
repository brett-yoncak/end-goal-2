//top-bar message

const getDate = () => {
const date = new Date()
let dayNumber = date.getDay()
let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let dayName = dayNames[dayNumber]

return dayName
}

export default getDate()