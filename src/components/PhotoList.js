import ListPanel from "./ListPanel";
import Button from "./Button";
import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import Skeleton from "./Skeleton";
import PhotoListItem from "./PhotoListItem";

function PhotoList({ album }) {

    const { data, isFetching, error: fetchingError } = useFetchPhotosQuery(album);

    const [addPhotoToAlbum, response] = useAddPhotoMutation();

    const { isLoading: isAdding, error: addingError } = response;

    const title =
        <h2 className="text-l">Photos of "{album.title}" Album</h2>;

    const customButton =
        <Button
            className='bg-gray-50 rounded border'
            onClick={() => {
                addPhotoToAlbum(album);
            }}
            loading={isAdding}
        >
            +Add photo
        </Button>;


    let customButtonError = addingError && <div>Error adding a photo...</div>;


    let content;
    if (isFetching) {
        content = <Skeleton times={3} className='h-8 w-full' />
    }
    else if (fetchingError) {
        content = <div className="ml-4 mt-4">Error fetching photos...</div>
    }
    else {
        content = data.map(photo =>
            <PhotoListItem
                key={photo.id}
                photo={photo}
            />);
    }

    const contentClassName = "mx-2 flex flex-row flex-wrap justify-center";

    return (
        <ListPanel
            title={title}
            customButton={customButton}
            customButtonError={customButtonError}
            content={content}
            contentClassName={contentClassName}
        />



    )
}

export default PhotoList;