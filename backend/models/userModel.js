import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

//  Base user model
//  Will be extended by Patient and Doctor models

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		shippingAddress: {
			address: String,
			city: String,
			postalCode: Number,
			country: String,
		},
		role: {
			type: String,
			required: true,
		},
		roleId: {
			type: mongoose.Schema.Types.ObjectId,
		},
	},
	{
		timestamps: true,
	}
);

// method to compare entered password with saved password
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
	// this conditional checks if the user is modifing
	// only username and/or email without modifing password
	// and hence prevents re-hashing of the already hashed password
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model('User', userSchema);
