/**
 * Defines the User model for the database and also the interface to
 * access the model in TypeScript.
 */
import mongoose from 'mongoose';

const ToxicSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  nameEmoji: {
    type: String,
    required: false,
  },
 year: {
    type: Number,
    required: true
  },
  hometown: {
    type: String,
    required: true,
  },
  toxicTraits: {
    type: [String],
    required: false
  },
//  major: {
//     type: String,
//     required: true,
//   }, 
  birthday: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false
  }
});

interface IToxic extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  nameEmoji: string;
  year: Number;
  hometown: string;
  // major: string;
  birthday: string;
  toxicTraits: [String];
  photo: string
}

const Toxic = mongoose.model<IToxic>('Toxic', ToxicSchema);

export { IToxic, Toxic };
