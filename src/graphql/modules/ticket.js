import { gql } from 'apollo-server-express';
import TicketModel from '../../models/ticket';

export const typeDefs = gql`
  enum TicketStatus {
    open
    closed
  }
  type Ticket {
    _id: ID
    title: String!
    assignee: String!
    reporter: String
    status: TicketStatus
    created_at: Date!
  }
  input TicketInput {
    title: String!
    assignee: String!
  }
  extend type Query {
    ticket(ticketId: ID!): Ticket
    tickets: [Ticket]
  }
  extend type Mutation {
    addTicket(input: TicketInput): Ticket!
    updateTicket(ticketId: ID!, input: TicketInput!): Ticket!
    removeTicket(ticketId: ID!): Boolean!
  }
`;

export const resolvers = {
  Query: {
    tickets: async () => {
      const tickets = await TicketModel.find({}, {}, { sort: { created_at: -1 } }).lean();
      return tickets;
    },
    ticket: async (root, { ticketId }) => {
      const ticket = await TicketModel.findOne({ _id: ticketId }).lean();
      return ticket;
    },
  },
  Mutation: {
    addTicket: async (root, { input: { title, assignee } }) => {
      const ticket = await new TicketModel({
        title,
        assignee,
        status: 'open',
        created_at: new Date(),
        created_by: 'guest',
      }).save();
      return ticket;
    },
    removeTicket: async (root, { ticketId }) => {
      const res = await TicketModel.deleteOne({ _id: ticketId });
      return res.ok;
    },
    updateTicket: async (root, { ticketId, input: { title, assignee } }) => {
      await TicketModel.updateOne({ _id: ticketId }, { title, assignee });
      const newTicket = await TicketModel.findOne({ _id: ticketId });
      return newTicket;
    },
  },
};
