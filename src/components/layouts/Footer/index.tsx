interface Props extends React.PropsWithChildren {
}

const Footer: React.FC<Props> = ({ children }) => {
  return (
    <footer>
      <div className='uk-text-center'>
        <div className='uk-margin-remove-top uk-hidden@m'>{children}</div>

        <div className='uk-section uk-section-default uk-section-small'>
          <p className='uk-text-meta'>This site analyzing traffics anonymously to improve user experience</p>

          <dl className='uk-description-list uk-text-bottom'>
            <dt className='uk-text-capitalize'>Copyright &copy; 2021 - 2024</dt>
            <dd>All rights reserved.</dd>
          </dl>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
