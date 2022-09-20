import mongoose from "mongoose"

async () => {

	try {
		await mongoose.connect(process.env.MONGODB_URI, async () => {
			console.log("db started");
			// to add run seed here
		});
	} catch (e) {
		console.error("dbconnect", "failed")
	}

};


const AppSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
})

export const AppModel = mongoose.model("app", AppSchema) 