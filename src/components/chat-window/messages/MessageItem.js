import React from 'react';
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../../../components/ProfileAvatar';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

const MessageItem = ({ message }) => {
  const { author, createdAt, text } = message;
  return (
    <li className="padded mb-1">
      <div className="align-items-center d-flex font-bolder mb-1">
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />
        <span className="ml-2">{author.name}</span>
        <ProfileInfoBtnModal
          profile={author}
          appearance="link"
          className="p-0 ml-1 text-black"
        />
        <TimeAgo
          datetime={createdAt}
          className="font-formal text-black-45 ml-2"
        />
      </div>
      <div>
        <span className="word-break-all">{text}</span>
      </div>
    </li>
  );
};

export default MessageItem;
