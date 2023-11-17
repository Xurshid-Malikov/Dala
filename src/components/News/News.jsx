// import "./News.css";
// import Modal from "react-modal";
// import React, { useState } from "react";

// const News = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [fullName, setFullName] = useState("");
//   const [comment, setComment] = useState("");
//   const [newsItems, setNewsItems] = useState([]);

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     const newNewsItem = {
//       fullName: fullName,
//       comment: comment,
//     };

//     setNewsItems((prevNewsItems) => [...prevNewsItems, newNewsItem]);

//     setFullName("");
//     setComment("");

//     closeModal();
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="container">
//       <div className="box">
//         <h1 className="news-title">Yangiliklar</h1>
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
//             <label htmlFor="adminName">Full name</label>
//             <input
//               className="adminName"
//               type="text"
//               id="adminName"
//               name="fullName"
//               autoComplete="off"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//             />
//             <label htmlFor="Comment">Comment</label>
//             <textarea
//             className="comment"
//               type="text"
//               id="Comment"
//               name="comment"
//               autoComplete="off"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//             />
//             <button className="save-btn" type="submit">Saqlash</button>
//           </form>
//         </div>
//       </Modal>

//       <ul className="news-list">
//         {newsItems.map((newsItem, index) => (
//           <li className="news-item" key={index}>
//             <h2 className="new-title">{newsItem.fullName}</h2>
//             <p className="news-content">{newsItem.comment}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default News;

import "./News.css";
import Modal from "react-modal";
import React, { useState } from "react";

const News = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [comment, setComment] = useState("");
  const [newsItems, setNewsItems] = useState([]);
  const [formError, setFormError] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!fullName.trim() || !comment.trim()) {
      setFormError("Iltimos, barcha Malumot toʻldiring");
      return;
    }

    const newNewsItem = {
      fullName: fullName,
      comment: comment,
    };

    setNewsItems((prevNewsItems) => [...prevNewsItems, newNewsItem]);

    setFullName("");
    setComment("");
    setFormError("");

    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormError("");
  };

  return (
    <div className="container">
      <div className="box">
        <h1 className="news-title">Yangiliklar</h1>
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
              className="adminName"
              type="text"
              id="adminName"
              name="fullName"
              autoComplete="off"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <label htmlFor="Comment">Comment</label>
            <textarea
              className="comment"
              type="text"
              id="Comment"
              name="comment"
              autoComplete="off"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {formError && <p className="form-error">{formError}</p>}
            <button className="save-btn" type="submit">
              Saqlash
            </button>
          </form>
        </div>
      </Modal>

      <ul className="news-list">
        {newsItems.map((newsItem, index) => (
          <li className="news-item" key={index}>
            <h2 className="new-title">{newsItem.fullName}</h2>
            <p className="news-content">{newsItem.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;