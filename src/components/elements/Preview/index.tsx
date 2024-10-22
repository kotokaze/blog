import Link from 'next/link';

interface Props {
  readonly enabled: boolean;
}

const PreviewWarning: React.FC<Props> = ({ enabled }) => {
  if (!enabled) return null;

  return (
    <>
      <div className='uk-alert-danger tm-border-rounded-large' data-uk-alert>
        <button type='button' className='uk-alert-close' data-uk-close />
        <p>プレビューモードで表示中</p>
      </div>

      <Link
        href='/api/deactivate'
        aria-hidden='true'
        prefetch={false}
        className='uk-button uk-button-default uk-position-bottom-right uk-position-fixed'
      >
        <span data-uk-icon='trash'></span> Cookie 削除
      </Link>
    </>
  );
};

export default PreviewWarning;
