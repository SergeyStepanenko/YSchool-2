export default function properTime(seconds) {
    const minutes = new Date(Number(seconds)).getMinutes();

    return new Date(Number(seconds)).getHours() + ':' + ((minutes.toString().length === 1) ? minutes + '0' : minutes);
}
