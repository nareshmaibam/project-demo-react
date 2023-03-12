import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-modal";
import React, { useEffect, useState } from "react";
const customStyles = {
  content: {
    top: "10%",
    left: "10%",
    height: "300px",
  },
};
function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState();
  const [searchQ, setSearchQ] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsUpadate, setIsModalUpdate] = useState(false);
  const [userId, setUserId] = useState();
  const usersData = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    usersData && setData(usersData);
  }, []);
  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    let searchedUsers = [];
    if (data && data.length) {
      if (searchQ.trim()) {
        let foundUser = data.filter(
          (item) =>
            item.firstName.toLowerCase() === searchQ.toLowerCase() ||
            item.lastName.toLowerCase() === searchQ.toLowerCase() ||
            item.email.toLowerCase() === searchQ.toLowerCase()
        );
        foundUser[0] && searchedUsers.push(foundUser[0]);
      }
      if (searchedUsers && searchedUsers.length) setData(searchedUsers);
      if (searchQ.trim().length === 0) setData(usersData);
    }
  }, [searchQ]);
  function closeModal() {
    setIsModalUpdate(false);
    setIsOpen(false);
    setFirstName("");
    setLastName("");
    setEmail("");
  }
  // const users = [
  //   { firstName: "sanjit", lastName: "Lungeli", email: "sanjit455@gmail.com" },
  //   { firstName: "Naresh", lastName: "Singh", email: "naresh455@gmail.com" },
  //   { firstName: "Ashish", lastName: "Sharma", email: "ashsih455@gmail.com" },
  //   { firstName: "Albert", lastName: "Hijam", email: "albert455@gmail.com" },
  // ];
  // localStorage.setItem("userData", JSON.stringify(users));

  const saveNewUser = (e) => {
    e.preventDefault();
    let users = [];
    if (usersData) {
      users = [...usersData];
    }
    let newUsers;

    if (firstName && lastName && email) {
      newUsers = {
        firstName: firstName,
        lastName: lastName,
        email: email,
      };
      users.push(newUsers);
      alert("Users added!");
    }
    // console.log(newUsers);
    setData(users);
    localStorage.setItem("userData", JSON.stringify(users));
    closeModal();
  };

  const deleteUser = (id) => {
    console.log(id);
    const confirm = window.confirm("Are you sure want to delete?");
    if (confirm) {
      let deletedUser = data.filter((item, index) => index !== id);
      // console.log(deletedUser);
      localStorage.setItem("userData", JSON.stringify(deletedUser));
      setData(deletedUser);
    }
  };
  const editUser = (id) => {
    setUserId(id);
    let userToEdit = data.filter((item, index) => index === id);
    console.log(userToEdit);
    setFirstName(userToEdit[0].firstName);
    setLastName(userToEdit[0].lastName);
    setEmail(userToEdit[0].email);
    setIsModalUpdate(true);
  };
  const saveUpdateUser = (e, id) => {
    e.preventDefault();
    let users = [...data];
    let oldUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    users[id] = oldUser;
    setData(users);
    localStorage.setItem("userData", JSON.stringify(users));
    setIsModalUpdate(false);
    alert("user updated!");
  };
  return (
    <div className="App">
      <h4 style={{ marginTop: "25px" }}>
        Users
        <button className="btn btn-success text-light mx-2" onClick={openModal}>
          {" "}
          + Add User{" "}
        </button>
      </h4>
      <div className="w-50 mx-auto mb-3">
        <input
          className="form-control mt-2"
          type="text"
          placeholder="search users"
          onChange={(e) => setSearchQ(e.target.value)}
        />
      </div>
      <div className="row">
        {data &&
          data?.map((item, index) => {
            return (
              <div
                key={index}
                className="card col-sm-12  col-md-6 col-lg-4"
                style={{ width: "400px", margin: "auto", marginBottom: "20px" }}
              >
                {/* <img src="..." className="card-img-top" alt="..." /> */}
                <div className="card-body">
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "orange",
                      color: "white",
                      lineHeight: "50px",
                      margin: "auto",
                    }}
                  >
                    {item?.firstName.slice(0, 1).toUpperCase()}
                    {item?.lastName.slice(0, 1).toUpperCase()}
                  </div>
                  <p className="card-text">
                    Name: {item?.firstName} {item?.lastName}
                  </p>
                  <p className="card-text">Email: {item?.email}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => editUser(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <form>
          <input
            className="form-control mt-2"
            type="text"
            placeholder="first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="form-control mt-2"
            type="text"
            placeholder="last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className="form-control mt-2"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button className="btn btn-info" onClick={closeModal}>
            Cancel
          </button>
          <button
            style={{ marginLeft: "20px" }}
            className="btn btn-primary"
            onClick={(e) => saveNewUser(e)}
          >
            Save
          </button>
        </form>
      </Modal>
      <Modal
        isOpen={modalIsUpadate}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <form>
          <input
            className="form-control mt-2"
            type="text"
            placeholder="first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="form-control mt-2"
            type="text"
            placeholder="last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className="form-control mt-2"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button className="btn btn-info" onClick={closeModal}>
            Cancel
          </button>
          <button
            style={{ marginLeft: "20px" }}
            className="btn btn-primary"
            onClick={(e) => saveUpdateUser(e, userId)}
          >
            Save Changes
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default App;
