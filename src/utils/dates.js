function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function localeDate(date) {
    const _date = new Date(date);
    // const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    // return _date.toLocaleDateString('en-GB')
    return [
        padTo2Digits(_date.getDate()),
        padTo2Digits(_date.getMonth() + 1),
        _date.getFullYear(),
      ].join('/');
}
  
export function getDateFilename(date, format) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    //' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join('')
  );
}

