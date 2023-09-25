// pages/api/update-notice.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    console.log("Delete it");
  if (req.method === 'DELETE') {
    try {
      // Read the existing JSON data
      const filePath = path.join(process.cwd(), '/src/components/message/', 'PrivateNotice.json');
      const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      // Get the entry ID to delete from the URL parameter
      const entryID = req.query.id;

      // Find the index of the entry with the matching ID
      const indexToRemove = existingData.findIndex((entry) => entry.ID === Number(entryID));

      if (indexToRemove !== -1) {
        // Remove the entry from the existing data
        existingData.splice(indexToRemove, 1);

        // Write the updated data back to the file
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf-8');

        res.status(200).json({ message: 'Entry deleted successfully' });
      } else {
        res.status(404).json({ error: 'Entry not found' });
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
