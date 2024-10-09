import { type Route } from 'next';
import IconButton from '@/components/elements/IconButton';
import { type Account } from '@/lib/microcms/types/site-data';

interface Props {
  readonly accounts: Account[];
}

const IconButtonList: React.FC<Props> = ({ accounts }) => {
  accounts.push(
    {
      fieldId: 'account',
      label: 'Git Repository (Source Code)',
      icon: 'git-branch',
      url: 'https://github.com/kotokaze/blog.git',
      uid: 'View Source',
    },
  );

  return (
    <ul className='uk-iconnav'>
      {accounts.map((account, idx) => (
        <li key={idx}>
          <IconButton
            href={account.url.startsWith('http') ? new URL(account.url) : (account.url as Route)}
            aria-label={account.label}
            target='_blank'
            rel='noopener'
            icon={account.icon}
            data-uk-tooltip={(account.uid != null) ? `title: ${account.uid}; pos: bottom` : undefined}
          />
        </li>
      ))}
    </ul>
  );
};

export default IconButtonList;
