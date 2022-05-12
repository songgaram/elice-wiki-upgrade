import React from "react";

const ManagePosts = () => {
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
          <th>Authorized</th>
          <th>Admin</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="checkbox" />
          </td>
          <td>adsfasdee123adf</td>
          <td>HONGJIUN</td>
          <td>loans@gmail.com</td>
          <td>true</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ManagePosts;
