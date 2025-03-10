import { Inngest } from "inngest";

import User from "@/models/User";
import connectDb from "./db";


// Create a client to send and receive events
export const inngest = new Inngest({ id: "atelier-shop" });


//Inngest Function for save user data to database
export const syncUserCreation = inngest.createFunction(
    { id: 'sync-user-from-clerk' },
    { event: 'clerk/user.created' },
    async({event}) => {
        const { id, first_name, last_name, email_addresses, image_url } = await connectDb(); // Asegurar la conexión antes de operar

        if (!event.data) {
            console.error("No event data received.");
            return;
        }

        if (!id || !first_name || !last_name || !email_addresses?.length) {
            console.error("Missing required user data.");
            return;
        }

        const userData = {
            _id: id,
            name: first_name + ' ' + last_name,
            email: email_addresses[0].email_address,
            imageUrl: image_url,
        }
        try {
            await User.create(userData);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }
)
export const syncUserUpdation = inngest.createFunction(
    { id: 'sync-user-updation-from-clerk' },
    { event: 'clerk/user.updated' },
    async ({ event }) => {
        await connectDb();

        if (!event.data) {
            console.error("No event data received.");
            return;
        }

        const { id, first_name, last_name, email_addresses, image_url } = event.data;

        if (!id) {
            console.error("User ID is missing.");
            return;
        }

        const userData = {
            name: `${first_name} ${last_name}`,
            email: email_addresses?.[0]?.email_address || "",
            image: image_url || "",
        };

        try {
            await User.findByIdAndUpdate(String(id), userData);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }
);
//Inngest Function for delete user data to database
// Función para eliminar usuarios
export const syncUserDeletion = inngest.createFunction(
    { id: 'delete-user-from-clerk' },
    { event: 'clerk/user.deleted' },
    async ({ event }) => {
        await connectDb();

        if (!event.data) {
            console.error("No event data received.");
            return;
        }

        const { id } = event.data;

        if (!id) {
            console.error("User ID is missing.");
            return;
        }

        try {
            await User.findByIdAndDelete(String(id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }
);
