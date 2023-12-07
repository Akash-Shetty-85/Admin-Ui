import React from "react";
import "./tableData.css";
import delet from '../components/delete.png'
import edit from '../components/edit.png'

const DataTable = ({
  userList,
  isSelectAll,
  selectedUserIds,
  handleEditUserInfo,
  toggleSelectAllUsers,
  toggleSelectUser,
  handleSaveEditedUser,
  handleCancelEdit,
  handleDeleteUser,
  setUserToModify,
  isEditFormVisible,
  userToModify,
  handleRowClick,
}) => {
  return (
    <div>
      {isEditFormVisible && (
        <div className="edit-form">
          <h2>EDIT USER INFORMATION</h2>
          <form onSubmit={handleSaveEditedUser}>
            <label>
              Name:
              <input
                type="text"
                value={userToModify.name}
                onChange={(e) =>
                  setUserToModify({ ...userToModify, name: e.target.value })
                }
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                value={userToModify.email}
                onChange={(e) =>
                  setUserToModify({ ...userToModify, email: e.target.value })
                }
              />
            </label>
            <label>
              Role:
              <input
                type="text"
                value={userToModify.role}
                onChange={(e) =>
                  setUserToModify({ ...userToModify, role: e.target.value })
                }
              />
            </label>
            <button type="submit">SAVE</button>
            <button onClick={handleCancelEdit}>CANCEL</button>
          </form>
        </div>
      )}
      {userList.length ? (
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={toggleSelectAllUsers}
                  checked={isSelectAll}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id} onClick={() => handleRowClick(user)}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => toggleSelectUser(user.id)}
                    checked={selectedUserIds.includes(user.id)}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div>
                    <button onClick={() => handleEditUserInfo(user)}>
                    <img src={edit} alt='edit button'
                      style={{ color: "red", width: 15, height: 15}} />
                    </button>
                    <button onClick={() => handleDeleteUser(user.id)}>
                      <img src={delet} alt='delete button'
                      style={{ color: "red", width: 15, height: 15}} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data-message">No User Data available</p>
      )}
    </div>
  );
};

export default DataTable;
