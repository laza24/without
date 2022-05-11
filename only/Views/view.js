class View {
    static showError(err) {
        console.log(err)
    }

    static read(instances) {
        console.log(instances)
    }
    static successAddBank(instance) {
        console.log(`Bank ${instance.name} add successfully`)
    }
    static successDeleteBank(instance) {
        console.log(`Bank ${instance.name} deleted successfully`)
    }
    static successAddCustomer(instance) {
        console.log(`Customer ${instance.name} added successfully`)
    }
    static successDeleteCustomer(instance) {
        console.log(`Customer ${instance.name} deleted successfully`)
    }
    static detail(instance) {
        let result = []
        instance.customers.forEach((customer) => {
            let obj = {
                name: customer.name,
                ktp: customer.ktp,
                depositAmount: customer.depositAmount,
            }
            result.push(obj)
        })
        console.table(result)
    }
    static bankNotFound(bankId) {
        console.log(`Bank with id ${bankId} is not found`)
    }

    static customerNotFound(ktp) {
        console.log(`Customer with ktp ${ktp} is not found`)
    }

    static limitExceeded() {
        console.log(`You can't add more Customer to this Bank`)
    }
}

module.exports = View
