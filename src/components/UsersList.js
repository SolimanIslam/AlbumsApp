import { useSelector } from "react-redux";
import Skeleton from "./Skeleton";
import Button from "./Button";
import UserListItem from "./UserListItem";
import { useThunk } from '../hooks/use-thunk';
import { fetchUsers, addUser } from '../store/index';
import { useEffect } from "react";
import ListPanel from "./ListPanel";


function UsersList() {
  const [runFetchUsers, isFetching, fetchingError] = useThunk(fetchUsers);

  const { data } = useSelector(state => state.users);

  const [runAddUser, isAdding, addingError] = useThunk(addUser);

  const handleAddUserClicks = () => {
    runAddUser();
  }

  useEffect(() => {
    runFetchUsers();
  }, [runFetchUsers]);


  const title = <h1 className="text-xl">List of Users</h1>;

  const customButton =
    <Button
      className='bg-gray-50 rounded border'
      onClick={handleAddUserClicks}
      loading={isAdding}
    >+Add User</Button> ;
    
    
  let customButtonError = addingError && <div>Error adding a user...</div> ;

  let content;
  if (isFetching) { 
    content = <Skeleton times={7} className='h-8 w-full' /> }
  else if (fetchingError) {
    content = <div className="ml-4 mt-4">Error Fetching users...</div>
  }
  else {
    content = data.map(user => <UserListItem key={user.id} user={user} />);
  }


  return (
      <ListPanel
        title={title}
        customButton={customButton}
        content={content}
        customButtonError={customButtonError}
      />
  );
}

export default UsersList;