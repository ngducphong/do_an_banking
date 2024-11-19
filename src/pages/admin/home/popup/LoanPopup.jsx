import React from "react";
import { Modal, Button } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import './LoanPopup.css';  // Custom CSS file for further styling if needed

export default function LoanPopup({ isVisible, onClose }) {
  return (
    <Modal
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      closeIcon={<CloseOutlined />}
      className="custom-modal"
      width="75vw"  // 75% of the viewport width
      bodyStyle={{ height: '75vh' }}  // 75% of the viewport height
    >
      <div className="loan-popup-container">
        {/* Left Side */}
        <div className="left-side">
          <img
            src="/assets/img/icon/creditimg.jpg" // Replace with your image path
            alt="Credit Approved"
            className="left-image"
          />
        </div>

        {/* Right Side */}
        <div className="right-side">
          <h2 className="popup-title">Bạn có 15 hồ sơ vay cần tiếp nhận!!</h2>
          <img
            src="/assets/img/icon/document.jpg" // Replace with your image path
            alt="Loan Files"
            className="right-image"
          />
          <Button type="primary" className="primary-button" onClick={onClose}>
            Check ngay nào!!
          </Button>
        </div>
      </div>
    </Modal>
  );
}
