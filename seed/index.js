import { seedUser } from "./users_seed.js";
import { seedTransaction } from "./transaction_seed.js";
import { seedBilling } from "./billing_seed.js";

(async () => {
    try {
        console.log("🚀 Starting seeders...");
            await seedUser();
            await seedBilling();
            await seedTransaction();
    } catch (error) {
        console.error("❌ Error running the seeders:", error.message);
    } finally {
        process.exit();
    }
})();
