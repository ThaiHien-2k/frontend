import React from 'react';
import {
//   PostsTable,
  SidebarWithHeader,
//   CreateNewPostModal,
} from '../components';
import PostsTable from '../components/PostTable';

import CreateNewPostModal from '../components/CreateNewPostModal';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { usePostContext } from '../context/post_context';
import { Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useState,useEffect } from 'react';

function PostsPage() {
  const {
    posts,
    posts_loading: loading,
    posts_error: error,
    fetchPosts,
  } = usePostContext();

  const handleRefresh = async () => {
 
  
    
 
      setPostList(posts);
   
  

    await fetchPosts();
  };
  const [postList, setPostList] = useState([]);

  useEffect(() => {
  
    
 
          setPostList(posts);
       
      
  }, [])

  function setSearchTerm(e){
    // posts = posts.filter(post => post.countryID < 60);
    const results = posts.filter(post => {
      if (e === "") return postList
      return post.name.toLowerCase().includes(e.toLowerCase())
      })
      setPostList(results);
    console.log(postList);
  }

  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <CreateNewPostModal />
          <Button
            colorScheme='brown'
            variant='outline'
            leftIcon={<MdOutlineRefresh />}
            onClick={handleRefresh}
          >
            Tải lại
          </Button>
        </HStack>
        <VStack alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </VStack>
      </SidebarWithHeader>
    );
  }

  if (error) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <CreateNewPostModal />
          <Button
            colorScheme='brown'
            variant='outline'
            leftIcon={<MdOutlineRefresh />}
            onClick={handleRefresh}
          >
            Tải lại
          </Button>
        </HStack>
        <VStack alignItems='center' justifyContent='center'>
          <Heading color='red.500'>There was an error</Heading>
        </VStack>
      </SidebarWithHeader>
    );
  }

  return (
    <SidebarWithHeader>
      <HStack mb={5}>
      
        <Input icon='search'
       placeholder='Nhập tên cần tìm' 
      onChange={(event) => {
        setSearchTerm(event.target.value);
      }}
      />
        <CreateNewPostModal />
        <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Tải lại
        </Button>
      </HStack>
     
      <PostsTable posts={postList} />
    </SidebarWithHeader>
  );
}

export default PostsPage;
