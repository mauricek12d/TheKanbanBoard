import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import { getToken } from './authAPI';

const API_BASE_URL = import.meta.env.VITE_API_URL + '/api/tickets';

const retrieveTickets = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}` 
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`❌ API Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error('❌ Error from data retrieval:', err);
    return [];
  }
};

const retrieveTicket = async (id: number | null): Promise<TicketData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`❌ API Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error('❌ Error from data retrieval:', err);
    return Promise.reject('Could not fetch singular ticket');
  }
};

const createTicket = async (body: TicketData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`❌ API Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error('❌ Error from Ticket Creation:', err);
    return Promise.reject('Could not create ticket');
  }
};

const updateTicket = async (ticketId: number, body: TicketData): Promise<TicketData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`❌ API Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error('❌ Update did not work:', err);
    return Promise.reject('Update did not work');
  }
};

const deleteTicket = async (ticketId: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${ticketId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`❌ API Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error('❌ Error in deleting ticket:', err);
    return Promise.reject('Could not delete ticket');
  }
};

export { createTicket, deleteTicket, retrieveTickets, retrieveTicket, updateTicket };
