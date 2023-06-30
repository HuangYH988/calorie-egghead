import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase';

export function FetchedData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Create a function to fetch the data from Firestore
    const fetchData = async () => {
        try {
            const messagesRef = ref(database); // Reference to the desired location in the Realtime Database
    
            // Attach an event listener to listen for changes in the data
            onValue(messagesRef, (snapshot) => {
                const fetchedData = snapshot.val();
                const filteredData = Object.values(fetchedData.Logs).filter(
                  (item) => item.authorEmail === 'user@email.com'
                );
                
                setData(filteredData);
                
            });
          } catch (error) {
            console.error('Error fetching data: ', error);
          }
        };

    // Call the fetchData function
    fetchData();
  }, []);

  return (
    <div>
        {console.log(data)}
      {/* {data.map((item) => (
        <div key={item.id}>{ Render the data here }</div>
      ))} */}
    </div>
  );
}