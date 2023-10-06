import { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=1")
      .then((res) => res.json())
      .then((response) => {
        if (response && response.data) {
          setUsers(response.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (users.length === 0) return <p>No profile data</p>;

  return (
    <div>
      <h1 className="text-3xl text-center mb-5">User List</h1>
      <table className="text-center mx-auto border border-collapse border-gray-500">
        <thead className="bg-gray-800 mb-8 mt-8  border border-collapse">
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
    </div>
  );
}

export default UserList;
