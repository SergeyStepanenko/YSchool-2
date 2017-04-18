export default function convert(date) {
    const m = new Date(date).toLocaleString('ru', { month: 'long' });
    let n;

    (m === 'январь') ? n = 'января' : false;
    (m === 'февраль') ? n = 'февраля' : false;
    (m === 'март') ? n = 'марта' : false;
    (m === 'апрель') ? n = 'апреля' : false;
    (m === 'май') ? n = 'мая' : false;
    (m === 'июнь') ? n = 'июня' : false;
    (m === 'июль') ? n = 'июля' : false;
    (m === 'август') ? n = 'августа' : false;
    (m === 'сентябрь') ? n = 'сентября' : false;
    (m === 'октябрь') ? n = 'октября' : false;
    (m === 'ноябрь') ? n = 'ноября' : false;
    (m === 'декабрь') ? n = 'декабря' : false;

    return n
}
