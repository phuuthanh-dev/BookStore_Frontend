import React, { useEffect, useState } from "react";
import { MyRequest } from "../../api/Request";
import { useLocation } from 'react-router-dom';
import { formatNumber } from "../utils/FormatNumber";

function VNPAY_PAY() {
    const [amount, setAmount] = useState(0);
    const [vnpTransactionStatus, setVnpTransactionStatus] = useState("");
    const [vnpAmount, setVnpAmount] = useState(0);
    const location = useLocation();

    const handlePay = async () => {
        let URL: string = `http://localhost:8080/api/v1/payment/vn-pay?amount=${amount}`;
        const response = await MyRequest(URL);
        if (response) {
            window.location.href = response.data.paymentUrl;
        } else {
            throw new Error("GD ko thanh cong");
        }
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        searchParams.forEach((value, key) => {
            console.log(`${key}: ${value}`);
            if (key === 'vnp_Amount') {
                setVnpAmount(parseInt(value) / 100);
            } else if (key === 'vnp_TransactionStatus') {
                setVnpTransactionStatus(value);
            }
        });

    }, [location.search])

    return (
        <div className="container">
            {vnpTransactionStatus === "00" ? 
            <div className="fw-bold" style={{color: "green"}}>
                Thanh toán số tiền {formatNumber(vnpAmount)} thành công!
            </div> : <div className="fw-bold" style={{color: "red"}}>
                Thanh toán số tiền {formatNumber(vnpAmount)} không thành công!
            </div>}

            <div className="header clearfix">
                <h3 className="text-muted">VNPAY DEMO</h3>
            </div>
            <h3>Tạo mới đơn hàng</h3>
            <div className="table-responsive">
                <form onSubmit={handlePay} id="frmCreateOrder" method="get">
                    <div className="form-group">
                        <label htmlFor="amount">Số tiền</label>
                        <input
                            className="form-control"
                            data-val="true"
                            data-val-number="The field Amount must be a number."
                            data-val-required="The Amount field is required."
                            id="amount"
                            max="100000000"
                            min="1"
                            name="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(parseInt(e.target.value))}
                        />
                    </div>
                    <h4>Chọn phương thức thanh toán</h4>
                    <div className="form-group">
                        <h5>
                            Cách 1: Chuyển hướng sang Cổng VNPAY chọn phương thức thanh toán
                        </h5>
                        <input
                            type="radio"
                            // Checked="True"
                            id="bankCode"
                            name="bankCode"
                            value=""
                        />
                        <label htmlFor="bankCode">Cổng thanh toán VNPAYQR</label><br />

                        <h5>Cách 2: Tách phương thức tại site của đơn vị kết nối</h5>
                        <input type="radio" id="bankCode" name="bankCode" value="VNPAYQR" />
                        <label htmlFor="bankCode">Thanh toán bằng ứng dụng hỗ trợ VNPAYQR</label
                        ><br />

                        <input type="radio" id="bankCode" name="bankCode" value="VNBANK" />
                        <label htmlFor="bankCode"
                        >Thanh toán qua thẻ ATM/Tài khoản nội địa</label
                        ><br />

                        <input type="radio" id="bankCode" name="bankCode" value="INTCARD" />
                        <label htmlFor="bankCode">Thanh toán qua thẻ quốc tế</label><br />
                    </div>
                    <div className="form-group">
                        <h5>Chọn ngôn ngữ giao diện thanh toán:</h5>
                        <input
                            type="radio"
                            id="language"
                            // Checked="True"
                            name="language"
                            value="vn"
                        />
                        <label htmlFor="language">Tiếng việt</label><br />
                        <input type="radio" id="language" name="language" value="en" />
                        <label htmlFor="language">Tiếng anh</label><br />
                    </div>
                    <button type="button" onClick={handlePay} className="btn btn-default">Thanh toán</button>
                </form>
            </div>
            <p>&nbsp;</p>
            <footer className="footer">
                <p>&copy; VNPAY 2020</p>
            </footer>
        </div>
    );
}

export default VNPAY_PAY;