export default function getProperDate(seconds) {
    let month = new Date(seconds).getMonth();
    if (month.toString().length === 1) {
        // month = '0' + (month + 1);
        month = (month + 1);
    }

    let day = new Date(seconds).getDate();
    // if (day.toString().length === 1) {
    //     day = '0' + day;
    // }

    return new Date(seconds).getFullYear() + '-' + month + '-' + day;
}
