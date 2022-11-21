
export const getDataFromQrCode = async (data) => {
    try {
        const items = data.split("*");
        console.log("transaction items",items)
        let _transaction = {}
        if(items.length > 1 ){
            const aux =  items.map( i => {
                const data = i.split(':');
                const key = data[0]
                const value = data[1]
                _transaction = {..._transaction, [`${key}`]:value}
                return 
            })
            const date = _transaction.F
            const year = date.substring(0,4)
            const month = date.substring(4,6)
            const day = date.substring(6,8)
            const newDate = `${day}/${month}/${year}`
            const transaction = {type: 'expense',transaction_date: newDate, amount: _transaction.O}
            return transaction
        }
        else{
            return null
        }
    } catch(error) {
        console.log(error);
    }
}