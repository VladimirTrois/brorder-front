const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function capitalizeEachWord(sentence){
    const words = sentence.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    sentence = words.join(" ");
    return sentence;
}

function getTomorrowsDate() {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
}

export function getTomorrowString(){
    let options = { weekday: 'long', month: 'long', day: 'numeric' };

    const tomorrow = getTomorrowsDate();
    const tomorrowString = tomorrow.toLocaleDateString('fr-FR', options);


    return capitalizeEachWord(tomorrowString);
}