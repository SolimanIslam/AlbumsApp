import { GoTrash } from 'react-icons/go'; import Button from "./Button";
import { useThunk } from '../hooks/use-thunk';
import { removeUser } from '../store';
import ExpandablePanel from './ExpandablePanel';
import AlbumList from './AlbumList';

function UserListItem({ user }) {


    const [runRemoveUser, isRemoving, removingError] = useThunk(removeUser);

    const handleClick = () => {
        runRemoveUser(user);
    }

    const removingFailure =  removingError && <div className='ml-8 mr-2'>Error removing user...</div>;



    const header =
        <div>
            <div className='flex items-center'>
                <Button
                    className='mr-2 '
                    onClick={handleClick}
                    loading={isRemoving}
                ><GoTrash />
                </Button>
                {user.name}
            </div>
            {removingFailure}
        </div>;

    return <ExpandablePanel header={header}>
        <AlbumList user={user}/>
    </ExpandablePanel>
}

export default UserListItem;