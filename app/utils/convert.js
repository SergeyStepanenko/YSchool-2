export default function convert(date) {
    const m = new Date(date).toLocaleString('ru', { month: 'long' }).toLowerCase();
    let n;

    if (m === 'январь') n = 'января';
    if (m === 'февраль') n = 'февраля';
    if (m === 'март') n = 'марта';
    if (m === 'апрель') n = 'апреля';
    if (m === 'май') n = 'мая';
    if (m === 'июнь') n = 'июня';
    if (m === 'июль') n = 'июля';
    if (m === 'август') n = 'августа';
    if (m === 'сентябрь') n = 'сентября';
    if (m === '‎октябрь') n = '‎октября';
    if (m === 'октябрь') n = '‎октября'; // исправляю багу в IE/EDGE
    if (m === '‎ноябрь') n = 'ноября';
    if (m === 'ноябрь') n = 'ноября';
    if (m === 'декабрь') n = 'декабря';

    return n;
}
