import UseGlobalContext from "./hooks/UseGlobalContext";

function Home() {
  const { name } = UseGlobalContext();
  console.log(name);
  return (
    <div className="container">
      <h1>Home Page</h1>
    </div>
  );
}

export default Home;
