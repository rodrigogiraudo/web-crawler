import { ReactElement } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { VStack, Box, Table, TableCaption, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import { buildUrlParams } from '../utils';
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const baseUrl = `${process.env.API_URL}/api/web`;
  const requestUrl = `${baseUrl}?${buildUrlParams(query)}`;
  const web = await (await fetch(requestUrl)).json();
  return {
    props: {
      web
    }
  };
};
const renderTableRow = (library: { name: string; count: number }): ReactElement => (
  <Tr key={`${library?.name}_${library?.count}`}>
    <Td>{library.name}</Td>
    <Td>{library.count}</Td>
  </Tr>
);
const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ web }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Web Crawler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <VStack spacing={[16, 16, 16, 16]} align="center" as="main">
          {web.error ? (
            <p>{web.result}</p>
          ) : (
            <Table variant="simple">
              <TableCaption>Top Js Libraries</TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Occurences</Th>
                </Tr>
              </Thead>
              <Tbody>{web.result.map((library) => renderTableRow(library))}</Tbody>
            </Table>
          )}
        </VStack>
      </Box>
    </div>
  );
};

export default Home;
