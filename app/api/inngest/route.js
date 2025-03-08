import { inngest, syncUserCreation, syncUserDeletion, syncUserUpdation } from "@/config/inngest";
import { serve } from "inngest/next";
// import { inngest } from "../../../inngest/client";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [      
      syncUserCreation,
      syncUserDeletion,
      syncUserUpdation
  ],
});
 