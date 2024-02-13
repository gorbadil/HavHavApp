import Hero from "../../assets/Hero.png";
import "./Home.css";
function Home() {
  return (
    <div className="home">
      <div className="hero">
        <div className="right-side">
          <h1>Hav mı?</h1>
          <h3>Hav mı? Veteriner Kliniği</h3>
          <h2>Yönetim Paneli</h2>
        </div>
        <img src={Hero} alt="" />
      </div>
    </div>
  );
}

export default Home;
