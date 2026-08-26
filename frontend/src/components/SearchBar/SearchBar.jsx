import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [searchBook, setSearchBook] = useState('')
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [bookDetail, setBookDetail] = useState([]);
  const [bookId, setBookId] = useState([]);

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
    setSearchBook(searchItem)

    const bookIDandTitle = bookDetail.map(book => [book._id, book.title]);
    // const bookID = bookDetail.map(book => book._id);

    const filteredItems = bookIDandTitle.filter(book =>
    {
      book.toLowerCase().includes(searchItem.toLowerCase())
      console.log(book)
    });

    // setBookId(bookID);
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

          // bookId is an array. Separate it to get the correct ID
            <Link to={`/book-details/${bookId}`}>
              <li>{filteredBook}</li>
            </Link>
          )}
        </ul>
    </div>
  )
}

export default SearchBar