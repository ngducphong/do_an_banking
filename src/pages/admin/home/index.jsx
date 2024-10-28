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
                        border: "2px solid #9D4EDD",
                        borderRadius: "8px",
                        textAlign: "left",
                    }}
                >
                    <Typography variant="h5" color="#9D4EDD" fontWeight="bold">
                        Vay nhanh chóng <br /> Trả an tâm
                    </Typography>
                    <Typography variant="body1" color="textSecondary" mt={2}>
                        Transcent cung cấp các sản phẩm vay với lãi suất ưu đãi nhất cho các
                        khách hàng thân yêu
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ mt: 3, backgroundColor: "#9D4EDD", color: "#fff" }}
                    >
                        Xem sản phẩm vay ngay!
                    </Button>
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
                    src="/assets/img/icon/homeimg.jgp" // Đường dẫn tới hình ảnh của bạn
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
