import { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true); // Set loading to true when making a new request
    fetch(`https://reqres.in/api/users?page=${currentPage}`)
      .then((res) => res.json())
      .then((response) => {
        if (response && response.data) {
          setUsers(response.data);
          setLoading(false);
        } else {
          setUsers([]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (users.length === 0) return <p>No profile data</p>;

  return (
    <div>
      <h1 className="text-3xl text-center mb-5">User's List 1</h1>
      <table className="text-center mx-auto border border-collapse border-gray-500">
        <thead className="bg-gray-800 mb-8 mt-8 text-center border border-collapse">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody className="ml-5 mr-5  border bg-orange-900 border-b border-separate">
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{`${user.first_name} ${user.last_name}`}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2"
        >
          Previous Page
        </button>
        <button
          onClick={nextPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default UserList;
