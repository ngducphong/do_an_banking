import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Box } from "@mui/material";
import LoanPopup from "./popup/LoanPopup.jsx";

export default function HomeAdmin() {
  const [isLoanPopupVisible, setIsLoanPopupVisible] = useState(false);

  const closeLoanPopup = () => {
    setIsLoanPopupVisible(false);
  };

  useEffect(() => {
    setIsLoanPopupVisible(true);
  }, []);

  return (
    <Grid container spacing={3} style={{ padding: "20px" }}>
      {/* Left Side */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            padding: "20px",
            height: "100%",
            textAlign: "left",
          }}
          className="grip grid-cols-1 gap-1"
        >
          <Box className="h-1/3">
           
           </Box>
          <Box className="h-1/3">
            <Typography className="text-[#9D4EDD] font-semibold" sx={{
                fontSize:"36px"            }}>
              Vay nhanh chóng <br /> Trả an tâm
            </Typography>
            <Typography variant="body1" color="textSecondary" mt={2}>
              Transcent cung cấp các sản phẩm vay với lãi suất ưu đãi nhất cho
              các khách hàng thân yêu
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#9D4EDD",
                color: "#fff",
                borderRadius: "20px",
              }}
            >
              Xem sản phẩm vay ngay!
            </Button>
          </Box>
          <Box className="h-1/3">
           
           </Box>
        </Box>

        {/* Feature Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            mt: 4,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "#9D4EDD",
              borderColor: "#9D4EDD",
              minWidth: "150px",
            }}
          >
            📞 Gọi điện tư vấn <br />
            Tư vấn sản phẩm vay
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#9D4EDD",
              borderColor: "#9D4EDD",
              minWidth: "150px",
            }}
          >
            🏦 Vay uy tín <br />
            Quy trình phê duyệt nhanh
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#9D4EDD",
              borderColor: "#9D4EDD",
              minWidth: "150px",
            }}
          >
            📉 Lãi suất thấp <br />
            Lãi suất đảm bảo chi trả
          </Button>
        </Box>
      </Grid>

      {/* Right Side - Image and Info */}
      <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
        <Box
          component="img"
          src="/assets/img/icon/homeimg.jpg" // Corrected image path
          alt="Credit Card Banner"
          sx={{
            maxWidth: "100%",
            borderRadius: "8px",
            boxShadow: 3,
          }}
        />
      </Grid>

      {/* LoanPopup */}
      <LoanPopup isVisible={isLoanPopupVisible} onClose={closeLoanPopup} />
    </Grid>
  );
}
