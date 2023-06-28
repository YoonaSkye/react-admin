import logo from '@/assets/images/logo.png';
import useCombinedStore from '@/store';

const Logo = () => {
  const collapsed = useCombinedStore((store) => store.collapsed);
  return (
    <div className="logo-box">
      <img src={logo} alt="logo" className="logo-img" />
      {collapsed ? null : <h2 className="logo-text">Hooks Admin</h2>}
    </div>
  );
};

export default Logo;
