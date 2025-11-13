# Contact Form Submissions

This directory contains all contact form submissions when email is not configured.

## File Format
Each submission is saved as a JSON file with timestamp:
- `submission-1699999999999.json`

## JSON Structure
```json
{
  "timestamp": "2024-11-13T12:00:00.000Z",
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello! I'd like to work with you.",
  "mode": "development"
}
```

## How to View
1. Open the JSON files in any text editor
2. Or use the command: `cat submissions/*.json`
3. Or import into Excel/Google Sheets as JSON

## Setup Email
To send real emails instead of saving to files:
1. Copy `.env.example` to `.env.local`
2. Configure Gmail, Outlook, or custom SMTP
3. Restart the server
4. Submissions will be emailed instead

## Auto-Processing (Optional)
You can create a simple script to process these files:

```javascript
// process-submissions.js
const fs = require('fs');
const files = fs.readdirSync('./submissions');
files.forEach(file => {
  const data = JSON.parse(fs.readFileSync(`./submissions/${file}`));
  console.log(`New message from ${data.name} (${data.email}):`);
  console.log(data.message);
  console.log('---');
});
```