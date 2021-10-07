import React, { useState, useEffect } from 'react';
import { Modal, Image, Button } from 'antd';
import { useCachedImage, useExtendedArt, useArt } from '../../hooks';
import { pubkeyToString, useConnectionConfig } from '@oyster/common';
import { ThreeDots } from '../../components/MyLoader';
export const ArtDetailModal = (props: any) => {
  const { pubkey, ...rest } = props;
  const [loaded, setLoaded] = useState<boolean>(false);

  // const [id, setId] = useState<string>('');
  // const [img_url, setImgUrl] = useState<string> ('');
  // console.log('ArtDetailModal: begin');
  const id = pubkeyToString(pubkey);
  // console.log('ArtDetailModal: id = ', id);
  const art = useArt(pubkey);
  const { env } = useConnectionConfig();

  // console.log('ArtDetailModal: art=', art);
  const { data } = useExtendedArt(id, true);
  console.log('ArtDetailModal: data', data);
  let { cachedBlob } = useCachedImage(data ? data.image || '' : '');
  if (!data)
  {
    cachedBlob = '';
  }
  return (
    <Modal
      bodyStyle={{
        background: '#313442',
        boxShadow: 'none',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid rgb(113, 133, 206)',
        padding: '20px 0px',
      }}
      footer={null}
      width={500}
      {...rest}
    >
      <h2> {data ? data.name || '' : ''}</h2>
      <div
        style={{
          width: '100%',
          height: '1px',
          background: 'gray',
          margin: '10px 0px',
        }}
      ></div>
      <Image
        src={cachedBlob}
        preview={false}
        width={400}
        loading="lazy"
        // wrapperStyle={{ ...style }}
        onLoad={e => {
          setLoaded(true);
        }}
        placeholder={<ThreeDots />}
        {...(loaded ? {} : { height: 300 })}
      />
      <div style={{ display: 'flex', margin: '20px 0px' }}>
        <button
          onClick={() => window.open(art.uri || '', '_blank')}
          className="arw-button"
        >
          VIEW ON ARWEAVE
        </button>
        <button
          className="sol-button"
          style={{ marginLeft: '10px' }}
          onClick={() =>
            window.open(
              `https://explorer.solana.com/account/${art?.mint || ''}${
                env.indexOf('main') >= 0 ? '' : `?cluster=${env}`
              }`,
              '_blank',
            )
          }
        >
          VIEW ON SOLANA
        </button>
      </div>
      <p className="description-title">DESCRIPTION:</p>
      <p className="description">{data ? data.description || '' : ''}</p>
      {data && data.attributes && (
        <>
          <p className="description-title">
            {data.attributes.length} ATTRIBUTES:
          </p>
          <div className="attribute-container">
            {data.attributes.map((item, idx) => (
              <span key={idx} className="attribute">
                {item.trait_type} : {item.value}
              </span>
            ))}
          </div>
        </>
      )}
      <div
        style={{
          width: '100%',
          height: '1px',
          background: 'gray',
          margin: '10px 0px',
        }}
      ></div>
    </Modal>
  );
};
