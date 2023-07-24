import AddElement from "./AddElement";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import './Welcome.css'
import { Form } from "react-bootstrap";

const Supporter = () => {
    const [list, setList] = useState([]);
    const [display, setDisplay] = useState("list");
    const [showModal, setShowModal] = useState(false);
    const [nowEditing, setNowEditing] = useState(0);
    const [supporterName, setSupporterName] = useState("");
    const [trigger, setTrigger] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        // Add event listener to update windowWidth on resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getElement = async () => {
        const response = await fetch('https://prevexam.dece.nycu.edu.tw/api/get_element', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        setList(response);
    }

    const handleAddSupporter = (e) => {
        e.preventDefault();
        setShowModal(true);
        setNowEditing(e.target.id);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    const handleFinishAddingSupporter = async () => {
        if (supporterName.length === 0) {
            alert('請輸入姓名！');
            return;
        }
        setShowModal(false);
        await fetch('https://prevexam.dece.nycu.edu.tw/api/add_supporter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nowEditing, supporterName })
        }).then(() => setTrigger(!trigger))
    }

    const handlePurchase = async (e) => {
        await fetch('https://prevexam.dece.nycu.edu.tw/api/done', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: e.target.name, done: e.target.checked })
        }).then(() => setTrigger(!trigger))
    }

    useEffect(() => {
        getElement();
    }, [display, trigger])

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>
                        <img src='makercamp.png' width={100} style={{ marginRight: '20px' }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => setDisplay('list')}>購買清單</Nav.Link>
                            <Nav.Link onClick={() => setDisplay('purchase')}>新增購買項目</Nav.Link>
                            <Nav.Link href='/'>回首頁</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {display === 'list' ?
                <Table className="mt-4 mb-4" striped bordered style={{ width: windowWidth > 900 ? '80vw' : '100vw', margin: 'auto' }}>
                    <thead>
                        <tr>
                            <th>小隊</th>
                            <th>名稱</th>
                            {windowWidth > 900 ? <th>圖片</th> : <></>}
                            <th>個數</th>
                            <th>預計花費</th>
                            <th>備註</th>
                            <th>負責隊輔</th>
                            <th>新增隊輔</th>
                            <th>購買狀況</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((ele, id) => (
                            <>
                                <tr key={id}>
                                    <td>{ele.team}</td>
                                    <td>{ele.name}</td>
                                    {windowWidth > 900 ? <td style={{ width: '40%' }}><img src={ele.imageLink} alt='invalid image' style={{ width: '100%', minWidth: '70px' }} /></td> : <></>}
                                    <td>{ele.number}</td>
                                    <td>{ele.price}</td>
                                    <td>{ele.comment}</td>
                                    <td>{ele.supporter}</td>
                                    <td><Button id={id} size='sm' onClick={handleAddSupporter}>New</Button></td>
                                    <td>
                                        <Form.Check
                                            name={id}
                                            type="checkbox"
                                            checked={ele.done === 'true' ? true : false}
                                            onChange={handlePurchase}
                                        />
                                    </td>
                                </tr>
                                {windowWidth <= 900 ?
                                    <tr>
                                        <td colSpan={8}>
                                            <img src={ele.imageLink} alt='invalid image' style={{ width: '100%' }} />
                                        </td>
                                    </tr>
                                    :
                                    <></>
                                }
                            </>
                        ))}
                    </tbody>
                    <div style={{ height: '30px' }}></div>
                </Table>
                :
                <AddElement />
            }
            <Modal centered show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>設定隊輔</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type='text' placeholder="填寫姓名" onChange={(e) => setSupporterName(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleFinishAddingSupporter}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Supporter;