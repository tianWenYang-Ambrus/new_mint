import Head from 'next/head';
import { Button } from '@mui/material';
import Roadmap from '@components/roadmap';
import Header from '@components/header';
import Body from '@components/body';
import Footer from '@components/footer';
import Router from 'next/router';

export default function Home() {
  return (
    <div className="main-container">
      {/* <Button
        onClick={() => {
          Router.push('/test');
        }}
      >
        test
      </Button>*/}
      <Header />
      <Body />
      <Footer />
      <Roadmap />
    </div>
  );
}
