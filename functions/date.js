import { format } from 'date-fns';

const weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function capitalizeEachWord(sentence) {
  const words = sentence.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  sentence = words.join(' ');
  return sentence;
}

export function todayDate() {
  const todayDate = new Date();
  return todayDate;
}

//return tomorrow's date
export function tomorrowDate() {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
}

//format date to YYYY-MM-DD
export function formatDate(date) {
  return format(date, 'yyyy-MM-dd');
}

export function getDateWritten(date) {
  let options = { weekday: 'long', month: 'long', day: 'numeric' };
  const dateString = date.toLocaleDateString('fr-FR', options);
  return capitalizeEachWord(dateString);
}
