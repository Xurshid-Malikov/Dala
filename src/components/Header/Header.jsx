import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Header.css";
import Logo from "../../Assets/img/Logo.svg";

const Header = () => {
  const [activeBtn, setActiveBtn] = useState("Admin");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    fullName: "",
    phoneNumber: "",
    role: "",
  });

  useEffect(() => {
    // Load data from local storage on component mount
    const storedAdminData = localStorage.getItem("adminData");
    if (storedAdminData) {
      setAdminData(JSON.parse(storedAdminData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("adminData", JSON.stringify(adminData));
  }, [adminData]);

  const handleButtonClick = (btnName) => {
    setActiveBtn(btnName);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setAdminData((prevAdminData) => [...prevAdminData, newAdmin]);
    setNewAdmin({
      fullName: "",
      phoneNumber: "",
      role: "",
    });
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <img className="logo" src={Logo} alt="logo" width={40} height={40} />

          <div className="buttons">
            <button
              className={`btn ${activeBtn === "Monitoring" ? "active" : ""}`}
              onClick={() => handleButtonClick("Monitoring")}
            >
              Monitoring
            </button>
            <button
              className={`btn ${activeBtn === "Admin" ? "active" : ""}`}
              onClick={() => handleButtonClick("Admin")}
            >
              Admin qo’shish
            </button>
            <button
              className={`btn ${activeBtn === "Kategoriya" ? "active" : ""}`}
              onClick={() => handleButtonClick("Kategoriya")}
            >
              Kategoriya qo’shish
            </button>
            <button
              className={`btn ${activeBtn === "Yangiliklar" ? "active" : ""}`}
              onClick={() => handleButtonClick("Yangiliklar")}
            >
              Yangiliklar
            </button>
          </div>

          <div className="box">
            <h1 className="header-title">Admin qo’shish</h1>
            <button className="modal-btn" onClick={openModal}>
              +
            </button>
          </div>

          <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">Admin qo’shish</h2>
                <button className="close-btn" onClick={closeModal}>
                  X
                </button>
              </div>
              <form className="modal-form" onSubmit={handleFormSubmit}>
                <label htmlFor="adminName">Full name</label>
                <input
                  type="text"
                  id="adminName"
                  name="fullName"
                  autoComplete="off"
                  value={newAdmin.fullName}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, fullName: e.target.value })
                  }
                />
                <label htmlFor="phoneNumber">Phone number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  autoComplete="off"
                  value={newAdmin.phoneNumber}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, phoneNumber: e.target.value })
                  }
                />
                <label htmlFor="role">Role</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  autoComplete="off"
                  value={newAdmin.role}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, role: e.target.value })
                  }
                />
                <button type="submit">Saqlash</button>
              </form>
            </div>
          </Modal>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full name</th>
                <th>Phone number</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {adminData.map((admin, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{admin.fullName}</td>
                  <td>{admin.phoneNumber}</td>
                  <td>{admin.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </header>
    </>
  );
};

export default Header;
