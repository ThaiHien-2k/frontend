import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  SidebarWithHeader,
 
//   postDetail,

} from '../components';
import PostDetail from '../components/PostDetail';
import { usePostContext } from '../context/post_context';
import { VStack, Heading, Spinner, Stack } from '@chakra-ui/react';

function PostDetailPage() {
  const { id } = useParams();
  const {
    single_post_loading: loading,
    single_post_error: error,
    single_post: post,
    fetchSinglePost,
  } = usePostContext();

  useEffect(() => {
    fetchSinglePost(id);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <SidebarWithHeader>
        <VStack alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </VStack>
      </SidebarWithHeader>
    );
  }

  if (error) {
    return (
      <SidebarWithHeader>
        <VStack alignItems='center' justifyContent='center'>
          <Heading color='red.500'>There was an error</Heading>
        </VStack>
      </SidebarWithHeader>
    );
  }


  return (
    <SidebarWithHeader>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        spacing='8'
        alignItems='flex-start'
        bg='white'
        p='8'
        mb={4}
        borderRadius='lg'
        shadow='sm'
        overflowX='auto'
      >
     
        <PostDetail post={post} />
      </Stack>
     
    </SidebarWithHeader>
  );
}

export default PostDetailPage;
