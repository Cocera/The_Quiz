console.log('OK JS')

axios.get('https://opentdb.com/api.php?amount=10&category=20')
.then(question => console.log(question))
.catch(err => console.error(err,'ERROR'))