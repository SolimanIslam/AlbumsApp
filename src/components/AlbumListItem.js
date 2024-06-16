import { GoTrash } from 'react-icons/go'; import Button from "./Button";
import ExpandablePanel from './ExpandablePanel';
import {useRemoveAlbumsMutation} from "../store";
import PhotoList from './PhotoList';

function AlbumListItem({ album }) {

    const [removeAlbum, response] = useRemoveAlbumsMutation();

    const handleClick = () => {
        removeAlbum(album);
    }

    const removingFailure =  response.isError && <div className='ml-8 mr-2'>Error removing Album...</div>;



    const header =
        <div>
            <div className='flex items-center'>
                <Button
                    className='mr-2 '
                    onClick={handleClick}
                    loading={response.isLoading}
                ><GoTrash />
                </Button>
                {album.title}
            </div>
            {removingFailure}
        </div>;

    return <ExpandablePanel header={header}>
        <PhotoList album={album}/>
    </ExpandablePanel>
}

export default AlbumListItem;