export default function getProperDate(seconds) {
    let month = new Date(seconds).getMonth() + 1;
    if (month.toString().length === 1) {
        month = '0' + month;
    }

    let day = new Date(seconds).getDate();
    if (day.toString().length === 1) {
        day = '0' + day;
    }

    return new Date(seconds).getFullYear() + '-' + month + '-' + day;
}
