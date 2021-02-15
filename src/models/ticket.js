import mongoose from 'mongoose';

const { Schema } = mongoose;

export const OPEN = 'open';
export const CLOSED = 'closed';

export const TicketSchema = new Schema({
  title: { type: String, required: true },
  assignee: String,
  status: { type: String, enum: [OPEN, CLOSED] },
  created_by: String,
  created_at: Date,
  updated_at: Date,
  updated_by: String,
});

const TicketModel = mongoose.model('tickets', TicketSchema);

export default TicketModel;
