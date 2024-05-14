let existingIds = []; // Array to store existing IDs
let lastId = 0;
// Function to check if an ID exists
function idExists(id) {
    return existingIds.includes(id);
}

// Function to generate the next sequential ID
exports.generateNextId =() => {
    let nextId = lastId + 1;
    while (idExists(nextId.toString())) {
        nextId++; // If ID exists, increment and check again
    }
    lastId = nextId; // Update lastId
    existingIds.push(lastId.toString()); // Add the new ID to existing IDs
    return lastId.toString(); // Convert to string if necessary
}