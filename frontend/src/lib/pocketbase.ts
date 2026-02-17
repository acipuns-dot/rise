import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');

// Setting up a global instance for the app
export default pb;

// Helper to check if user is logged in
export const isAuthenticated = () => pb.authStore.isValid;

// Helper to get current user
export const currentUser = () => pb.authStore.model;
