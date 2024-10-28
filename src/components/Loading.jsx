const Loading = () => {
  return (
    <div className="text-center mt-5 bg-white">
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>

      <h1 className="text-center display-3">LOADING...</h1>
    </div>
  );
};

export default Loading;
