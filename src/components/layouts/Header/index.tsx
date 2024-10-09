import { type Route } from 'next';
import Link from 'next/link';

export interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  const pages: {
    href: Route;
    label: string;
    icon: string;
  }[] = [
    { href: '/posts', label: 'Posts', icon: 'pencil' },
    { href: '/slides', label: 'Slides', icon: 'image' },
    { href: '/info', label: 'Info', icon: 'location' },
  ];

  return (
    <header>
      <nav className='uk-navbar-container' data-uk-sticky>
        <div className='uk-container uk-container-expand'>
          <div data-uk-navbar>
            <div className='uk-navbar-left'>
              <ul className='uk-navbar-nav'>
                <Link href='/' className='uk-navbar-item uk-logo'>
                  {title}
                </Link>
              </ul>
            </div>

            <div className='uk-navbar-right'>
              <ul className='uk-navbar-nav uk-visible@m'>
                {pages.map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>

              <ul className='uk-navbar-nav uk-hidden@m'>
                <li>
                  <button
                    type='button'
                    className='uk-navbar-toggle uk-navbar-toggle-animate'
                    data-uk-toggle='target: #offcanvas-nav'
                    data-uk-navbar-toggle-icon
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div id='offcanvas-nav' data-uk-offcanvas='flip: true; overlay: true'>
        <div className='uk-offcanvas-bar'>
          <ul className='uk-nav uk-nav-default'>
            <li>
              <Link href='/'>
                <span className='uk-margin-small-right' data-uk-icon='icon: home' /> Home
              </Link>
            </li>

            {pages.map(({ href, icon, label }) => (
              <li key={label}>
                <Link href={href}>
                  <span className='uk-margin-small-right' data-uk-icon={`icon: ${icon}`} /> {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
