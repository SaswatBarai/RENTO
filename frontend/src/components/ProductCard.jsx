import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export function ProductCard({make, model, availablity,rentalRate, imageUrl}) {
  return (
    <Card
      sx={{
        width: 320,
        maxWidth: '100%',
        boxShadow: 'lg',
        background: '#fff',
        border: '1px solid #1e293b', // slate-800
        color: '#0a0a0a',
      }}
    >
      <CardOverflow sx={{ background: '#1e293b', p: 0, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
        <AspectRatio sx={{ minWidth: 200, borderTopLeftRadius: 12, borderTopRightRadius: 12, overflow: 'hidden', m: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
            loading="lazy"
            alt="Product"
            style={{ display: 'block', width: '100%', height: '100%', borderRadius: 0, border: 'none', background: '#1e293b' }}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="body-xs" sx={{ color: '#2563eb', fontWeight: 600 }}>{model}</Typography>
        <Link
          href="#product-card"
          color="primary"
          textColor="#0a0a0a"
          overlay
          endDecorator={<ArrowOutwardIcon sx={{ color: '#2563eb' }} />}
          sx={{ fontWeight: 'md', '&:hover': { color: '#2563eb' } }}
        >
          {make}
        </Link>

        {
          availablity ? (
            <Typography
              level="title-lg"
              sx={{ mt: 1, fontWeight: 'xl', color: '#0a0a0a' }}
              endDecorator={
                <Chip component="span" size="sm" variant="soft" sx={{ background: 'green', color: '#fff' }}>
                  Available
                </Chip>
              }
            >
              RS {rentalRate}/hour
            </Typography>
          ) : (
            <Typography
              level="title-lg"
              sx={{ mt: 1, fontWeight: 'xl', color: '#0a0a0a' }}
              endDecorator={
                <Chip component="span" size="sm" variant="soft" sx={{ background: 'red', color: '#fff' }}>
                  Not Available
                </Chip>
              }
            >
              {rentalRate} / day
            </Typography>
          )
          
        }
      </CardContent>
      <CardOverflow >
        <Button
        className='border-none'
          variant="solid"
          sx={{
            background: '#2563eb',
            color: '#fff',
            fontWeight: 700,
            '&:hover': { background: '#1e40af' },
            width: '100%',
          }}
          size="lg"
        >
         Book Now
        </Button>
      </CardOverflow>
    </Card>
  );
}
