import mongoose from "mongoose"

async () => {

	try {
		await mongoose.connect(process.env.MONGODB_URI, async () => {
			console.log("db started");
		});
	} catch (e) {
		console.error("dbconnect", "failed")
	}

};

let cache = global.mongoose

if (!cache)
	cache = global.mongoose = { conn: null, promise: null }

const connect = async () => {
	if (cache.conn)
		return cache.conn
	if (!cache.conn) {
		const options = {
			bufferCommands: false
		}
		cache.promise = mongoose.connect(process.env.MONGODB_URI, options).then((mongoose) => {
			console.log("db started");
			return mongoose
		}).catch(e => {
			console.error("dbconnect", "failed")
		})
	}

	cache.conn = await cache.promise
	return cache.conn
}

export default connect