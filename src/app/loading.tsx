import 'server-only';

const Loading: React.FC = () => {
  return (
    <div className='uk-flex uk-flex-center uk-flex-middle' data-uk-height-viewport='offset-height: true; offset-bottom: 30'>
      <div className='uk-text-center'>
        <div data-uk-spinner='ratio: 3'></div>
        <p className='uk-margin-small-top'>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
