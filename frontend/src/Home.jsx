import UseGlobalContext from "./hooks/UseGlobalContext";

function Home() {
  const values = UseGlobalContext();
  console.log(values);
  return (
    <div className="container">
      <h1>Home Page</h1>
    </div>
  );
}

export default Home;
