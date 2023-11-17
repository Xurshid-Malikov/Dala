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

  // Add the following state declaration
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  useEffect(() => {
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

    if (!newAdmin.fullName || !newAdmin.phoneNumber || !newAdmin.role) {
      alert("Iltimos, barcha Malumot toʻldiring");
      return;
    }

    // Update the selected admin if it exists, else add a new admin
    if (selectedAdmin !== null) {
      setAdminData((prevAdminData) =>
        prevAdminData.map((admin, index) =>
          index === selectedAdmin ? newAdmin : admin
        )
      );
      setSelectedAdmin(null);
    } else {
      setAdminData((prevAdminData) => [...prevAdminData, newAdmin]);
    }

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

  const handleEditClick = (index) => {
    const adminToEdit = adminData[index];

    // Populate the form with the data of the admin to be edited
    setNewAdmin(adminToEdit);
    setSelectedAdmin(index);

    openModal();
  };

  const handleDeleteClick = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this admin?");

    if (confirmDelete) {
      setAdminData((prevAdminData) =>
        prevAdminData.filter((_, i) => i !== index)
      );
    }
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
              <form className="modal-form" onSubmit={handleFormSubmit}>
                <label htmlFor="adminName">Full name</label>
                <input
                  type="text"
                  className="input-name"
                  id="adminName"
                  name="fullName"
                  placeholder="Full name"
                  autoComplete="off"
                  value={newAdmin.fullName}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, fullName: e.target.value })
                  }
                />
                <label htmlFor="phoneNumber">Phone number</label>
                <input
                  className="phoneNumber"
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  autoComplete="off"
                  placeholder="+998"
                  value={newAdmin.phoneNumber}
                  onChange={(e) => {
                    const formattedPhoneNumber = e.target.value
                      .replace(/\D/g, "")
                      .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");

                    setNewAdmin({
                      ...newAdmin,
                      phoneNumber: formattedPhoneNumber,
                    });
                  }}
                />

                <label htmlFor="role">Role</label>
                <input
                  className="role"
                  type="text"
                  id="role"
                  name="role"
                  autoComplete="off"
                  value={newAdmin.role}
                  placeholder="Role"
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, role: e.target.value })
                  }
                />
                <button className="save-btn" type="submit">
                  Saqlash
                </button>
              </form>
              </div>
              
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
              <button>...</button>
              <td>
                <button onClick={() => handleEditClick(index)}>Edit</button>
                <button onClick={() => handleDeleteClick(index)}>Delete</button>
              </td>
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