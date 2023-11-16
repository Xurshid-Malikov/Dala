// import "./News.css";
// import Modal from "react-modal";
// import React, { useState } from "react";

// const News = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     closeModal();
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="contianer">
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
//               type="text"
//               id="adminName"
//               name="fullName"
//               autoComplete="off"
//             />
//             <label htmlFor="Comment">Comment</label>
//             <textarea
//               type="text"
//               id="Comment"
//               name="Comment"
//               autoComplete="off"
//             />

//             <button type="submit">Saqlash</button>
//           </form>
//         </div>
//       </Modal>

//       <ul className="news-list">
//         <li className="news-item">
//         <h2 className="new-title">
//           Qishloq xo'jaligi haqida qisqacha ma'lumot
//         </h2>
//         <p className="new-title">
//           Qishloq qishloq xo'jaligi don, meva, sabzavot va moyli o'simliklar
//           kabi ekinlarni etishtirishni o'z ichiga oladi. Fermerlar odatda
//           mavsumiy tsikllarga rioya qilishadi va hosilni optimallashtirish uchun
//           turli dehqonchilik usullaridan foydalanadilar. Ko'pgina qishloq
//           joylarda chorvachilik fermalari joylashgan bo'lib, u erda go'sht, sut,
//           tuxum va boshqa mahsulotlar uchun qoramol, qo'y, cho'chqa va
//           parrandalar boqiladi. Chorvachilik qishloq xoʻjaligi iqtisodiyotiga
//           salmoqli hissa qoʻshmoqda. Dehqonchilik texnikasi: An’anaviy
//           dehqonchilik usullari hali ham ko‘plab qishloq joylarda keng
//           tarqalgan, biroq hosildorlik va barqarorlikni oshirish uchun zamonaviy
//           texnikalar, jumladan, mexanizatsiyalash, aniq dehqonchilik va ilg‘or
//           texnologiyalardan foydalanish tobora ko‘proq o‘zlashtirilmoqda.
//         </p>
//         </li>
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

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Create a new news item using the input values
    const newNewsItem = {
      fullName: fullName,
      comment: comment,
    };

    // Add the new news item to the list
    setNewsItems((prevNewsItems) => [...prevNewsItems, newNewsItem]);

    // Clear the input values
    setFullName("");
    setComment("");

    // Close the modal
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
              type="text"
              id="adminName"
              name="fullName"
              autoComplete="off"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <label htmlFor="Comment">Comment</label>
            <textarea
              type="text"
              id="Comment"
              name="comment"
              autoComplete="off"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Saqlash</button>
          </form>
        </div>
      </Modal>

      <ul className="news-list">
        {newsItems.map((newsItem, index) => (
          <li className="news-item" key={index}>
            <h2 className="news-title">{newsItem.fullName}</h2>
            <p className="news-content">{newsItem.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
