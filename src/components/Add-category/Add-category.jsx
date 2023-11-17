// import React, { useState, useEffect } from "react";
// import Modal from "react-modal";
// import "./Add-category.css";
// const Addcategory = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     const storedCategories = localStorage.getItem("categories");
//     if (storedCategories) {
//       setCategories(JSON.parse(storedCategories));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("categories", JSON.stringify(categories));
//   }, [categories]);

//   const handleFormSubmit = (event) => {
//     event.preventDefault();

//     if (selectedCategory !== null) {
//       setCategories((prevCategories) =>
//         prevCategories.map((category, index) =>
//           index === selectedCategory ? newCategory : category
//         )
//       );
//       setSelectedCategory(null); 
//     } else {
//       setCategories((prevCategories) => [...prevCategories, newCategory]);
//     }

//     setNewCategory("");
//     closeModal();
//   };

//   const handleEditClick = (index) => {
//     setNewCategory(categories[index]);
//     setSelectedCategory(index);
//     openModal();
//   };

//   const handleDeleteClick = (index) => {
//     setCategories((prevCategories) =>
//       prevCategories.filter((_, i) => i !== index)
//     );
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedCategory(null); 
//   };

//   return (
//     <div className="container">
//       <h2 className="card-title">Kategoriya qo’shish</h2>
//       <div className="box">
//         <h1 className="header-title">Kategoriya qo’shish</h1>
//         <button className="modal-btn" onClick={openModal}>
//           +
//         </button>
//       </div>
//       <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
//         <div className="modal-content">
//           <div className="modal-header">
//             <h2 className="modal-title">Admin qo’shish</h2>
//             <button className="close-btn" onClick={closeModal}>
//               X
//             </button>
//           </div>
//           <form className="modal-form" onSubmit={handleFormSubmit}>
//             <label htmlFor="category">Kategoriya nomi</label>
//             <input
//               type="text"
//               id="category"
//               name="category"
//               autoComplete="off"
//               placeholder="Kategoriya nomi"
//               value={newCategory}
//               onChange={(e) => setNewCategory(e.target.value)}
//             />
//             <button type="submit">Saqlash</button>
//           </form>
//         </div>
//       </Modal>
//       <ul className="card-list">
//         {categories.map((category, index) => (
//           <li className="card-item" key={index}>
//             <a href="/News">{category}</a>
//             <button
//               className="card-btn"
//               onClick={() => setSelectedCategory(index)}
//             >
//               ...
//             </button>
//             {selectedCategory === index && (
//               <div className="edit-delete-buttons">
//                 <button className="button" onClick={() => handleEditClick(index)}>Edit</button>
//                 <button className="button" onClick={() => handleDeleteClick(index)}>Delete</button>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Addcategory;

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Add-category.css";

const Addcategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editMode, setEditMode] = useState(false); // New state for toggle

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (editMode && selectedCategory !== null) {
      setCategories((prevCategories) =>
        prevCategories.map((category, index) =>
          index === selectedCategory ? newCategory : category
        )
      );
      setSelectedCategory(null);
    } else {
      setCategories((prevCategories) => [...prevCategories, newCategory]);
    }

    setNewCategory("");
    closeModal();
  };

  const handleEditClick = (index) => {
    setNewCategory(categories[index]);
    setSelectedCategory(index);
    setEditMode(true);
    openModal();
  };

  const handleDeleteClick = (index) => {
    setCategories((prevCategories) =>
      prevCategories.filter((_, i) => i !== index)
    );
  };

  const handleToggle = () => {
    setEditMode(!editMode);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setEditMode(false);
  };

  return (
    <div className="container">
      <h2 className="card-title">Kategoriya qo’shish</h2>
      <div className="box">
        <h1 className="header-title">Kategoriya qo’shish</h1>
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
            <label htmlFor="category">Kategoriya nomi</label>
            <input
              type="text"
              id="category"
              name="category"
              autoComplete="off"
              placeholder="Kategoriya nomi"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button type="submit">Saqlash</button>
          </form>
        </div>
      </Modal>
      <ul className="card-list">
        {categories.map((category, index) => (
          <li className="card-item" key={index}>
            <a href="/News">{category}</a>
            <div className="edit-delete-buttons">
             
                <button className="button" onClick={() => handleEditClick(index)}>
                  Edit
                </button>
             
              <button className="button" onClick={() => handleDeleteClick(index)}>
                Delete
              </button>
              <label className="switch">
                <input type="checkbox" onChange={handleToggle} />
                <span className="slider round"></span>
              </label>
              {editMode && <span>Active </span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Addcategory;
