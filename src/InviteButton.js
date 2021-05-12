import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const InviteButton = (props) => {
  const [copied, setCopied] = useState(false);

  return (
    <div>
      <Popup
        trigger={
          <button className="uppercase font-bold text-base">[Invite]</button>
        }
        position="left center"
      >
        <div>
          <h4>Get Link</h4>
          <CopyToClipboard
            text={
              'http://localhost:1234/' +
              props.id +
              '/workspaces/' +
              props.workspace._id
            }
            onCopy={() => setCopied(true)}
          >
            <button className="bg-yellow-300 border px-1 border-black">
              Copy to clipboard
            </button>
          </CopyToClipboard>

          {copied ? <span style={{ color: 'red' }}>Copied!</span> : null}
        </div>
      </Popup>
    </div>
  );
};

export default InviteButton;
