import React, { useEffect, useState } from 'react';
import { ArtCard } from '../../components/ArtCard';
import { Layout, Row, Col, Tabs } from 'antd';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import { useCreatorArts, useUserArts } from '../../hooks';
import { useMeta } from '../../contexts';
import { CardLoader } from '../../components/MyLoader';
import { useWallet } from '@solana/wallet-adapter-react';
import { ArtDetailModal } from '../artdetail';
const { TabPane } = Tabs;

const { Content } = Layout;

export enum ArtworkViewState {
  Metaplex = '0',
  Owned = '1',
  Created = '2',
}

export const ArtworksView = () => {
  const { connected, publicKey } = useWallet();
  const ownedMetadata = useUserArts();
  const createdMetadata = useCreatorArts(publicKey?.toBase58() || '');
  const { metadata, isLoading } = useMeta();
  const [activeKey, setActiveKey] = useState(ArtworkViewState.Metaplex);
  //Acer: modal dialog related
  const [pubkey, setPubKey] = useState();
  const [showDetaildialog, setDetailDialogVisible] = useState(false);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  // const items =
  //   activeKey === ArtworkViewState.Owned
  //     ? ownedMetadata.map(m => m.metadata)
  //     : activeKey === ArtworkViewState.Created
  //     ? createdMetadata
  //     : metadata;
  const items = ownedMetadata.map(m => m.metadata)

  useEffect(() => {
    // if (connected) {
      setActiveKey(ArtworkViewState.Owned);
    // } else {
      // setActiveKey(ArtworkViewState.Metaplex);
    // }
  }, [connected, setActiveKey]);

  const showDetail = (pubkey) => {
    console.log('ArtWorks:show detail', pubkey);
    setPubKey(pubkey);
    setDetailDialogVisible(true);
  };

  const artworkGrid = (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {!isLoading
        ? items.map((m, idx) => {
            const id = m.pubkey;
            return (
              <div onClick={()=>showDetail(m.pubkey)} key={idx}>
                <ArtCard
                  key={id}
                  pubkey={m.pubkey}
                  preview={false}
                  height={250}
                  width={250}
                />
              </div>
            );
          })
        : [...Array(8)].map((_, idx) => <CardLoader key={idx} />)}
    </Masonry>
  );

  return (
    <>
    <Layout style={{ margin: 0, marginTop: 30 }}>
      <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Col style={{ width: '100%', marginTop: 10 }}>
          <Row>
            {artworkGrid}
          </Row>
        </Col>
      </Content>
    </Layout>
    { !isLoading && 
      <ArtDetailModal visible={showDetaildialog} pubkey={pubkey} onCancel={()=>setDetailDialogVisible(false)}/>
    }
    </>
  );
};
