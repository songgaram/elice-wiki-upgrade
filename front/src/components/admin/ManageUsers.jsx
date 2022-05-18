import React from "react";
import * as Api from "../../api";

const ManageUsers = () => {
  const [data, setData] = React.useState();
  React.useEffect(() => {
    const getData = async () => {
      const { data } = await Api.get("users");
      setData(data);
    };
    getData();
  }, []);
  return (
    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>UserId</th>
          <th>Name</th>
          <th>Email</th>
          <th>Track</th>
          <th>Authorized</th>
          <th>Admin</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.users.map((datum, index) => {
            return (
              <tr key={`users/${index}`}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{datum.__id}</td>
                <td>{datum.name}</td>
                <td>{datum.email}</td>
                <td>{datum.track}</td>
                <td>{datum.authorized}</td>
                <td>{datum.admin}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
export default ManageUsers;
