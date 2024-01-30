import BackArrow from "../../components/Navigations/BackwardArrow";
import PhonePage from "../../components/Phone/PhonePage";
import PhonePageContent from "../../components/Phone/PhonePageContent";
import { useEffect, useState } from "react";
import MoneyInput from "../../components/Common/MoneyInput";
import Divider from "../../components/Common/Divider";
import SectioTitle from "../../components/Common/SectionTitle/SectionTitle";
import PaymentSystemCard from "../../components/Receive/PaymentSystemCard";
import { PaymentSysytemsType } from "../../models/enums/payment-system.enum";
import { transactionsAPI } from "../../store/services/TransactionsService";
import { AccountRemplenishmentDto } from "../../models/dto/account-replenishment.dto";
import AuthError from "../../components/Auth/AuthErrror";
import { BallTriangle } from "react-loader-spinner";
import { BALANCE_ROUTE } from "../../components/AppRouter/consts";
import { useNavigate } from "react-router-dom";

const ReceivePage = () => {
  const [accountReplenishment, { isSuccess, isLoading, isError, error }] =
    transactionsAPI.useCreateAccountReplenishmentMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate(BALANCE_ROUTE);
      }, 3000);
    }
  }, [isSuccess]);

  const [formData, setFormData] = useState({
    money: "",
  });

  const onChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  // const navigate = useNavigate();

  const onClick = (dto: AccountRemplenishmentDto): void => {
    accountReplenishment(dto);
  };

  return (
    <PhonePage className="grey-bg">
      <section style={{ marginTop: "50px", padding: "0 20px" }}>
        <BackArrow title="Receive" />
      </section>

      <PhonePageContent>
        <MoneyInput title="Receive" onInputChange={onChange} />

        <Divider />

        <SectioTitle>Payment system</SectioTitle>

        <PaymentSystemCard
          amount={+formData.money}
          onClickApi={onClick}
          type={PaymentSysytemsType.STRIPE}
        />
        <PaymentSystemCard
          amount={+formData.money}
          onClickApi={onClick}
          type={PaymentSysytemsType.COINBASE}
        />

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
        {isError && <AuthError>{(error as any).data.message}</AuthError>}
        {isSuccess && <AuthError success>Paymant successfull</AuthError>}
      </PhonePageContent>
    </PhonePage>
  );
};

export default ReceivePage;
