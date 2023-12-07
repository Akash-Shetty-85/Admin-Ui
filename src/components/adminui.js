import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBarComponent from "./searchBar";
import TableDataComponent from "./tableData";
import PaginationComponent from "./pagination";
import { useSnackbar } from "notistack";

const BACKEND_URL ='https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'

const AdminUIComponent = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const usersPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [userToModify, setUserToModify] = useState(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

 
  const fetchUserList = async () => {
    try {
      const response = await axios.get(
        BACKEND_URL
      );
      setUserList(response.data);
      setFilteredData(response.data);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      enqueueSnackbar(
        "Error fetching user data. Please try again later... Check that the backend is running, reachable, and returns valid JSON.",
        { variant: "error" }
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
    // eslint-disable-next-line 
  }, []);

 
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    applySearchFilter(query);
    setCurrentPage(1);
  };

  const applySearchFilter = (query) => {
    const filtered = filteredData.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
    setUserList(filtered);
  };

  
  const toggleSelectUser = (userId) => {
    if (selectedUserIds.includes(userId)) {
      setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
    } else {
      setSelectedUserIds([...selectedUserIds, userId]);
    }
  };
 const toggleSelectAllUsers = () => {
    setIsSelectAll(!isSelectAll);
    if (!isSelectAll) {
      setSelectedUserIds(userList.map((user) => user.id));
    } else {
      setSelectedUserIds([]);
    }
  };

 
  const handleRowClick = (clickedUser) => {
    if (selectedUserIds.includes(clickedUser.id)) {
      setSelectedUserIds(selectedUserIds.filter((id) => id !== clickedUser.id));
    } else {
      setSelectedUserIds([...selectedUserIds, clickedUser.id]);
    }
  };

 
  const handleEditUserInfo = (user) => {
    setUserToModify(user);
    setIsEditFormVisible(true);
  };


  const handleSaveEditedUser = (e) => {
    e.preventDefault();

    const updatedUserList = userList.map((user) => {
      if (user.id === userToModify.id) {
        return userToModify;
      }
      return user;
    });

    const updatedFilteredData = filteredData.map((user) => {
      if (user.id === userToModify.id) {
        return userToModify;
      }
      return user;
    });

    setUserList(updatedUserList);
    setFilteredData(updatedFilteredData);

    setUserToModify(null);
    setIsEditFormVisible(false);
  };


  const handleCancelEdit = () => {
    setUserToModify(null);
    setIsEditFormVisible(false);
  };

  const handleDeleteUser = (userId) => {
    setFilteredData((prevData) => prevData.filter((user) => user.id !== userId));
    setUserList((prevData) => prevData.filter((user) => user.id !== userId));
  };

  const indexOfLastData = currentPage * usersPerPage;
  const indexofFirstData = indexOfLastData - usersPerPage;
  const currentUsers = userList.slice(indexofFirstData, indexOfLastData);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const handleDeleteSelected = () => {
    setIsSelectAll(false);
    const selectedIds = currentUsers
      .filter((user) => selectedUserIds.includes(user.id))
      .map((user) => user.id);

    setFilteredData((prevData) =>
      prevData.filter((user) => !selectedIds.includes(user.id))
    );

    setUserList((prevData) =>
      prevData.filter((user) => !selectedIds.includes(user.id))
    );
    setSelectedUserIds([]);
  };

  return (
    <div style={{ margin: "1rem", padding: "1rem" }}>
      <SearchBarComponent searchText={searchQuery} handleSearch={handleSearch} />
      {isLoading ? (
        <div>
          <p>Loading Data...</p>
        </div>
      ) : (
        <>
          <TableDataComponent
            userList={currentUsers}
            isSelectAll={isSelectAll}
            selectedUserIds={selectedUserIds}
            handleEditUserInfo={handleEditUserInfo}
            toggleSelectAllUsers={toggleSelectAllUsers}
            toggleSelectUser={toggleSelectUser}
            handleSaveEditedUser={handleSaveEditedUser}
            handleCancelEdit={handleCancelEdit}
            handleDeleteUser={handleDeleteUser}
            setUserToModify={setUserToModify}
            isEditFormVisible={isEditFormVisible}
            userToModify={userToModify}
            handleRowClick={handleRowClick}
          />
        </>
      )}
      <PaginationComponent
        userList={userList}
        handleDeleteSelected={handleDeleteSelected}
        usersPerPage={usersPerPage}
        totalUsers={userList.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default AdminUIComponent;
