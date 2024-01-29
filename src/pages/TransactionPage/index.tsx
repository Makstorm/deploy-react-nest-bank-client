// import { useLocation, useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import BackArrow from "../../components/Navigations/BackwardArrow";

import PhonePage from "../../components/Phone/PhonePage";
import PhonePageContent from "../../components/Phone/PhonePageContent";
import { transactionsAPI } from "../../store/services/TransactionsService";
import PaymentBar from "../../components/Transactions/PaymentBar";
import { TransactionType } from "../../models/enums/transaction.enum";
import TransactionData from "../../components/Transactions/TransactionData";
import { useAppSelector } from "../../hooks/redux";
import { ITransaction } from "../../models/ITransaction";
import { BallTriangle } from "react-loader-spinner";

const TransactionPage = () => {
  // const dispatch = useAppDispatch();

  // const navigate = useNavigate();

  const email = useAppSelector((state) => state.userReduser.user?.email);

  const { id } = useParams();

  const { data, isLoading } = transactionsAPI.useFetchOneTransactionQuery(
    String(id)
  );

  const getType = (transaction: ITransaction) => {
    if (transaction.type === TransactionType.REMPLENISHABLE) {
      return TransactionType.REMPLENISHABLE;
    }

    return transaction.type === TransactionType.CONSUMABLE &&
      transaction.senderEmail === email
      ? TransactionType.CONSUMABLE
      : TransactionType.PROFITABLE;
  };

  // if (!data) {
  //   return <div>Ops thre isnt any transaction</div>;
  // }

  return (
    <PhonePage className="grey-bg">
      <section style={{ marginTop: "50px", padding: "0 20px" }}>
        <BackArrow title="Transaction" />
      </section>

      <PhonePageContent>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#5b94e9"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <>
            <PaymentBar
              type={getType(data as ITransaction)}
              amount={data ? data.amount : 0}
            />

            <TransactionData transaction={data ? data : null} />
          </>
        )}
      </PhonePageContent>
    </PhonePage>
  );
};

export default TransactionPage;
