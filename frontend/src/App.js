import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://journal-service-zppm.onrender.com/categories');
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, [])

  return (
    <div>
      <h2>Categories</h2>
      <div className="categories">
        {categories.map((category) => (
          <p key={category.id}>{category.name}</p>
        ))}
      </div>
    </div>
  )
}

export default App;
