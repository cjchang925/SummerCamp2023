import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import './Welcome.css'

const Welcome = () => {
    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Card className="card text-center" style={{ width: '20%', minWidth: '250px', margin: 'auto', padding: '50px 20px' }}>
                <Card.Img src='makercamp.png' />
                <Card.Body className='mt-4'>
                    <Stack gap={4}>
                        <Button className='button' href='/student' >我是小隊員 (´･ω･`)</Button>
                        <Button className='button' href='/supporter' >我是小隊輔 ʕ •ᴥ•ʔ</Button>
                    </Stack>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Welcome;