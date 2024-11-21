export const getResponseData = async (incomingResponse) => {
    if (incomingResponse.ok) {
        const hasilOk = await incomingResponse.json().then((res) => {
            return res
        })
        return {status: 'ok', response: hasilOk}
    } else {
        const hasil = await incomingResponse.json()
        return {status: 'error', response: hasil.error}
    }
}

export const getErrorApi = (code, msg) => {
    if (code === "P2002") {
        const strToArr = msg.split(" ")
        const err = strToArr[strToArr.length - 1]
        const apaYangSalah = err.split("_")[1]
        return `${apaYangSalah} already exists`
    } else {
        return "Something went wrong."
    }
}