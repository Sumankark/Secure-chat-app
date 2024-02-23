import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react'

const UpdateGroupChat = ({fetchAgain, setFetchAgain}) => {
    const [openModal, setOpenModal] = useState(true);


    const handleModalOpen = () => {
        setOpenModal(true);
      };
    
      const handleModalClose = () => {
        setOpenModal(false);
      };
  return (
    <div><Dialog open={openModal} onClose={handleModalClose}>
    <DialogTitle
      style={{
        fontSize: "40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        fontWeight: "bolder",
      }}
    >
      Update Group Chat
    </DialogTitle>
    <DialogContent>
      {/* Use the GroupChatModal component */}
    </DialogContent>
  </Dialog></div>
  )
}

export default UpdateGroupChat