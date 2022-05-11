const Model = require('../Models/model')
const View = require('../Views/view')

class Controller {
    static list() {
        Model.readBank((err, data) => {
            if (err) {
                View.showError(err)
            } else {
                View.read(data)
            }
        })
    }
    static addBank(bankName, bankType) {
        Model.createBank(bankName, bankType, (err, data) => {
            if (err) {
                View.showError(err)
            } else {
                View.successAddBank(data)
            }
        })
    }

    static deleteBank(bankId) {
        Model.deleteBank(bankId, (err, data) => {
            if (err) {
                View.showError(err)
            } else {
                if (data) {
                    View.successDeleteBank(data)
                } else {
                    View.bankNotFound(bankId)
                }
            }
        })
    }

    static addCustomer(bankId, name, ktp, depositAmount) {
        Model.addCustomer(bankId, name, ktp, depositAmount, (err, data) => {
            if (err) {
                View.showError(err)
            } else {
                if (data) {
                    View.successAddCustomer(data)
                } else {
                    View.limitExceeded()
                }
            }
        })
    }

    static deleteCustomer(bankId, ktp) {
        Model.deleteCustomer(bankId, ktp, (err, data) => {
            if (err) {
                View.showError(err)
            } else {
                if (data) {
                    View.successDeleteCustomer(data)
                } else {
                    View.customerNotFound(ktp)
                }
            }
        })
    }
    static detail(bankId) {
        Model.detail(bankId, (err, data) => {
            if (err) {
                View.showError(err)
            } else {
                View.detail(data)
            }
        })
    }
}

module.exports = Controller
