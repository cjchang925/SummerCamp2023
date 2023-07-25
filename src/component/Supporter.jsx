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
    const [showCostModal, setShowCostModal] = useState(false);
    const [nowEditing, setNowEditing] = useState(0);
    const [index, setIndex] = useState("");
    const [supporterName, setSupporterName] = useState("");
    const [cost, setCost] = useState("");
    const [trigger, setTrigger] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [moneyLeft, setMoneyLeft] = useState([]);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    const getMoneyLeft = async () => {
        const response = await fetch('https://prevexam.dece.nycu.edu.tw/api/get_money', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())

        setMoneyLeft(response);
    }

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

    const handleAddCost = (e) => {
        e.preventDefault();
        setShowCostModal(true);
        setNowEditing(e.target.id);
        setIndex(e.target.name);
    }

    const handleClose = () => {
        setShowModal(false);
        setShowCostModal(false);
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

    const handleFinishAddingCost = async () => {
        if (cost.length === 0) {
            alert('請輸入實際花費！');
            return;
        }
        setShowCostModal(false);
        await fetch('https://prevexam.dece.nycu.edu.tw/api/add_cost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nowEditing, cost, index })
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
        getMoneyLeft();
    }, [display, trigger])

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>
                        <img src='makercamp.png' alt='' width={100} style={{ marginRight: '20px' }} />
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
                <>
                    <h4 style={{ marginLeft: '10vw', marginTop: '30px' }}>各小隊剩餘金額</h4>
                    {windowWidth > 900 ?
                        <Table className="mt-1" striped bordered hover style={{ width: '80vw', margin: 'auto' }}>
                            <thead>
                                <tr>
                                    <th>1</th>
                                    <th>2</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                    <th>6</th>
                                    <th>7</th>
                                    <th>8</th>
                                    <th>9</th>
                                    <th>10</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {moneyLeft.map((ele, id) => (
                                        <td key={id}>{ele}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </Table>
                        :
                        <Table className="mt-1" striped bordered hover style={{ width: '80vw', margin: 'auto' }}>
                            <thead>
                                <tr>
                                    <th>1</th>
                                    <th>2</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {moneyLeft.map((ele, id) => {
                                        if (id < 5) return (
                                            <td key={id}>{ele}</td>
                                        )
                                    })}
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th>6</th>
                                    <th>7</th>
                                    <th>8</th>
                                    <th>9</th>
                                    <th>10</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {moneyLeft.map((ele, id) => {
                                        if (id >= 5) return (
                                            <td key={id}>{ele}</td>
                                        )
                                    })}
                                </tr>
                            </tbody>
                        </Table>
                    }
                    <Table className="mt-4 mb-4" striped bordered style={{ width: windowWidth > 900 ? '80vw' : '100vw', margin: 'auto' }}>
                        <thead>
                            <tr>
                                <th>小隊</th>
                                <th>名稱</th>
                                {windowWidth > 900 ? <th>圖片</th> : <></>}
                                <th>個數</th>
                                <th>花費</th>
                                <th>備註</th>
                                <th>負責隊輔</th>
                                <th>購買狀況</th>
                                <th>新增隊輔/實際花費</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((ele, id) => (
                                <>
                                    <tr key={id}>
                                        <td>{ele.team}</td>
                                        <td>{ele.name}</td>
                                        {windowWidth > 900 ? <td style={{ width: '40%' }}><img src={ele.imageLink} alt='invalid' style={{ width: '100%', minWidth: '70px' }} /></td> : <></>}
                                        <td>{ele.number}</td>
                                        <td>{ele.price}</td>
                                        <td>{ele.comment}</td>
                                        <td>{ele.supporter}</td>
                                        <td>
                                            <Form.Check
                                                name={id}
                                                type="switch"
                                                checked={ele.done === 'true' ? true : false}
                                                onChange={handlePurchase}
                                                disabled={moneyLeft[parseInt(ele.team) - 1] <= 0 ? true : false}
                                            />
                                        </td>
                                        <td>
                                            <Button id={id} size='sm' onClick={handleAddSupporter} style={{ marginRight: '10px' }}>New</Button>
                                            <Button variant="warning" name={id} disabled={ele.done === 'true' ? false : true} id={(parseInt(ele.team) - 1).toString()} size='sm' className={windowWidth <= 900 && "mt-2"} onClick={handleAddCost}>Cost</Button>
                                        </td>
                                    </tr>
                                    {windowWidth <= 900 ?
                                        <tr key={id}>
                                            <td colSpan={8}>
                                                <img src={ele.imageLink} alt='invalid' style={{ width: '100%' }} />
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
                </>
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
            <Modal centered show={showCostModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>實際花費</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type='number' placeholder="花費" onChange={(e) => setCost(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleFinishAddingCost}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Supporter;