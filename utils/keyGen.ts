import crypto from "crypto"
import AccessKey from "../models/AccessKey"

const keyGen = async () => {
    const newKey = crypto.randomUUID()
    const keyExists = await AccessKey.exists({
        key: newKey
    })

    if (keyExists)
        return keyGen()
    else
        return newKey
}

export default keyGen