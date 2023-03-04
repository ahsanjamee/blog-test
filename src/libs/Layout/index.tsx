import SiteHeader from '../atoms/header/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='layout-wrap'>
      <SiteHeader />
      <div className='layout'>{children}</div>
    </div>
  );
};

export default Layout;
