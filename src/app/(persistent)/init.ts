'use server';

import { initializeDatabase } from '../lib/db';

// Initialize the database when this module is imported
export async function initApp() {
  try {
    await initializeDatabase();
    console.log('Application initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('Error initializing application:', error);
    return { success: false, error };
  }
}

// Export a function that can be called to manually initialize the app
export default initApp;
