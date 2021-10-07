import React from 'react';
import { Layout } from 'antd';

import { LABELS } from '../../constants';
import { AppBar } from '../AppBar';
import useWindowDimensions from '../../utils/layout';

const { Header, Content } = Layout;

const paddingForLayout = (width: number) => {
  if (width <= 768) return '5px 10px';
  if (width > 768) return '0px 0px';
};

export const AppLayout = React.memo((props: any) => {
  const { width } = useWindowDimensions();

  return (
    <>
      <Layout
        title={LABELS.APP_TITLE}
        style={{
          padding: paddingForLayout(width),
          // background: 'url(/img/back.jpg) 50% no-repeat fixed!important',
          // backgroundSize: '100% 100%!important'
        }}
        className="root"
        
      >
        <Header className="App-Bar">
          <AppBar />
        </Header>
        <Content style={{ overflow: 'scroll', paddingBottom: 50, maxWidth:1200, margin: 'auto', minHeight:'95vh' }}>
          {props.children}
        </Content>
      </Layout>
    </>
  );
});
