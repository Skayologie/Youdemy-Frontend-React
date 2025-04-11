import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function CardCourse(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        
        <div className='h-[250px] w-[100%] '>
          <img className='h-full w-full object-cover' src="https://i.pinimg.com/736x/72/3f/66/723f6680a44137670ab57b8e2b1b872c.jpg" alt="" />

        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}