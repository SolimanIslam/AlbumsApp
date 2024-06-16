
import { GoTrash } from 'react-icons/go'; import Button from "./Button";
import ExpandablePanel from './ExpandablePanel';
import { useRemovePhotoMutation } from "../store";

function PhotoListItem({ photo }) {

    const [removePhoto, response] = useRemovePhotoMutation();

    const handleClick = () => {
        removePhoto(photo);
    }

    const removingFailure = response.isError && <div className='ml-8 mr-2'>Error removing Photo...</div>;



    const header =
        <div>
            <div className='flex items-center'>
                <Button
                    className='mr-2 '
                    onClick={handleClick}
                    loading={response.isLoading}
                ><GoTrash />
                </Button>
                {photo.title}
            </div>
            {removingFailure}
        </div>;

    return (
        <div className='relative m-1 cursor-pointer'>

            <img src={photo.url} className='h-20 w-20' />

            <div
                className='absolute inset-0 flex justify-center items-center opacity-0 hover:bg-gray-200 hover:opacity-80'
            >
                <GoTrash onClick={()=>{
                     removePhoto(photo)
                }}/>

            </div>

        </div>);


}

export default PhotoListItem;