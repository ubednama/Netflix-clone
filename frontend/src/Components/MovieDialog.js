import * as React from 'react';
import { RxCross2 } from "react-icons/rx";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useSelector, useDispatch } from "react-redux";
import { setOpen } from '../redux/movieSlice';
import VideoBackground from './VideoBackground';

export default function MovieDialog() {
  const { open, movie } = useSelector(store => store.movie);
  const dispatch = useDispatch();
  const dialogRef = React.useRef(null);

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (dialogRef.current) {
        const { clientWidth, clientHeight } = dialogRef.current;
        setDialogWidth(clientWidth);
        setDialogHeight(clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Call once initially
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [dialogWidth, setDialogWidth] = React.useState(window.innerWidth);
  const [dialogHeight, setDialogHeight] = React.useState(window.innerHeight);

  // Calculate video dimensions
  const videoWidth = Math.max(dialogWidth * 0.8, dialogHeight * (16 / 9)); // Set max width to 80% of dialog width
  const videoHeight = Math.max(dialogHeight * 0.9, dialogWidth * (9 / 16)); // Set min height to 90% of dialog height

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="xl"
        PaperProps={{
          ref: dialogRef,
          style: {
            // maxWidth: dialogWidth * 0.8, // Set max width to 80% of viewport width
            // height: '90vh', // Set height to 90% of viewport height
            width: "90vw",
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden', // Hide scrollbar
          }
        }}
      >
        <DialogActions>
          <Button onClick={handleClose}><RxCross2 color='black'/></Button>
        </DialogActions>
        <DialogContent className='overflow-hidden'>
          <VideoBackground className="w-[80%]" movieId={movie?.id} bool={true} height={videoHeight} width={videoWidth} />
          <DialogContentText id="alert-dialog-description">
            <b>{movie?.title}<br/></b>
            {movie?.overview}<br/>
            Language: {movie?.original_language}<br/>
            Rating: {movie?.vote_average}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}