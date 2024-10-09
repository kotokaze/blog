import Link from 'next/link';

interface Props {
  readonly enabled: boolean;
}

const PreviewWarning: React.FC<Props> = ({ enabled }) => {
  if (!enabled) return null;

  return (
    <>
      <div className='uk-alert-danger' data-uk-alert>
        <p>プレビューモードで表示中</p>
        <button type='button' className='uk-alert-close' data-uk-close />
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
