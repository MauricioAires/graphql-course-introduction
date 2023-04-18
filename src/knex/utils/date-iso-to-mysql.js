

export const createDate = (dateISOString) => {
  let date;
  if (!dateISOString) {
    date = new Date();
  } else {
    date = new Date(dateISOString)
  }

  return date.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium',

  });

}

// 2018-12-24 22:26:04

export const dateISOtoMySQL = (dateISOString) => {
  const daeArg = createDate(dateISOString)

  const [date, time] = daeArg.split(' ')
  const [day, month, year] = date.split('/')

  return `${year}-${month}-${day} ${time}`
}
