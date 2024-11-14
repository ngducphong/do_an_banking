    import React from "react";
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faCheckCircle, faExclamationTriangle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
    
    const getIcon = (iconType) => {
      switch (iconType) {
        case 'success':
          return <FontAwesomeIcon className="text-green-500" icon={faCheckCircle} />;
        case 'warning':
          return <FontAwesomeIcon className="text-yellow-500" icon={faExclamationTriangle} />;
        case 'error':
          return <FontAwesomeIcon className="text-red-500" icon={faTimesCircle} />;
        default:
          return <FontAwesomeIcon icon={faCheckCircle} />;
      }
    };
    const Popup = ({ message, onClose ,type}) => {
        console.log(type);
        
    return (
        <div style={styles.overlay}>
        <div style={styles.popup}>
            <div style={styles.header}>
            <span style={styles.icon}>
                {getIcon(type)}
            </span>
            <span style={styles.title}>Thông báo</span>
            </div>
            <div style={styles.body}>
            <p>{message}</p>
            </div>
            <button style={styles.button} onClick={onClose}>
            OK
            </button>
        </div>
        </div>
    );
    };

    const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    popup: {
        width: "300px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        textAlign: "center",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10px",
    },
    icon: {
        fontSize: "24px",
        marginRight: "8px",
    },
    title: {
        fontSize: "18px",
        fontWeight: "bold",
    },
    body: {
        marginBottom: "20px",
    },
    button: {
        backgroundColor: "#9b59b6",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        padding: "10px 20px",
        cursor: "pointer",
    },
    };

    export default Popup;
