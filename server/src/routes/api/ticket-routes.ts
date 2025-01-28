import express, { Request, Response } from 'express';
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from '../../controllers/ticket-controller.js';
import { Ticket } from '../../models/ticket.js';
import { User } from '../../models/user.js';

const router = express.Router();

// GET /tickets - Get all tickets

router.get('/', async (_req: Request, res: Response) => {
  try {
    const tickets = await Ticket.findAll({
      include: [
        {
          model: User,
          as: 'assignedTicket', 
          attributes: ['volunteerName'], 
        },
      ],
    });
    res.json(tickets);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get('/', getAllTickets);

// GET /tickets/:id - Get a ticket by id

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignedVolunteer', 
          attributes: ['volunteerName'],
        },
      ],
    });
    if(ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({
        message: 'Work not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get('/:id', getTicketById);

// POST /tickets - Create a new ticket

router.post('/', async (req: Request, res: Response) => {
  const { name, status, description, assignedUserId } = req.body;
  try {
    const newTicket = await Ticket.create({
      name, status, description, assignedUserId
    });
    res.status(201).json(newTicket);
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
});

router.post('/', createTicket);

// PUT /tickets/:id - Update a ticket by id

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, status, description, assignedUserId } = req.body;
  try {
    const ticket = await Ticket.findByPk(id);
    if(ticket) {
      ticket.name = name;
      ticket.status = status;
      ticket.description = description;
      ticket.assignedUserId = assignedUserId;
      await ticket.save();
      res.json(ticket);
    } else {
      res.status(404).json({
        message: 'Work not found'
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
});

router.put('/:id', updateTicket);

// DELETE /tickets/:id - Delete a ticket by id

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id);
    if(ticket) {
      await ticket.destroy();
      res.json({ message: 'Work deleted' });
    } else {
      res.status(404).json({
        message: 'Work not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.delete('/:id', deleteTicket);

export { router as ticketRouter };
