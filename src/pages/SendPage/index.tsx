import BackArrow from "../../components/Navigations/BackwardArrow";
import PhonePage from "../../components/Phone/PhonePage";
import PhonePageContent from "../../components/Phone/PhonePageContent";
import { useEffect, useState } from "react";
import MoneyInput from "../../components/Common/MoneyInput";
import ConfirmButton from "../../components/Navigations/ConfirmButton";
import AuthInput from "../../components/Auth/AuthInput";
import { InputType } from "../../components/Auth/AuthInput/type.enum";
import { transactionsAPI } from "../../store/services/TransactionsService";
import { CreateTransactionDto } from "../../models/dto/create-transaction.dto";
import AuthError from "../../components/Auth/AuthErrror";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { BALANCE_ROUTE } from "../../components/AppRouter/consts";

const SendPage = () => {
  const [createTransaction, { isSuccess, isLoading, isError, error }] =
    transactionsAPI.useCreateTransactionMutation();

  const [formData, setFormData] = useState({
    money: "",
    email: "",
  });

  const navigate = useNavigate();

  const onChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate(BALANCE_ROUTE);
      }, 3000);
    }
  }, [isSuccess]);

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

        {isError && <AuthError>{(error as any).data.message}</AuthError>}
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
      </PhonePageContent>
    </PhonePage>
  );
};

export default SendPage;
