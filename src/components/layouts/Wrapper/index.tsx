export interface Props extends React.PropsWithChildren {
}

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <article className='uk-container uk-margin-top uk-margin-bottom'>
      <div id='oversized' className='uk-flex uk-grid-small' data-uk-grid>
        {children}
      </div>
    </article>
  );
};

export default Wrapper;
