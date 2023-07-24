import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";

const AddElement = () => {
    const [team, setTeam] = useState("");
    const [name, setName] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [number, setNumber] = useState("");
    const [price, setPrice] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (team.length === 0) {
            alert('請填寫第幾小隊！');
            return;
        }
        await fetch('http://140.113.160.136:6789/api/add_element', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ team, name, imageLink, number, price, comment, supporter: "", done: 'false' })
        }).then(() => alert('新增成功！可至購買清單確認圖片是否正常顯示。'))
    }

    return (
        <>
            <Form className="mt-5" style={{ marginLeft: '20%', marginRight: '20%' }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>第幾小隊</Form.Label>
                    <Form.Control type="text" onChange={(e) => setTeam(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>材料名稱</Form.Label>
                    <Form.Control type="text" onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>材料圖片連結</Form.Label>
                    <Form.Control type="text" onChange={(e) => setImageLink(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>材料個數</Form.Label>
                    <Form.Control type="text" onChange={(e) => setNumber(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>預計花費</Form.Label>
                    <Form.Control type="text" onChange={(e) => setPrice(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>備註</Form.Label>
                    <Form.Control type="text" onChange={(e) => setComment(e.target.value)} />
                </Form.Group>
                <Button variant="primary" className='mb-3' type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default AddElement;