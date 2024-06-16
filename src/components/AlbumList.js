import ListPanel from "./ListPanel";
import Button from "./Button";
import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import AlbumListItem from "./AlbumListItem";

function AlbumList({ user }) {

    const { data, isFetching, error: fetchingError} = useFetchAlbumsQuery(user);

    console.log(useFetchAlbumsQuery(user))

    const [addAlbumToUser, response] = useAddAlbumMutation();

    const { isLoading: isAdding, error: addingError } = response;

    const title =
        <h2 className="text-l">Albums of {user.name}</h2>;

    const customButton =
        <Button
            className='bg-gray-50 rounded border'
            onClick={() => {
                addAlbumToUser(user);
            }}
            loading={isAdding}
        >
            +Add Album
        </Button>;


    let customButtonError = addingError && <div>Error adding an album...</div>;


    let content;
    if (isFetching) {
        content = <Skeleton times={3} className='h-8 w-full' />
    }
  
    else if (fetchingError) {
        content = <div className="ml-4 mt-4">Error fetching albums...</div>
    } else  {
        content = data.map(album => <AlbumListItem key={album.id} album={album} />);
    } 
    
    

    return (
        <ListPanel
            title={title}
            customButton={customButton}
            customButtonError={customButtonError}
            content={content}
        />



    )
}

export default AlbumList;