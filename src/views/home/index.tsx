import useCombinedStore from '@/store';

const Home = () => {
  const clearAll = useCombinedStore((store) => store.clearAll);
  return (
    <div>
      Home
      <button onClick={() => clearAll()}>清除Token</button>
    </div>
  );
};

export default Home;
