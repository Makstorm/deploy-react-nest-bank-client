import BackArrow from "../../components/Navigations/BackwardArrow";
import PhonePage from "../../components/Phone/PhonePage";
import PhonePageContent from "../../components/Phone/PhonePageContent";
import ConfirmButton from "../../components/Navigations/ConfirmButton";
import SectioTitle from "../../components/Common/SectionTitle/SectionTitle";
import Divider from "../../components/Common/Divider";
import { useAppDispatch } from "../../hooks/redux";
import { logOut } from "../../store/reducers/UserSlice";
import { useNavigate } from "react-router-dom";
import { INDEX_ROUTE } from "../../components/AppRouter/consts";
import EmailChangeForm from "../../components/Forms/EmailChangeForm";
import PasswordChangeForm from "../../components/Forms/PasswordChangeForm";

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const navigate = useNavigate();

  return (
    <PhonePage>
      <section style={{ marginTop: "50px", padding: "0 20px" }}>
        <BackArrow title="Settings" />
      </section>

      <PhonePageContent>
        <SectioTitle>Change email</SectioTitle>

        <EmailChangeForm />

        <Divider />

        <SectioTitle>Change password</SectioTitle>

        <PasswordChangeForm />

        <Divider />

        <ConfirmButton
          danger={true}
          outline={true}
          onClick={() => {
            localStorage.removeItem("token");
            dispatch(logOut());
            navigate(INDEX_ROUTE);
          }}
        >
          Log out
        </ConfirmButton>
      </PhonePageContent>
    </PhonePage>
  );
};

export default SettingsPage;
