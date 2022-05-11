// code here for class release 0
class Bank {
    constructor(id, name, type, limit, customers) {
        this.id = id
        this.name = name
        this.type = type
        this.limit = limit
        this.customers = this.createCustomer(customers)
    }

    createCustomer(customers) {
        return customers.map(
            ({ name, ktp, depositAmount }) =>
                new Customer(name, ktp, depositAmount)
        )
    }

    static createBank(id, name, type, customers) {
        if (type === 'LocalBank') {
            return new LocalBank(id, name, customers)
        } else if (type === 'NationalBank') {
            return new NationalBank(id, name, customers)
        }
    }
}

class LocalBank extends Bank {
    constructor(id, name, customers) {
        super(id, name, 'LocalBank', 3, customers)
    }
}

class NationalBank extends Bank {
    constructor(id, name, customers) {
        super(id, name, 'NationalBank', 5, customers)
    }
}

class Customer {
    #ktp
    #depositAmount
    constructor(name, ktp, depositAmount) {
        this.name = name
        this.#ktp = ktp
        this.#depositAmount = +depositAmount
    }

    get ktp() {
        return this.#ktp
    }

    get depositAmount() {
        return this.#depositAmount
    }

    toJSON() {
        return {
            name: this.name,
            ktp: this.ktp,
            depositAmount: this.depositAmount,
        }
    }
}

module.exports = { Bank, Customer }
