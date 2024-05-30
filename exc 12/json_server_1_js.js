const firstNames = [];

const lastNames = [];

const url = "http://localhost:8001";

async function postData() {
    for (let i = 1; i <= 10; i++) {
        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
        const user = {
            id: i.toString(),
            firstName: randomFirstName,
            lastName: randomLastName
        };
        
        try {
            await axios.post(`${url}/users`, user);
        } catch (error) {
            console.error(`Error posting user ${i}:`, error);
        }

        const book = {
            name: `Book Title ${i}`,
            author: `Author Name ${i}`,
            numPages: Math.floor(Math.random() * 501) // Random number between 0 and 500 inclusive
        };

        try {
            await axios.post(`${url}/books`, book);
        } catch (error) {
            console.error(`Error posting book ${i}:`, error);
        }
    }
}

