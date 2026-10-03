import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [searchBook, setSearchBook] = useState('')
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [bookDetail, setBookDetail] = useState([]);

  useEffect(() => {
    const fetch = async() => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-all-books"
      );

      const bookDetail = response.data.data;      
      setBookDetail(bookDetail);
    };    
    fetch();
  }, [])

  const handleInputChange = (e) => {
    const searchItem = e.target.value;
    const regex = searchItem.toLowerCase();
    
    setSearchBook(searchItem)

    const bookIDandTitle = bookDetail.map(book => [book._id, book.title]);

    const filteredItems = bookIDandTitle.filter(bookTitle =>
    {
      if (bookTitle[1].match(regex)){
        return (bookTitle[1]);
      }  
    });
    
    setFilteredBooks(filteredItems);    
  }

    return (
    <div className='bg-white p-2 w-2xl rounded-xl'>
        <input 
            className='text-black text-ls p-2 w-xl rounded-xl'
            type="text"
            value={searchBook}
            onChange={handleInputChange}
            placeholder='Type to search'  
        />
        <ul className='text-gray-600 px-2 text-lg'>
          {filteredBooks.map(filteredBook => 

            <Link to={`/book-details/${filteredBook[0]}`}>
              <li>{filteredBook[1]}</li>
            </Link>
          )}
        </ul>
    </div>
  )
}

export default SearchBar