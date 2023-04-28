import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { usePostContext } from '../context/post_context';
import { Link } from 'react-router-dom';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
 
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,

  HStack,
  Spinner,

  useToast,
} from '@chakra-ui/react';
import UpdatePostModal from './UpdatePostModal';

function PostsTable({ posts }) {
  const toast = useToast();
  const { fetchPosts, deletePost } = usePostContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deletePost(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchPosts();
    } else {
      return toast({
        position: 'top',
        description: response.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
      {loading ? (
        <HStack my={8} alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </HStack>
      ) : (
        <Table variant='simple'>
          <Thead>
            <Tr>
            <Th>STT</Th>
              <Th>Họ và tên người đăng</Th>
              <Th>Tiêu đề</Th>
              <Th>Số like</Th>
              <Th>Ngày đăng</Th>
              <Th>Trạng thái</Th>
             
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts.map((post, index) => {
              const {  name,title,like,status,createdAt,id } =
                post;
                
              return (
                <Tr key={index}>
                   <Td>{index+1}</Td>
                  <Td>{name}</Td>
                  <Td>{title}</Td>
                  <Td>{like}</Td>
                  <Td>{createdAt}</Td>
                  <Td>{status}</Td>
             
                  <Td>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                        Hành động
                      </MenuButton>
                      <MenuList>
                        <Link to={`/posts/${id}`}>
                          <MenuItem>Xem</MenuItem>
                        </Link>
                        <MenuItem>
                          <UpdatePostModal id={id} />
                        </MenuItem>
                      
                        <MenuItem onClick={() => handleDelete(id)}>
                          Xóa
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </SimpleGrid>
  );
}

export default PostsTable;
