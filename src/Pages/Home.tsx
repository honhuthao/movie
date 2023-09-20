import { HomTemPlate } from "components/templates";
import { PATH } from "constant";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "components/ui/Footer";
import { Header } from "components/ui";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("USER"))) {
      navigate(PATH.login);
    }
    // window.location.reload();
    // dispatch(getLichSuDatVeThunk());
  }, []);
  return (
    <div>
      <Header />
      <HomTemPlate />
      <Footer></Footer>
    </div>
  );
};

export default Home;
