import express from 'express';
import { 
    getAllTickets, 
    getTicketById, 
    createTicket, 
    updateTicket, 
    deleteTicket 
} from '../../controllers/ticket-controller.js';

const router = express.Router();

// Route to get all tickets
router.get('/', getAllTickets);

// Route to get a specific ticket by ID
router.get('/:id', getTicketById);

// Route to create a new ticket
router.post('/', createTicket);

// Route to update a ticket by ID
router.put('/:id', updateTicket);

// Route to delete a ticket by ID
router.delete('/:id', deleteTicket);

export { router as ticketRouter };
