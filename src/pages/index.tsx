import React from 'react'; React
import type { NextPage } from 'next';
import Head from 'next/head'; Head
import Layout from '../layouts/default'; Layout

const Home: NextPage = () => pug`
  Head
    title Kotokaze's Blog - Home
  Layout
    p Hello World!
`

export default Home
