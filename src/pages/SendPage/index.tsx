// import { useLocation, useNavigate } from "react-router-dom";

import BackArrow from "../../components/Navigations/BackwardArrow";

import PhonePage from "../../components/Phone/PhonePage";
import PhonePageContent from "../../components/Phone/PhonePageContent";
import { useState } from "react";

import MoneyInput from "../../components/Common/MoneyInput";

import ConfirmButton from "../../components/Navigations/ConfirmButton";
import AuthInput from "../../components/Auth/AuthInput";
import { InputType } from "../../components/Auth/AuthInput/type.enum";
import { transactionsAPI } from "../../store/services/TransactionsService";
import { CreateTransactionDto } from "../../models/dto/create-transaction.dto";
import AuthError from "../../components/Auth/AuthErrror";
import { BallTriangle } from "react-loader-spinner";

const SendPage = () => {
  // const dispatch = useAppDispatch();
  const [createTransaction, { isSuccess, isLoading }] =
    transactionsAPI.useCreateTransactionMutation();

  const [formData, setFormData] = useState({
    money: "",
    email: "",
  });

  const onChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  // const navigate = useNavigate();

  return (
    <PhonePage className="grey-bg">
      <section style={{ marginTop: "50px", padding: "0 20px" }}>
        <BackArrow title="Send" />
      </section>

      <PhonePageContent>
        <AuthInput
          onInputChange={onChange}
          title="Email"
          type={InputType.EMAIL}
        />

        <MoneyInput title="Sum" onInputChange={onChange} />

        <ConfirmButton
          outline={false}
          onClick={() => {
            createTransaction(
              new CreateTransactionDto(
                +formData.money,
                formData.email,
                "Own money"
              )
            );
          }}
        >
          Send
        </ConfirmButton>

        {isSuccess && <AuthError success>Payment successfull</AuthError>}
        {isLoading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <BallTriangle
              height={40}
              width={40}
              radius={5}
              color="#5b94e9"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}

        {/* <ConfirmButton {...getButton()}></ConfirmButton> */}

        {/* {error ? <AuthError>{error}</AuthError> : null} */}
      </PhonePageContent>
    </PhonePage>
  );
};

export default SendPage;
