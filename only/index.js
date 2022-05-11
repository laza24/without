// your code start here..
let input = process.argv.slice(2)
const Controller = require('./Controllers/controller')

switch (input[0]) {
    case 'list':
        Controller.list()
        break
    case 'addBank':
        Controller.addBank(input[1], input[2])
        break
    case 'deleteBank':
        Controller.deleteBank(input[1])
        break
    case 'addCustomer':
        Controller.addCustomer(input[1], input[2], input[3], input[4])
        break
    case 'deleteCustomer':
        Controller.deleteCustomer(input[1], input[2])
        break
    case 'detail':
        Controller.detail(input[1])
        break
}
