const fs = require('fs')
const { Bank, Customer } = require('./class')

class Model {
    static saveJSON(data, callback) {
        fs.writeFile('./data.json', JSON.stringify(data, null, 4), (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }
    static readBank(callback) {
        fs.readFile('./data.json', 'utf-8', (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                data = JSON.parse(data)
                data = data.map(({ id, name, type, customers }) =>
                    Bank.createBank(id, name, type, customers)
                )
                callback(null, data)
            }
        })
    }
    static createBank(bankName, bankType, callback) {
        this.readBank((err, data) => {
            if (err) {
                callback(err, null)
            } else {
                const lastId = data.length ? data[data.length - 1].id + 1 : 1
                const newBank = Bank.createBank(lastId, bankName, bankType, [])
                data.push(newBank)
                data.forEach((bank) => {
                    delete bank.limit
                })
                this.saveJSON(data, (err) => {
                    if (err) {
                        callback(err, null)
                    } else {
                        callback(null, newBank)
                    }
                })
            }
        })
    }

    static deleteBank(bankId, callback) {
        this.readBank((err, data) => {
            if (err) {
                callback(err, null)
            } else {
                const deletedBank = data.filter(
                    (bank) => bank.id === +bankId
                )[0]
                if (deletedBank) {
                    const newData = data.filter((bank) => bank.id !== +bankId)
                    newData.forEach((bank) => {
                        delete bank.limit
                    })
                    this.saveJSON(newData, (err) => {
                        if (err) {
                            callback(err, null)
                        } else {
                            callback(null, deletedBank)
                        }
                    })
                } else {
                    callback(null, deletedBank)
                }
            }
        })
    }

    static addCustomer(bankId, name, ktp, depositAmount, callback) {
        this.readBank((err, data) => {
            if (err) {
                callback(err, null)
            } else {
                let check = false
                const newCustomer = new Customer(name, ktp, depositAmount)
                data.forEach((bank) => {
                    if (bank.id === +bankId) {
                        if (bank.customers.length < bank.limit) {
                            bank.customers.push(newCustomer)
                            check = true
                        }
                    }
                    delete bank.limit
                })
                if (check) {
                    this.saveJSON(data, (err) => {
                        if (err) {
                            callback(err, null)
                        } else {
                            callback(null, newCustomer)
                        }
                    })
                } else {
                    callback(null, check)
                }
            }
        })
    }

    static deleteCustomer(bankId, ktp, callback) {
        this.readBank((err, data) => {
            if (err) {
                callback(err, null)
            } else {
                let deletedCustomer = null
                data.forEach((bank) => {
                    if (bank.id === +bankId) {
                        deletedCustomer = bank.customers.filter(
                            (customer) => customer.ktp === ktp
                        )[0]
                        bank.customers = bank.customers.filter(
                            (customer) => customer.ktp !== ktp
                        )
                    }
                    delete bank.limit
                })

                this.saveJSON(data, (err) => {
                    if (err) {
                        callback(err, null)
                    } else {
                        callback(null, deletedCustomer)
                    }
                })
            }
        })
    }

    static detail(bankId, callback) {
        this.readBank((err, data) => {
            if (err) {
                callback(err, null)
            } else {
                let bank = data.filter((bank) => bank.id === +bankId)[0]
                callback(null, bank)
            }
        })
    }
}

module.exports = Model
