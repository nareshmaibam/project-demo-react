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
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const usersData = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    usersData && setData(usersData);
  }, []);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
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
    }
    console.log(newUsers);
    setData(users);
    localStorage.setItem("userData", JSON.stringify(users));
    closeModal();
  };
  return (
    <div className="App">
      <h4 style={{ marginTop: "25px" }}>
        Users List{" "}
        <button className="btn btn-success text-light" onClick={openModal}>
          {" "}
          + Add User{" "}
        </button>
      </h4>
      <div className="row">
        {data &&
          data?.map((item, index) => {
            return (
              <div
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
                    {item.firstName.slice(0, 1).toUpperCase()}
                    {item.lastName.slice(0, 1).toUpperCase()}
                  </div>
                  <p className="card-text">
                    Name: {item.firstName} {item.lastName}
                  </p>
                  <p className="card-text">Email: {item.email}</p>
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
    </div>
  );
}

export default App;
