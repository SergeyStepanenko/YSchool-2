export default function properTime(fromSeconds) {
    const minutes = new Date(+fromSeconds).getMinutes();

	return new Date(+fromSeconds).getHours() + ":" + ((minutes.toString().length == 1) ? minutes + "0" : minutes);
};
