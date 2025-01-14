import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Avatar,
  CircularProgress,
} from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import cblogo from './cblogo.png'; // Replace with your logo

const useStyles = makeStyles((theme) => ({
  grow: { flexGrow: 1 },
  appbar: {
    background: '#1f2937',
    color: '#ffffff',
    padding: '0.5em 1em',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
  },
  title: {
    fontWeight: 600,
    letterSpacing: '0.05em',
  },
  mainContainer: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://source.unsplash.com/featured/?nature)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1em',
  },
  imageCard: {
    maxWidth: 500,
    borderRadius: '15px',
    background: '#ffffff',
    boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
  },
  media: { height: 300 },
  detail: { textAlign: 'center', padding: '1.5em' },
  buttonGrid: { textAlign: 'center', marginTop: '1em' },
  clearButton: {
    background: 'linear-gradient(45deg, #f44336, #ff7961)',
    color: '#ffffff',
    padding: '0.7em 2em',
    fontSize: '1rem',
    borderRadius: '8px',
    '&:hover': {
      background: 'linear-gradient(45deg, #d32f2f, #e57373)',
    },
  },
  dropzone: {
    border: '2px dashed #9e9e9e',
    borderRadius: '8px',
    background: '#fafafa',
    padding: '2em',
    textAlign: 'center',
    '&:hover': { background: '#f5f5f5' },
  },
}));

const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setImage(true);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleSubmit = () => {
    if (!selectedFile) return;
    setIsloading(true);
    setTimeout(() => {
      // Mock response
      setData({ class: 'Healthy Leaf', confidence: 0.98 });
      setIsloading(false);
    }, 2000);
  };

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Wheat Leaf Disease Classification
          </Typography>
          <div className={classes.grow} />
          <Avatar src={cblogo} />
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} className={classes.mainContainer}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={8} md={6}>
            <Card className={classes.imageCard}>
              {!image ? (
                <CardContent className={classes.detail}>
                  <DropzoneArea
                    dropzoneClass={classes.dropzone}
                    acceptedFiles={['image/*']}
                    dropzoneText="Drag and drop a wheat plant leaf image"
                    onChange={(files) => setSelectedFile(files[0])}
                  />
                </CardContent>
              ) : (
                <CardMedia className={classes.media} image={preview} />
              )}
              {data && (
                <CardContent className={classes.detail}>
                  <Typography variant="h6" color="textPrimary">
                    Classification: {data.class}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Confidence: {(data.confidence * 100).toFixed(2)}%
                  </Typography>
                </CardContent>
              )}
              {isLoading && (
                <CardContent className={classes.detail}>
                  <CircularProgress />
                  <Typography variant="body1">Processing...</Typography>
                </CardContent>
              )}
            </Card>
            <div className={classes.buttonGrid}>
              {image && !isLoading && (
                <Button
                  className={classes.clearButton}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              )}
              {data && (
                <Button
                  className={classes.clearButton}
                  onClick={() => {
                    setData(null);
                    setImage(false);
                  }}
                  style={{ marginLeft: '1em' }}
                >
                  Clear
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default ImageUpload;
