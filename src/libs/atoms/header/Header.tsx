import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../Button/Button';

type IHeaderProps = {};

const SiteHeader: React.FC<IHeaderProps> = ({}) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (url: string) => {
    setShowMenu(false);
    navigate(url);
  };

  const menuItems = () => (
    <>
      <Button
        variant='primary'
        text='Dashboard'
        margin='0 0 0 20px'
        height='44px'
        onClick={() => handleMenuClick('/dashboard')}
      />
    </>
  );

  return (
    <>
      <div className='header--wrap'>
        <div className='header--content'>
          <div>
            <div className='font-h2' onClick={() => navigate('/')}>
              Home
            </div>
          </div>
          <div className='flex-center'>
            <div className='header--buttons flex-center'>{menuItems()}</div>

            {/* mobile menu icon */}
            <div className='show--menu' onClick={() => setShowMenu(!showMenu)}>
              <div className={`hamburger--icon ${showMenu ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showMenu && (
        <div className='mobile--menu'>
          <div className='menu--wrap'>{menuItems()}</div>
        </div>
      )}
    </>
  );
};

export default SiteHeader;
