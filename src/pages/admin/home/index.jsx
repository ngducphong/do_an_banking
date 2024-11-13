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
    <Grid container spacing={3} className="pt-20">
      {/* Left Side */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            height: "100%",
            textAlign: "left",
            ml: "10%",
          }}
          className="grip grid-cols-1 gap-1"
        >
          <Box className="h-1/3"> </Box>
          <Box className="h-1/3">
            <Typography
              className="text-[#9D4EDD]"
              sx={{
                fontSize: "36px",
                fontWeight: "600",
              }}
            >
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
            </Button>{" "}
          </Box>
          <Box className="h-1/3 flex items-end">
            <Box className="flex items-end gap-6 justify-center rounded-full bg-slate-300 w-full h-1/2">
              <Box className="h-full grid grid-cols-1 text-[#9D4EDD] text-[20px] place-items-center">
                <span className="h-full w-full items-end flex text-[30px]">📞 Gọi điện tư vấn</span>
                <span className="h-full w-full">Tư vấn sản phẩm vay</span>
              </Box>
              <Box className="h-full grid grid-cols-1 text-[#9D4EDD] text-[20px] place-items-center">
                <span className="h-full w-full items-end flex text-[30px]">🏦 Vay uy tín</span>
                <span className="h-full w-full"> Quy trình phê duyệt nhanh</span>
              </Box>
              <Box className="h-full grid grid-cols-1 text-[#9D4EDD] text-[20px] place-items-center">
                <span className="h-full w-full items-end flex text-[30px]"> 📉 Lãi suất thấp</span>
                <span className="h-full w-full"> Lãi suất đảm bảo chi trả</span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>

      {/* Right Side - Image and Info */}
      <Grid item xs={12} md={6} className="text-center">
        <Box
          component="img"
          src="/assets/img/icon/homeimg.jpg" // Corrected image path
          alt="Credit Card Banner"
          sx={{
            maxWidth: "100%",
            boxShadow: 3,
          }}
        />
      </Grid>
       <LoanPopup isVisible={isLoanPopupVisible} onClose={closeLoanPopup} />
    </Grid>
  );
}
