import apiServerClient from './apiServerClient';

export const EmailService = {
  sendVerificationEmail: async (email) => {
    try {
      const response = await apiServerClient.fetch('/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  sendPasswordResetEmail: async (email) => {
    try {
      const response = await apiServerClient.fetch('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  sendLoginNotification: async (details) => {
    try {
      const response = await apiServerClient.fetch('/notifications/login', {
        method: 'POST',
        body: JSON.stringify(details)
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  sendTransactionNotification: async (details) => {
    try {
      const response = await apiServerClient.fetch('/notifications/transaction', {
        method: 'POST',
        body: JSON.stringify(details)
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  sendPropertyBookingNotification: async (details) => {
    try {
      const response = await apiServerClient.fetch('/notifications/property-booking', {
        method: 'POST',
        body: JSON.stringify(details)
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  sendSupportTicketNotification: async (details) => {
    try {
      const response = await apiServerClient.fetch('/notifications/support-ticket', {
        method: 'POST',
        body: JSON.stringify(details)
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  sendIncomeNotification: async (details) => {
    try {
      const response = await apiServerClient.fetch('/notifications/income', {
        method: 'POST',
        body: JSON.stringify(details)
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export default EmailService;