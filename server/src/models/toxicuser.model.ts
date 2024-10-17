/**
 * Defines the User model for the database and also the interface to
 * access the model in TypeScript.
 */
import mongoose from 'mongoose';

const ToxicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  nameEmoji: {
    type: String,
    required: false,
  },
 year: {
    type: Number,
    required: false
  },
  hometown: {
    type: String,
    required: false,
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
    required: false,
  },
  // photo: {
  //   type: String,
  //   required: false
  // }
});

interface IToxic extends mongoose.Document {
  _id: string;
  name: string;
  lastName: string;
  nameEmoji: string;
  year: Number;
  hometown: string;
  // major: string;
  birthday: string;
  toxicTraits: [String];
  // photo: string
}

const Toxic = mongoose.model<IToxic>('Toxic', ToxicSchema);

export { IToxic, Toxic };
