export function getCurrentDateTime() {
    const now = new Date();

    const options = {
        timeZone: 'Asia/Kolkata',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }

    return now.toLocaleString('en-IN', options);
}