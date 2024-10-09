import Breadcrumb from '@/components/elements/Breadcrumb';
import PreviewWarning from '@/components/elements/Preview';
import Aside from './Aside';

export interface Props
  extends React.PropsWithChildren,
    Omit<React.ComponentPropsWithoutRef<typeof Aside>, 'children'>,
    React.ComponentPropsWithoutRef<typeof Breadcrumb> {
  readonly child?: React.ReactNode;
  readonly isPreview?: boolean;
}

const WithSidebar: React.FC<Props> = ({ children, title, publisher, tags, child: aside, isPreview = false }) => {
  return (
    <div className='uk-flex uk-width-expand uk-grid-small' data-uk-grid>
      <Aside publisher={publisher} tags={tags}>
        {aside}
      </Aside>

      <main className='uk-width-expand' role='main'>
        <Breadcrumb title={title} />
        <PreviewWarning enabled={isPreview} />
        <section className='uk-section uk-padding uk-padding-remove-top'>{children}</section>
      </main>
    </div>
  );
};

export default WithSidebar;
